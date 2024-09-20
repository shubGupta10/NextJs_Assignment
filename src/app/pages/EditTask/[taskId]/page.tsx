'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Task {
    title: string;
    description: string;
    status: 'to-do' | 'in progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
}

const EditTask: React.FC<{ params: { taskId: string } }> = ({ params }) => {
    const router = useRouter();
    const { taskId } = params;

    const [task, setTask] = useState<Task>({
        title: '',
        description: '',
        status: 'to-do',
        priority: 'low',
        dueDate: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!taskId) return;

        const fetchTask = async () => {
            try {
                const response = await axios.get(`/api/Task/FetchTaskByID/${taskId}`);
                setTask(response.data.response || {
                    title: '',
                    description: '',
                    status: 'to-do',
                    priority: 'low',
                    dueDate: ''
                });
            } catch (error) {
                console.error('Error fetching task:', error);
                toast.error('Error fetching task.');
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [taskId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTask(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/Task/editTask/${taskId}`, task);
            if (response.data.updatedTask) {
                toast.success('Task updated successfully!');
                router.push('/pages/taskList');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Error updating task.');
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
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <Toaster />
            <form className="bg-gray-800 p-6 rounded shadow-md w-full max-w-lg" onSubmit={handleSubmit}>
                <h1 className="text-2xl mb-4 font-extrabold">Edit Task</h1>

                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    className="mb-4"
                    required
                />

                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    className="mb-4"
                    required
                />

                <Label htmlFor="status">Status</Label>
                <select
                    id="status"
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                    className="mb-4 w-full p-2 bg-gray-700 text-white rounded"
                    required
                >
                    <option value="to-do">To Do</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

                <Label htmlFor="priority">Priority</Label>
                <select
                    id="priority"
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                    className="mb-4 w-full p-2 bg-gray-700 text-white rounded"
                    required
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                    id="dueDate"
                    type="date"
                    name="dueDate"
                    value={task.dueDate ? task.dueDate.split('T')[0] : ''}
                    onChange={handleChange}
                    className="mb-4 bg-gray-700"
                    required
                />

                <Button type="submit" className="w-full mt-4">Update Task</Button>
            </form>
        </div>
    );
};

export default EditTask;
