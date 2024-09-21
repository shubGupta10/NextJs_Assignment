import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {connect} from '@/dbConfig/connect'



export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const {email, password} = reqBody

        if(!email || !password){
            return NextResponse.json({error: "Check your credentials"}, {status: 400})
        }

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json({error: "Password does not match, check your credentials"}, {status: 400})
        }

        const TokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(TokenData, process.env.TOKEN_SECRET!, {expiresIn: '1h'})

        const response = NextResponse.json({
            message: "User loggedIn Successfully",
            success: true,
        })

        response.cookies.set("token", token)

        return response;

    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message },{status: 500});
    }
}