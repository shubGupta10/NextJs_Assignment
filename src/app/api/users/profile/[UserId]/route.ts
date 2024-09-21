import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import {connect} from '@/dbConfig/connect'
import mongoose from "mongoose";



export async function GET(request: NextRequest, {params}: { params : {UserId: string}}) {
    try {
        await connect();
       const {UserId} = params;
        if(!UserId){
            return NextResponse.json({error: "User does not found"}, {status: 400})
        }

        if(!mongoose.Types.ObjectId.isValid(UserId)){
            return NextResponse.json({
                error: "Invalid User Id",
            },
        {status: 400}
        )
        }

        const user = await User.findById(UserId);

        if(!user){
            return NextResponse.json({error: "User does not found"}, {status: 404})
        }

        return NextResponse.json({
            message: "User found",
            success: true,
            user
        })
    } catch (error: unknown) {
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}