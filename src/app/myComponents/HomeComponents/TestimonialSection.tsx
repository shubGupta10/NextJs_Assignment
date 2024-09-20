import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This app has transformed the way I manage my projects. It's intuitive and powerful!",
      author: "Jane Doe",
      role: "Project Manager",
      avatar: "/api/placeholder/32/32",
    },
    {
      quote: "I've tried many task management tools, but this one stands out. It's a game-changer for our team.",
      author: "John Smith",
      role: "Team Lead",
      avatar: "/api/placeholder/32/32",
    },
  ];

  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <p className="text-lg text-white mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="font-semibold text-white not-italic">{testimonial.author}
                    </cite>
                    <p className="text-sm text-white">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}