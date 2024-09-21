import { NextRequest, NextResponse } from "next/server";
import {connect} from '@/dbConfig/connect'
import Task from '@/models/TaskModel'



export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const {title, description, status, priority, dueDate, createdBy} = reqBody;

        if(!title || !description || !status || !priority || !dueDate || !createdBy){
            return NextResponse.json({error: "Fill the full form"}, {status: 400})
        }

        const validStatus = ["to-do", "in progress", "completed"];
        const validPriorities = ["low", "medium", "high"];

        if(!validStatus.includes(status) || !validPriorities.includes(priority)){
            return NextResponse.json({error: "Invalid status or priority"}, {status: 400})
        }

        const parsedDueDate = new Date(dueDate);
        if(isNaN(parsedDueDate.getTime())){
            return NextResponse.json({error: "Invalid due date"}, {status: 400})
        }

        const NewTask = new Task({
            title,
            description,
            status,
            priority,
            dueDate: parsedDueDate,
            createdBy
        })


        const savedTask = await NewTask.save();

        return NextResponse.json({
            message: "Task created successfully",
            status: true,
            taskId: savedTask._id,
            savedTask
        })

    } catch (error: unknown) {
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}