interface YouTubeVideoStats {
  viewCount: string;
  likeCount: string;
  commentCount: string;
  duration: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

interface YouTubeApiResponse {
  items: {
    id: string;
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        maxres?: { url: string };
        high?: { url: string };
        medium?: { url: string };
      };
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      commentCount: string;
    };
    contentDetails: {
      duration: string;
    };
  }[];
}

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

export function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

export function formatViewCount(count: string): string {
  const num = parseInt(count);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

export async function getYouTubeVideoStats(videoId: string): Promise<YouTubeVideoStats | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  
  if (!apiKey) {
    console.warn('YouTube API key not found. Using fallback data.');
    return null;
  }
  
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics,contentDetails&key=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data: YouTubeApiResponse = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error('Video not found');
    }
    
    const video = data.items[0];
    const thumbnailUrl = video.snippet.thumbnails.maxres?.url || 
                        video.snippet.thumbnails.high?.url || 
                        video.snippet.thumbnails.medium?.url || 
                        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    
    return {
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      commentCount: video.statistics.commentCount,
      duration: formatDuration(video.contentDetails.duration),
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnailUrl
    };
  } catch (error) {
    console.error('Error fetching YouTube stats:', error);
    return null;
  }
}

export async function getMultipleYouTubeVideoStats(videoIds: string[]): Promise<Record<string, YouTubeVideoStats>> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const results: Record<string, YouTubeVideoStats> = {};
  
  if (!apiKey) {
    console.warn('YouTube API key not found. Using fallback data.');
    return results;
  }
  
  // YouTube API allows up to 50 video IDs per request
  const batchSize = 50;
  
  for (let i = 0; i < videoIds.length; i += batchSize) {
    const batch = videoIds.slice(i, i + batchSize);
    
    try {
      const url = `https://www.googleapis.com/youtube/v3/videos?id=${batch.join(',')}&part=snippet,statistics,contentDetails&key=${apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }
      
      const data: YouTubeApiResponse = await response.json();
      
      data.items.forEach(video => {
        const thumbnailUrl = video.snippet.thumbnails.maxres?.url || 
                            video.snippet.thumbnails.high?.url || 
                            video.snippet.thumbnails.medium?.url || 
                            `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
        
        results[video.id] = {
          viewCount: video.statistics.viewCount,
          likeCount: video.statistics.likeCount,
          commentCount: video.statistics.commentCount,
          duration: formatDuration(video.contentDetails.duration),
          title: video.snippet.title,
          description: video.snippet.description,
          thumbnailUrl
        };
      });
    } catch (error) {
      console.error('Error fetching YouTube stats batch:', error);
    }
  }
  
  return results;
} 