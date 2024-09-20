"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from 'axios';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "@/context/AuthContext";

export default function CreateTask() {
    const {CurrentLoggedInUser} = useAuth();
    const router = useRouter();
    const [user, setUser] = useState<{
        title: string;
        description: string;
        status: string;
        priority: string;
        dueDate: Date | null;
        createdBy: string;
    }>({
        title: "",
        description: "",
        status: "",
        priority: "",
        dueDate: null, 
        createdBy: ""  
    });
    const [loading, setLoading] = useState(false);

    const currentUser = CurrentLoggedInUser?.username; 
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const taskData = { ...user, createdBy: currentUser};
            const response = await axios.post("/api/Task/createTask", taskData);
            setUser(response.data);
            toast.success("Task created Successfully");
            router.push("/pages/taskList");
            setUser({ title: "", description: "", status: "", priority: "", dueDate: null, createdBy: "" });
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
                        Create Task
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col space-y-4">
                            <Label htmlFor="title" className="text-sm font-medium text-gray-300">
                                Title
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter Title"
                                required
                                value={user.title}
                                onChange={(e) => setUser({ ...user, title: e.target.value })}
                                className="bg-gray-800 border border-gray-600 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500"
                            />
                        </div>

                        <div className="mt-4 flex flex-col space-y-4">
                            <Label htmlFor="description" className="text-sm font-medium text-gray-300">
                                Description
                            </Label>
                            <Input
                                id="description"
                                type="text"
                                placeholder="Enter description"
                                required
                                value={user.description}
                                onChange={(e) => setUser({ ...user, description: e.target.value })}
                                className="bg-gray-800 border border-gray-600 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500"
                            />
                        </div>

                        <div className="mt-4 flex flex-col space-y-4">
                            <Label htmlFor="status" className="text-sm font-medium text-gray-300">
                                Status
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="bg-gray-800 border border-gray-600 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white">
                                    {user.status || "Select Status"}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {["to-do", "in progress", "completed"].map((status) => (
                                        <DropdownMenuItem
                                            key={status}
                                            onSelect={() => setUser({ ...user, status })}
                                            className="text-black"
                                        >
                                            <span>{status}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="mt-4 flex flex-col space-y-4">
                            <Label htmlFor="priority" className="text-sm font-medium text-gray-300">
                                Priority
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="bg-gray-800 border border-gray-600 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white">
                                    {user.priority || "Select Priority"}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {["low", "medium", "high"].map((priority) => (
                                        <DropdownMenuItem
                                            key={priority}
                                            onSelect={() => setUser({ ...user, priority })}
                                            className="text-black"
                                        >
                                            <span>{priority}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="mt-4 flex flex-col space-y-4">
                            <Label htmlFor="dueDate" className="text-sm font-medium text-gray-300">
                                Due Date
                            </Label>
                            <DatePicker
                                selected={user.dueDate}
                                onChange={(date) => setUser({ ...user, dueDate: date })}
                                className="bg-gray-800 border border-gray-600 p-2 rounded-lg text-white placeholder-gray-500"
                                placeholderText="Select due date"
                                dateFormat="MMMM d, yyyy"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 mt-6 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Task"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
