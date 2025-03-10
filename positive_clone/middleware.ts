import { NextResponse } from "next/server";
// import { NextApiRequest } from "next";
import type { NextRequest } from "next/server";
// import jsonwebtoken from "jsonwebtoken";
// import { cookies } from "next/headers";
const middleware = (request: NextRequest) => {
    let cookieValue = request.cookies.get("isLog")?.value;
    let pathname = request.nextUrl.pathname || "";
    const authToken = request.cookies.get("authToken")?.value || "";
    return NextResponse.next();
}
export default middleware;