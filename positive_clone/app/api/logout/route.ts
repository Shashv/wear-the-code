import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
    // request.cookies.delete("isLogedIn");
    // console.log(request.cookies.getAll( ));
    // return NextResponse.json({ message: "Loged out Successfully" });
    const responses = NextResponse.json({ message: "LogedOut Successfully", statusCode: 200 });
    //  const responses = NextResponse.redirect(new URL("/authentication/login"));
    responses.cookies.delete("isLog");
    // response.cookies.delete("isLog");
    // NextResponse.redirect("/authentication/login");
    // return NextResponse.redirect(new URL("/authentication/login"));
    return responses;
}