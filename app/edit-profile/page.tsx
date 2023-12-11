
"use client";
// Define a custom type for session user
// Import necessary components and hooks
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import {  getSession, useSession } from "next-auth/react";
import EditProfileClient from "./client_form";

export default async function EditProfile() {
  const router = useRouter();

  const session = await getSession()

  if (!session) {
    redirect('/')
  }

  const user = session.user as User
  const name = user.name ? user.name : ""
  const props = {name:name,email:user.email}

  return (
    <div>
      <EditProfileClient name={name} email={user.email} />
    </div>
  )
}