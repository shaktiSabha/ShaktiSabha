import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: 1,
    title: "Empowering Women Through Education",
    description: "Explore how access to education transforms lives and opens new doors for women across the globe.",
    imageUrl: "https://source.unsplash.com/600x400/?education,women",
  },
  {
    id: 2,
    title: "Microfinance and Women's Independence",
    description: "Learn how small loans are helping women entrepreneurs build sustainable livelihoods.",
    imageUrl: "https://source.unsplash.com/600x400/?finance,women",
  },
  {
    id: 3,
    title: "Leadership and Representation",
    description: "Discover the impact of women in leadership roles and why representation truly matters.",
    imageUrl: "https://source.unsplash.com/600x400/?leadership,women",
  },
];

export default function BlogSection() {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 ">
      <h2 className="text-5xl md:text-6xl font-bold text-red-400 mb-4 hover:scale-105 transition-transform duration-300 mt-10 text-center pb-10">Latest Articles</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm">
            <CardHeader className="p-0">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.description}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Button variant="outline" className="ml-auto">Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
