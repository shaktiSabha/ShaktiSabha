export default function PodcastsMedia() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-color-red text-4xl font-bold text-center mb-12 mt-16 text-red-500">Our Podcasts & Media</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="aspect-video">
          <h3 className="font-semibold mb-2">Podcast with Acharya Sukama Ji</h3>
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/XGWKRKWcpZE"
            title="Podcast with Acharya Sukama Ji"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="aspect-video">
          <h3 className="font-semibold mb-2">Interview with Vandana Sharma Ji</h3>
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/fJEC5Mao3Es"
            title="Interview with Vandana Sharma Ji"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="aspect-video">
          <h3 className="font-semibold mb-2">World Record Holder - Pratibha Thakkadpally</h3>
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/W43AsPI-UzY"
            title="World Record Holder - Pratibha Thakkadpally"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="aspect-video">
          <h3 className="font-semibold mb-2">Conspiracy Investigation</h3>
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/Cfa09zSU2AQ"
            title="Conspiracy Investigation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="aspect-video">
          <h3 className="font-semibold mb-2">Menstruation Myths Debunked</h3>
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/8Ql8VHkmGtM"
            title="Menstruation Myths Debunked"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="aspect-video">
          <h3 className="font-semibold mb-2">Women Rights in Vedas</h3>
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/UZGvzO1I1e8"
            title="Women Rights in Vedas"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="aspect-video">
          <h3 className="font-semibold mb-2">Women of Ramayana</h3>
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/XtNJeIX8hgM"
            title="Women of Ramayana"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
