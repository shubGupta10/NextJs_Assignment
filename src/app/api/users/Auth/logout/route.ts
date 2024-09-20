import {NextRequest, NextResponse} from 'next/server'
import {connect} from '@/dbConfig/connect'

connect()

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "User logged out successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response
    } catch (error: unknown) {
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}