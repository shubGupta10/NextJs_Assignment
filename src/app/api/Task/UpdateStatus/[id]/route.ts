import { NextResponse } from 'next/server';
import {connect} from '@/dbConfig/connect'
import Task from '@/models/TaskModel';



export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { status } = await req.json(); 

  try {
    await connect()
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json(
        { message: 'Task not found', status: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Task updated successfully', status: true, task: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: 'Error updating task', status: false },
      { status: 500 }
    );
  }
}
