import { connect } from '@/dbConfig/connect'
import { NextRequest, NextResponse } from "next/server";
import Task from '@/models/TaskModel';

connect();

export async function PUT(
    request: NextRequest,
    { params }: { params: { taskId: string } }
) {
    try {
        const taskId = params.taskId;
        if (!taskId) {
            return NextResponse.json({ error: "Task ID is required" }, { status: 400 })
        }

        const reqBody = await request.json();
        const { title, description, status, priority, dueDate } = reqBody;

        const task = await Task.findById(taskId);
        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        // Update task fields
        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;
        if (priority) task.priority = priority;
        if (dueDate) {
            const parsedDueDate = new Date(dueDate);
            if (isNaN(parsedDueDate.getTime())) {
                return NextResponse.json({ error: "Invalid due date" }, { status: 400 });
            }
            task.dueDate = parsedDueDate;
        }

        const updatedTask = await task.save();

        return NextResponse.json({
            message: "Task successfully updated",
            updatedTask
        });
    } catch (error: unknown) {
        console.error("Error updating task:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}