'use client'
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "../myComponents/Loader";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    setIsLoading(true);
    logout();
    router.push("/Home");
  };

  const handleClick = (href: string) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="relative">
      {isLoading && <Loader />} 
      <nav className="bg-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-4xl font-extrabold bg-gradient-to-tr from-purple-400 to-red-600 bg-clip-text text-transparent tracking-wider">
                Tasker
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/Home" onClick={() => handleClick("/Home")} className="px-3 py-2 rounded-md text-xl font-medium hover:bg-blue-500 hover:text-white transition duration-300">Home</a>
                {isAuthenticated ? (
                  <>
                    <a href="/pages/AddTask" onClick={() => handleClick("/pages/AddTask")} className="px-3 py-2 rounded-md text-xl font-medium hover:bg-blue-500 hover:text-white transition duration-300">Add task</a>
                    <a href="/pages/taskList" onClick={() => handleClick("/pages/taskList")} className="px-3 py-2 rounded-md text-xl font-medium hover:bg-blue-500 hover:text-white transition duration-300">Task list</a>
                    <a href="/KanbanBoard" onClick={() => handleClick("/KanbanBoard")} className="px-3 py-2 rounded-md text-xl font-medium hover:bg-blue-500 hover:text-white transition duration-300">Dashboard</a>
                    <a href="/pages/profile" onClick={() => handleClick("/pages/profile")} className="px-3 py-2 rounded-md text-xl font-medium hover:bg-blue-500 hover:text-white transition duration-300">Profile</a>
                    <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 transition duration-300">Logout</button>
                  </>
                ) : (
                  <>
                    <a href="/pages/signup" onClick={() => handleClick("/pages/signup")} className="px-3 py-2 rounded-md text-xl font-medium bg-green-500 hover:bg-green-600 transition duration-300">Signup</a>
                    <a href="/pages/login" onClick={() => handleClick("/pages/login")} className="px-3 py-2 rounded-md text-xl font-medium bg-yellow-500 hover:bg-yellow-600 transition duration-300">Login</a>
                  </>
                )}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-500">
          <a href="/pages/Home" onClick={() => handleClick("/pages/Home")} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600 transition duration-300">Home</a>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600 transition duration-300">Logout</button>
          ) : (
            <>
              <a href="/pages/signup" onClick={() => handleClick("/pages/signup")} className="block px-3 py-2 rounded-md text-base font-medium text-white bg-green-500 hover:bg-green-600 transition duration-300">Signup</a>
              <a href="/pages/login" onClick={() => handleClick("/pages/login")} className="block px-3 py-2 rounded-md text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300">Login</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
