import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Your Productivity?</h2>
        <p className="text-xl mb-8 text-gray-200">
          Join thousands of professionals who have transformed their task management with our platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-white text-black hover:bg-gray-100 text-lg py-6 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
            Sign Up Free
          </Button>
          <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-700 text-lg py-6 px-8 rounded-full transition-all duration-300 ease-in-out">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}