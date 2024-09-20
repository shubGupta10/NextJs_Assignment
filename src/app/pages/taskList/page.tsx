'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Calendar, Clock, User, Edit, Trash } from "lucide-react";
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
    const router = useRouter();
    const [allTask, setAllTask] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchingAllUserTask = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/Task/AllTask');
                setAllTask(response.data.tasks);
            } catch (error) {
                console.error("Something went wrong")
                toast.error('Something went wrong', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                });
            } finally {
                setLoading(false);
            }
        };
        fetchingAllUserTask();
    }, []);

    const handleEdit = (taskId: string) => {
        router.push(`/pages/EditTask/${taskId}`);
    };

    const handleDelete = async (taskId: string) => {
        try {
            await axios.delete(`/api/Task/deleteTask/${taskId}`);
            setAllTask(allTask.filter(task => task._id !== taskId));
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Toaster />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-5xl text-center mt-10 font-extrabold mb-8 text-white">All Tasks</h1>
                {allTask.length > 0 ? (
                    <ScrollArea className="h-[calc(100vh-8rem)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allTask.map((task) => (
                                <Card key={task.createdAt} className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                    </ScrollArea>
                ) : (
                    <div className="flex items-center p-4 mb-4 text-sm text-yellow-300 border border-yellow-800 rounded-lg bg-yellow-900" role="alert">
                        <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">No tasks available.</span> There are currently no tasks to display. Try creating a new task.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FetchAllTask;
