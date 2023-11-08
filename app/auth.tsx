"use client";

import { Button, ButtonGroup } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <Button color="success" variant="flat" onPress={() => signIn()}>
      Sign in
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button color="success" variant="flat" onPress={() => signOut()}>
      Sign out
    </Button>
  );
};
