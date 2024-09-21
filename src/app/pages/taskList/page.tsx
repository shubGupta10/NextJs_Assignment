'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Calendar, Clock, User, Edit, Trash, RefreshCw } from "lucide-react";
import { useRouter } from 'next/navigation';

interface Task {
    _id: string;
    createdAt: string;
    createdBy: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    title: string;
    updatedAt: string;
}

const priorityColors = {
    low: "bg-blue-700 text-blue-100",
    medium: "bg-yellow-600 text-yellow-100",
    high: "bg-red-700 text-red-100"
};

const statusColors = {
    todo: "bg-indigo-600 text-indigo-100",
    inProgress: "bg-amber-600 text-amber-100",
    done: "bg-green-700 text-green-100"
};

const FetchAllTask = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const router = useRouter();
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${baseUrl}/api/Task/AllTask`);
            setAllTasks(response.data.tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setError('Failed to fetch tasks. Please try again.');
            toast.error('Failed to fetch tasks', {
                duration: 4000,
                position: 'top-center',
            });
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);

    useEffect(() => {
        fetchTasks();
        const intervalId = setInterval(fetchTasks, 30000); // Refetch every 30 seconds
        return () => clearInterval(intervalId);
    }, [fetchTasks]);

    const handleEdit = (taskId: string) => {
        router.push(`/pages/EditTask/${taskId}`);
    };

    const handleDelete = async (taskId: string) => {
        try {
            await axios.delete(`${baseUrl}/api/Task/deleteTask/${taskId}`);
            setAllTasks(allTasks.filter(task => task._id !== taskId));
            toast.success('Task deleted successfully!');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    toast.error('Task not found.');
                } else {
                    toast.error(error.response?.data?.error || 'Error deleting task.');
                }
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };

    const handleRefresh = () => {
        fetchTasks();
        toast.success('Refreshing tasks...', { duration: 2000 });
    };

    if (error) {
        return (
            <div className="flex items-center p-4 mb-4 text-sm text-red-300 border border-red-800 rounded-lg bg-red-900" role="alert">
                <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                <span className="sr-only">Error</span>
                <div>
                    <span className="font-medium">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Toaster />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-5xl font-extrabold text-white">All Tasks</h1>
                    <button 
                        onClick={handleRefresh} 
                        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        disabled={loading}
                    >
                        <RefreshCw className="mr-2 h-5 w-5" />
                        Refresh
                    </button>
                </div>
                <ScrollArea className="h-[calc(100vh-12rem)]">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, index) => (
                                <Card key={index} className="bg-gray-800 border-gray-700 shadow-lg animate-pulse">
                                    <CardHeader>
                                        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                                        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : allTasks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allTasks.map((task) => (
                                <Card key={task._id} className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-white">{task.title}</CardTitle>
                                        <CardDescription className="text-gray-300">{task.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center mb-4">
                                            <Badge className={`${statusColors[task.status as keyof typeof statusColors]} px-2 py-1 rounded-full text-xs font-semibold`}>
                                                {task.status}
                                            </Badge>
                                            <Badge className={`${priorityColors[task.priority as keyof typeof priorityColors]} px-2 py-1 rounded-full text-xs font-semibold`}>
                                                {task.priority} priority
                                            </Badge>
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-300">
                                            <div className="flex items-center">
                                                <Calendar className="mr-2 h-4 w-4" />
                                                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Created by: {task.createdBy}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="mr-2 h-4 w-4" />
                                                <span>Created on: {new Date(task.createdAt).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <button onClick={() => handleEdit(task._id)} className="text-blue-500 hover:text-blue-300">
                                            <Edit className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => handleDelete(task._id)} className="text-red-500 hover:text-red-300">
                                            <Trash className="h-5 w-5" />
                                        </button>
                                        <p className="text-xs text-gray-400">
                                            Last updated: {new Date(task.updatedAt).toLocaleString()}
                                        </p>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center p-4 mb-4 text-sm text-yellow-300 border border-yellow-800 rounded-lg bg-yellow-900" role="alert">
                            <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">No tasks available.</span> There are currently no tasks to display. Try creating a new task.
                            </div>
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    );
};

export default FetchAllTask;