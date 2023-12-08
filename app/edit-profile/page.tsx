
"use client";
// Define a custom type for session user
// Import necessary components and hooks
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import {  getSession, useSession } from "next-auth/react";


export default async function EditProfile() {
  const router = useRouter();

  const session = await getSession()

  const user = session!.user as User

  const [existingName, setExistingName] = useState(user.name ? user.name : "");
  const [newName, setNewName] = useState("");

  const [existingPassword, setExistingPassword] = useState("****");
  const [newPassword, setNewPassword] = useState("");

  const [existingEmail, setExistingEmail] = useState(user.email ? user.name : "");
  const [newEmail, setNewEmail] = useState("");

  if (!session) {
    redirect('/')
    return
  }

  const handlePUT = async (name?:string,email?:string,password?:string) => {

    // Handle form submission logic here
    const respons = await fetch('/api/auth/register', {
      method: 'PUT',
      body: JSON.stringify({
        name,
        email,
        password
      }),
    });
    console.log({respons});
  };

  const handleNameChange = () => {
    console.log("Changing name to:", newName);
    try{
      handlePUT(newName)
      //updateUserName(user.id, newName)
    } catch (e) {
      console.log("error:", e)
    }
  };

  const handlePasswordChange = async () => {
    console.log("Changing password to:", newPassword);
    try{
      //updateUserPassword(user.id, newPassword)
      // TODO: I feel like password gets hashed here, but let's see
      handlePUT(undefined, undefined, newPassword)
    } catch (e) {
      console.log("error:", e)
    }
  };

  const handleEmailChange = () => {
    console.log("Changing email to:", newEmail);
    try{
      handlePUT(undefined, newEmail, undefined)
      //updateUserEmail(user.id, newEmail)
    } catch (e) {
      console.log("error:", e)
    }
  };

  const handleGoBack = () => {
    redirect("/")
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <div className="mb-4">
        <p className="font-bold">Name:</p>
        <Input
          label="name"
          required={true}
          value={newName}
          onValueChange={setNewName}
          placeholder={existingName}
          size="sm"
        />
        <Button onClick={handleNameChange}>Change Name</Button>
      </div>

      <div className="mb-4">
        <p className="font-bold">email</p>
        <Input
          label="email"
          required={true}
          value={newEmail}
          onValueChange={setNewEmail}
          placeholder="Enter new email"
          size="sm"
        />
        <Button onClick={handleEmailChange}>Change Email</Button>
      </div>

      <div className="mb-4">
        <p className="font-bold">Password:</p>
        <Input
          type="password"
          value={newPassword}
          onValueChange={setNewPassword}
          placeholder="Enter new password"
          size="sm"
        />
        <Button onClick={handlePasswordChange}>Change Password</Button>
      </div>

      <button onClick={handleGoBack} className="text-blue-500 underline">
        Go Back
      </button>
    </div>
  );
}