'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Clock } from 'lucide-react';
import {toast } from 'react-hot-toast';
import Loader from "../myComponents/Loader";

interface Task {
  _id: string;
  title: string;
  status: string;
  description: string;
  priority: string;
  dueDate: string;
}

interface ApiResponse {
  message: string;
  status: boolean;
  tasks: Task[];
}

const columns = [
  { id: "to do", title: "To Do" },
  { id: "in progress", title: "In Progress" },
  { id: "completed", title: "Completed" }
];

const priorityColors = {
  low: "bg-blue-600 text-blue-200",
  medium: "bg-yellow-600 text-yellow-200",
  high: "bg-red-600 text-red-200"
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/Task/AllTask");
        if (response.data.status && Array.isArray(response.data.tasks)) {
          setTasks(response.data.tasks);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedTasks = Array.from(tasks);
    const taskIndex = updatedTasks.findIndex(task => task._id === draggableId);
    if (taskIndex === -1) return;

    const [movedTask] = updatedTasks.splice(taskIndex, 1);
    const oldStatus = movedTask.status;
    movedTask.status = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);

    try {
      await axios.put(`/api/Task/UpdateStatus/${movedTask._id}`, { status: movedTask.status });
      toast.success(`Task "${movedTask.title}" moved from ${oldStatus} to ${movedTask.status}`);
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status. Please try again.");
      movedTask.status = oldStatus;
      setTasks([...tasks]);
    }
  };

  if (isLoading) return (
    <Loader/>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen bg-black text-red-400">{error}</div>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-8 bg-black min-h-screen">
        <h1 className="text-7xl font-bold mb-12 mt-4 text-center text-white">Kanban Board</h1>
        <div className="flex justify-center">
          <div className="flex space-x-8 max-w-7xl w-full">
            {columns.map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided, snapshot) => (
                  <div 
                    ref={provided.innerRef} 
                    {...provided.droppableProps} 
                    className={`bg-gray-900 p-6 rounded-lg shadow-lg flex-1 min-h-[300px] transition-colors duration-300 ${
                      snapshot.isDraggingOver ? 'bg-gray-800' : ''
                    }`}
                  >
                    <h2 className="font-bold text-2xl mb-6 text-gray-200 text-center">{column.title}</h2>
                    {tasks
                      .filter((task) => task.status.toLowerCase() === column.id)
                      .map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-gray-800 p-4 mb-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 $(
                                snapshot.isDragging ? 'shadow-xl' : ''
                              }`}
                              style={{
                                ...provided.draggableProps.style,
                                cursor: snapshot.isDragging ? 'grabbing' : 'grab'
                              }}
                            >
                              <h3 className="font-semibold text-white mb-2">{task.title}</h3>
                              <p className="text-sm text-gray-400 mb-2">{task.description}</p>
                              <div className="flex justify-between items-center">
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                                  {task.priority}
                                </span>
                                <div className="flex items-center text-xs text-gray-400">
                                  <Clock size={12} className="mr-1" />
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
