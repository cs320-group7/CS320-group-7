import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { createUser } from "@/src/db/queries";
export async function POST(request:Request){
    try {
        const {email, password, name} = await request.json();

        console.log({email, password, name});

        const hashedPassword = await hash(password, 10);
        createUser(name, email, hashedPassword);
    } catch (e) {
        console.log({e});
    }
    return NextResponse.json({message:"success"});
}