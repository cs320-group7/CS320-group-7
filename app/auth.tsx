"use client";

import { Button, ButtonGroup } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <Button color="primary" onPress={() => signIn()}>
      Sign in
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button color="primary" onPress={() => signOut()}>
      Sign out
    </Button>
  );
};
