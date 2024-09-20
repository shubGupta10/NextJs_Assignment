import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup" || path === "/Home"

    const token = request.cookies.get("token")?.value || ''

    if (isPublicPath && !token) {
        return NextResponse.next();
    }

}


export const config = {
    matcher: [
        "/pages/login",
        "/pages/signup",
        "/pages/profile",
        "/AllTask",
        "/Home",
        "/pages/AddTask",
        "/pages/EditTask",
        "/pages/taskList",
        "/KanbanBoard"
    ]
}