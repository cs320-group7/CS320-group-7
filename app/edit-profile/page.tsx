
"use client";
// Define a custom type for session user
// Import necessary components and hooks
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserEmail } from "@/src/db/queries";

export default function EditProfile() {
  const router = useRouter();

  const [existingName, setExistingName] = useState("Rich");
  const [newName, setNewName] = useState("");

  const [existingPassword, setExistingPassword] = useState("****");
  const [newPassword, setNewPassword] = useState("");

  const [existingEmail, setExistingEmail] = useState("test@test.com");
  const [newEmail, setNewEmail] = useState("");

  const handleNameChange = () => {
    console.log("Changing name to:", newName);
  };

  const handlePasswordChange = () => {
    console.log("Changing password to:", newPassword);
  };

  const handleEmailChange = () => {
    console.log("Changing email to:", newEmail);
  };

  const handleGoBack = () => {
    router.push("http://localhost:3000");
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <div className="mb-4">
        <p className="font-bold">Existing Name: {existingName}</p>
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new name"
          size="sm"
        />
        <Button onClick={handleNameChange}>Change Name</Button>
      </div>

      <div className="mb-4">
        <p className="font-bold">Existing Email: {existingEmail}</p>
        <Input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter new email"
          size="sm"
        />
        <Button onClick={handleEmailChange}>Change Email</Button>
      </div>

      <div className="mb-4">
        <p className="font-bold">Existing Email: {existingEmail}</p>
        <Input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter new email"
          size="sm"
        />
        <Button onClick={handleEmailChange}>Change Email</Button>
      </div>

      <button onClick={handleGoBack} className="text-blue-500 underline">
        Go Back
      </button>
    </div>
  );
}