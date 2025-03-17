export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug
    return  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className=" flex items-center space-x-10 flex-col bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Articles</h2>
            <p className="text-gray-600 mb-4">
              Read our latest articles on women empowerment, leadership, and personal growth.
            </p>
          </div>
        </div>
       {slug}</div>
  }