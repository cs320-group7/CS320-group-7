"use client";

import { Button, Card, Image, Input } from "@nextui-org/react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

export default function SignUp() {
  const Alert = () => (
    <div
      className="p-4 mb-4 max-w-xl mx-auto w-full text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <span className="font-medium">Success alert!</span> Account created.
    </div>
  );

  const initValue = { name: "", email: "", password: "" };

  const [formData, setFormData] = useState(initValue);

  const [formErrors, setFormErrors] = useState(initValue);

  const [isSubmit, setIsSubmit] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
    return <div>hi</div>;
  };

  useEffect(() => {
    if (Object.values(formErrors).every((e) => e === "") && isSubmit) {
      console.log(formData);
      fetch(
        `/api/bar?name=${formData.name}&email=${formData.email}&password=${formData.password}`,
      );
      setShowAlert(true);
    }
  }, [formErrors]);

  const validate = (values: typeof initValue) => {
    const errors = { name: "", email: "", password: "" };

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;

    if (!emailRegex.test(formData.email)) {
      errors.email = "Please provide a valid email";
    }

    if (formData.password.length < 4) {
      errors.password = "Password cannot be less than 4 characters";
    } else if (formData.password.length > 12) {
      errors.password = "Password cannot exceed 12 characters";
    }

    return errors;
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-lime-100">
      {showAlert && <Alert />}
      <Card className="mx-auto w-full max-w-md p-10 bg-gray-50">
        <form className={"flex flex-col gap-4"} onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold tracking-tight py">Sign Up</h1>
          <hr />
          <Input
            value={formData.name}
            isRequired={true}
            label={"Name"}
            name={"name"}
            type={"text"}
            onChange={handleChange}
          ></Input>

          <Input
            value={formData.email}
            type={"text"}
            label={"Email"}
            name={"email"}
            errorMessage={formErrors.email}
            isRequired={true}
            onChange={handleChange}
          ></Input>

          <Input
            value={formData.password}
            name={"password"}
            label={"Password"}
            type={"password"}
            isRequired={true}
            errorMessage={formErrors.password}
            onChange={handleChange}
          ></Input>
          <Button type={"submit"} variant={"flat"} radius={"none"}>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}