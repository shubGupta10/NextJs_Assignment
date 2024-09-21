'use client'
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "../myComponents/Loader";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAuthenticated, logout, CurrentLoggedInUser } = useAuth();
  const [authState, setAuthState] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setAuthState(isAuthenticated && !!CurrentLoggedInUser);
  }, [isAuthenticated, CurrentLoggedInUser]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
    router.push("/Home");
  };

  const handleClick = (href: string) => {
    setIsLoading(true);
    router.push(href);
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        handleClick(href);
      }}
      className="px-3 py-2 rounded-md text-xl font-medium hover:bg-blue-500 hover:text-white transition duration-300"
    >
      {children}
    </a>
  );

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
                <NavLink href="/Home">Home</NavLink>
                {authState ? (
                  <>
                    <NavLink href="/pages/AddTask">Add task</NavLink>
                    <NavLink href="/pages/taskList">Task list</NavLink>
                    <NavLink href="/KanbanBoard">Dashboard</NavLink>
                    <NavLink href="/pages/profile">Profile</NavLink>
                    <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 transition duration-300">Logout</button>
                  </>
                ) : (
                  <>
                    <NavLink href="/pages/signup">
                      <span className="px-3 py-2 rounded-md text-xl font-medium bg-green-500 hover:bg-green-600 transition duration-300">Signup</span>
                    </NavLink>
                    <NavLink href="/pages/login">
                      <span className="px-3 py-2 rounded-md text-xl font-medium bg-yellow-500 hover:bg-yellow-600 transition duration-300">Login</span>
                    </NavLink>
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
    <div className="px-4 pt-4 pb-6 space-y-2 sm:px-5 bg-gray-900">
        <NavLink href="/Home">
            <span className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition duration-300">Home</span>
        </NavLink>
        {authState ? (
            <>
                <NavLink href="/pages/AddTask">
                    <span className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition duration-300">Add Task</span>
                </NavLink>
                <NavLink href="/pages/taskList">
                    <span className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition duration-300">Task List</span>
                </NavLink>
                <NavLink href="/KanbanBoard">
                    <span className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition duration-300">Dashboard</span>
                </NavLink>
                <NavLink href="/pages/profile">
                    <span className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition duration-300">Profile</span>
                </NavLink>
                <button 
                    onClick={handleLogout} 
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600 transition duration-300"
                >
                    Logout
                </button>
            </>
        ) : (
            <>
                <NavLink href="/pages/signup">
                    <span className="block px-3 py-2 rounded-md text-base font-medium text-white bg-green-500 hover:bg-green-600 transition duration-300">Signup</span>
                </NavLink>
                <NavLink href="/pages/login">
                    <span className="block px-3 py-2 rounded-md text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300">Login</span>
                </NavLink>
            </>
        )}
    </div>
</div>

    </div>
  );
}