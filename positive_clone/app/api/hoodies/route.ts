import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
const router = createEdgeRouter<NextRequest, {}>();
router.get(async (request, { }) => {
    let database = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "SHASHVAT",
        database: "firstpositive_db",
        connectionLimit: 10
    });
    let response = await database.query('select * from main_hoodies as mh inner join hoodies_colors as hc on mh.id = hc.hoodie_id', []);
    let showhoodies = await database.query(`select * from main_hoodies`, []);
    return NextResponse.json({ message: "Hoodies fetched successfully", hoodies: response[0], showhoodies: showhoodies[0] }, { status: 200 });
})
export const GET = async (request: NextRequest, { }) => {
    return router.run(request, {});
}
export const POST = async (req: NextRequest) => {
    let data = await req.json();
    console.log("Data", data);
    return NextResponse.json({ message: "Baba Ji" }, { status: 201 });
}