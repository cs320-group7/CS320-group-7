import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { User } from "@prisma/client";

export default function EditProfileClient(props:{name:string, email:string, id:string}) {
    
  const [existingName, setExistingName] = useState(props.name);
  const [newName, setNewName] = useState("");

  const [existingPassword, setExistingPassword] = useState("****");
  const [newPassword, setNewPassword] = useState("");

  const [existingEmail, setExistingEmail] = useState(props.email);
  const [newEmail, setNewEmail] = useState("");

  const handlePUT = async (id:string,name?:string,email?:string,password?:string,) => {

    // Handle form submission logic here
    const respons = await fetch('/api/user'+id, {
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
      handlePUT(props.id, newName)
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
      handlePUT(props.id, undefined, undefined, newPassword)
    } catch (e) {
      console.log("error:", e)
    }
  };

  const handleEmailChange = () => {
    console.log("Changing email to:", newEmail);
    try{
      handlePUT(props.id, undefined, newEmail, undefined)
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
          placeholder={existingName}
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
          placeholder="****"
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