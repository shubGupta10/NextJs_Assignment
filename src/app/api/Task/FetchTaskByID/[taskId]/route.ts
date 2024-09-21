import { connect } from '@/dbConfig/connect'
import { NextRequest, NextResponse } from "next/server";
import Task from '@/models/TaskModel';



export async function GET(
    request: NextRequest,
    { params }: { params: { taskId: string } }
) {
    try {
        await connect();
        const taskId = params.taskId;
        if (!taskId) {
            return NextResponse.json({ error: "Task ID is required" }, { status: 400 })
        }

        const response = await Task.findById(taskId);
        if (!response) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Task successfully updated",
            success: true,
            response
        });
    } catch (error: unknown) {
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}