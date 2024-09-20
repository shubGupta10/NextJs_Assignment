import { NextRequest, NextResponse } from "next/server"
import User from '@/models/UserModel'
import bcryptjs from 'bcryptjs'
import { connect } from "@/dbConfig/connect";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        if(!username || !email || !password){
            return NextResponse.json({error: "Please complete the form"}, {status: 400})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return NextResponse.json({error: "Invalid email format"}, {status: 400})
        }


        if (password.length < 6){
            return NextResponse.json({error: "Password must be at least 6 characters long"}, {status: 400});
        }

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error: "User already existed"}, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const NewUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await NewUser.save();

        return NextResponse.json({
            message: "User created Succcessfully",
            success: true,
            savedUser
        })
    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, {status: 500});
    }
}