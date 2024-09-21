import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbConfig/connect';
import User from "@/models/UserModel";



export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
        await connect();
        const { userId } = params; 

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const foundUser = await User.findById(userId);
        if (!foundUser) {
            return NextResponse.json({ error: "Something went wrong, can't find user" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User Found",
            success: true,
            foundUser,
        });
    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
