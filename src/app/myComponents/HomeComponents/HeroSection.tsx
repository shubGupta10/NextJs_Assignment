'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'


export default function HeroSection() {
  const router = useRouter();

  const handleClick = () => {
    const token = Cookies.get("token");
    if(token){
      router.push("/pages/AddTask");
    }else{
      router.push("/pages/login");
    }
    
  }

  return (
    <section className="bg-black  text-white py-24 px-4">
      <div className="max-w-5xl mt-24 mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8  bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Manage Your Tasks Efficiently
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Organize, track, and complete your tasks with ease using our powerful platform.
        </p>
        <Button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700 text-lg py-6 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
          Get Started Now
        </Button>
      </div>
    </section>
  );
}