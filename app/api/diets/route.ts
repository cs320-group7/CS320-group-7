import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

import { User } from "@prisma/client"

import { deleteDiet, addDiet } from "@/src/db/queries";

export async function GET(request: Request){
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id')
    const state = searchParams.get('state')
    
    if(!id || !state){
        return new Response("Bad Request", {status:400})
    }

    const session = await getServerSession(authOptions)

    if(!session){
        return new Response("Unauthorized access detected", {status:401})
    }

    const userId = (session.user as User).id
    if(state=='true'){
        const res = await addDiet(+userId, +id)
        if(!res){
            return new Response("Error", {status:500})
        }
        return new Response("User Profile updated with new Diet", {status:200})
    }
    else if(state =='false'){
        const res = await deleteDiet(+userId, +id)
        if(!res){
            
            return new Response("Error", {status:500})
        }
        return new Response("User Profile updated", {status:200})
    }
    return new Response("Error", {status:500})
}
