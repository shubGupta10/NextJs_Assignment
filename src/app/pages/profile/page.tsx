'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from '@/context/AuthContext'; 

export default function Profile() {
  const { id: userId, isAuthenticated, user: authUser } = useAuth(); 
  const [user, setUser] = useState({ 
    username: "", email: "" });

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId, isAuthenticated]);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`/api/users/profile/${id}`);
      setUser(response.data.user);
    } catch (error) {
      toast.error("Error fetching user data");
      console.error(error);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-[#09090b]">
      <Card className="w-full max-w-md bg-[#09090b] text-white shadow-lg border border-gray-700 rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-white">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col">
              <Label htmlFor="username" className="text-sm font-medium text-gray-300">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                readOnly
                value={authUser?.username || user.username || "N/A"} 
                className="bg-gray-800 border border-gray-600 text-white placeholder-gray-500"
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                readOnly
                type="email"
                value={authUser?.email || user.email || "N/A"}
                className="bg-gray-800 border border-gray-600 text-white placeholder-gray-500"
              />
            </div>

            <Button
              className="w-full bg-indigo-600 mt-6 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
