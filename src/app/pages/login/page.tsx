"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from 'axios';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function login() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/users/Auth/login`, user);
      setUser(response.data);
      toast.success("Login Successful");
      setUser({ email: "", password: "" });
      window.location.href = "/Home";
    } catch (error: unknown) {
      const message = axios.isAxiosError(error) ? error.response?.data?.message || error.message : "An unexpected error occurred.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#09090b]">
      <Card className="w-full max-w-md bg-[#09090b] text-white shadow-lg border border-gray-700 space-y-4 rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold space-y-4 text-white">
            Login Page
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mt-4 flex flex-col space-y-4">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="bg-gray-800 border border-gray-600 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500"
              />
            </div>

            <div className="mt-4 flex flex-col space-y-4">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="bg-gray-800 border border-gray-600 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 mt-6 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Logging..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
