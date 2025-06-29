import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';
import { extractVideoId, getMultipleYouTubeVideoStats } from '@/lib/youtube';

export async function POST() {
  try {
    await connectDB();
    
    // Get all published media items
    const mediaItems = await Media.find({ status: 'published' });
    
    if (mediaItems.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No media items to sync',
        updated: 0
      });
    }
    
    // Extract video IDs
    const videoData: { id: string; videoId: string; embedUrl: string }[] = [];
    
    for (const item of mediaItems) {
      const videoId = extractVideoId(item.embedUrl);
      if (videoId) {
        videoData.push({
          id: item._id.toString(),
          videoId,
          embedUrl: item.embedUrl
        });
      }
    }
    
    if (videoData.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No valid YouTube video IDs found',
        updated: 0
      });
    }
    
    // Fetch YouTube stats
    const videoIds = videoData.map(v => v.videoId);
    const youtubeStats = await getMultipleYouTubeVideoStats(videoIds);
    
    // Update database
    let updatedCount = 0;
    const updatePromises = [];
    
    for (const video of videoData) {
      const stats = youtubeStats[video.videoId];
      if (stats) {
        const updateData: Partial<typeof Media.prototype> = {
          views: parseInt(stats.viewCount) || 0,
          duration: stats.duration || '',
          thumbnailUrl: stats.thumbnailUrl || ''
        };
        
        updatePromises.push(
          Media.findByIdAndUpdate(video.id, updateData, { new: true })
        );
        updatedCount++;
      }
    }
    
    await Promise.all(updatePromises);
    
    return NextResponse.json({
      success: true,
      message: `Successfully synced ${updatedCount} media items with YouTube`,
      updated: updatedCount,
      total: mediaItems.length,
      details: Object.keys(youtubeStats).map(videoId => ({
        videoId,
        views: parseInt(youtubeStats[videoId].viewCount).toLocaleString(),
        duration: youtubeStats[videoId].duration
      }))
    });
    
  } catch (error) {
    console.error('Error syncing YouTube data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to sync YouTube data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const mediaItems = await Media.find({ status: 'published' });
    const videoData = [];
    
    for (const item of mediaItems) {
      const videoId = extractVideoId(item.embedUrl);
      if (videoId) {
        videoData.push({
          title: item.title,
          videoId,
          currentViews: item.views,
          embedUrl: item.embedUrl,
          lastUpdated: item.updatedAt
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      data: videoData,
      total: videoData.length,
      message: 'YouTube sync status retrieved'
    });
    
  } catch (error) {
    console.error('Error getting sync status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get sync status' },
      { status: 500 }
    );
  }
} 