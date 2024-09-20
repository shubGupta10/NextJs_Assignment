import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, Users } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Task Management",
      description: "Organize tasks into boards, lists, and cards for efficient workflow.",
      icon: CheckCircle,
    },
    {
      title: "Scheduling",
      description: "Set due dates and reminders to keep your projects on track.",
      icon: Calendar,
    },
    {
      title: "Collaboration",
      description: "Work seamlessly with your team in real-time on shared projects.",
      icon: Users,
    },
  ];

  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center">
                <feature.icon className="w-12 h-12 text-white mb-4" />
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-white text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}