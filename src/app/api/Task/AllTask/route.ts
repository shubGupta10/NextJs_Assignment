import {NextResponse } from "next/server";
import {connect} from '@/dbConfig/connect'
import Task from "@/models/TaskModel";



export async function GET() {
    try {
        await connect();
        const tasks = await Task.find();

        if(!tasks){
            return NextResponse.json({error: "Something went wrong, can't find Tasks"}, {status: 400})
        }

        return NextResponse.json({
            message: "Tasks retrived Successfully",
            status: true,
            tasks
        });
    } catch (error: unknown) {
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}