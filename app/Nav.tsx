"use client";

import {
  Avatar,
  Divider,
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
import { signOut } from "next-auth/react";

export default function Nav({userEmail} :{userEmail: string | undefined | null}) {
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

        <NavbarContent justify={"center"}>
          <Link
            className={"text-lime-300"}
            underline={"hover"}
            href={"/search-recipes-by-ingredients"}
          >
            Ingredients search
          </Link>
          <Divider orientation={"vertical"} className={"max-h-5"} />
          <Link
            className={"text-lime-300"}
            color={"success"}
            underline={"hover"}
            href={"/complex-search"}
          >
            Complex search
          </Link>
        </NavbarContent>
        <NavbarContent justify={"end"}>
          <Dropdown>
            <DropdownTrigger>
              <Avatar></Avatar>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownSection title={"Profile"}>
                <DropdownItem>
                  <p className={"font-semibold text-black"}>Signed in as</p>
                  <p className={"font-semibold text-black"}>{userEmail}</p>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title={"Actions"}>
                <DropdownItem
                  key={"cookbook"}
                  className={"text-black"}
                  onPress={() => {
                    router.push("/cookbook");
                  }}
                >
                  Cookbook
                </DropdownItem>
                <DropdownItem
                  key={"preferences"}
                  className={"text-black"}
                  onPress={() => {
                    router.push("/preferences");
                  }}
                >
                  Preferences
                </DropdownItem>
                <DropdownItem
                  key={"edit-profile"}
                  className={"text-black"}
                  onPress={() => {
                    router.push("/edit-profile");
                  }}
                >
                  Edit Profile
                </DropdownItem>
                <DropdownItem
                  key={"logout"}
                  className={"text-danger"}
                  onPress={() => {
                    signOut();
                  }}
                >
                  Logout
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  );
}
