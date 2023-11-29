"use client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";

export default function Nav2() {
  const router = useRouter();

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Link
            className={"font-bold text-black"}
            onPress={() => {
              router.push("/");
            }}
          >
            PrepPal
          </Link>
        </NavbarBrand>
        <NavbarContent justify={"end"}></NavbarContent>
        <Link
          showAnchorIcon
          underline={"hover"}
          color={"success"}
          onPress={() => {
            signIn();
          }}
        >
          Log In
        </Link>
        <Button
          onPress={() => {
            router.push("/signup");
          }}
        >
          Sign Up
        </Button>
      </Navbar>
    </>
  );
}
