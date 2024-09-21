import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbConfig/connect'
import Task from "@/models/TaskModel";



export async function DELETE(request: NextRequest,{ params }: { params: { taskId: string } }
) {
    try {
        await connect();
        const taskId = params.taskId;
        console.log("Received taskId for deletion:", taskId);

        if (!taskId) {
            return NextResponse.json({ error: "Task ID is required" }, { status: 400 })
        }

        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 })
        }
        
        return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 })
        
    } catch (error: unknown) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}