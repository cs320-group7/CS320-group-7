"use client";

import {
  Avatar,
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

export default function Nav() {
  const router = useRouter();
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className={"font-bold text-black"}>PrepPal</p>
        </NavbarBrand>
        <NavbarContent justify={"end"}>
          <Dropdown>
            <DropdownTrigger>
              <Avatar></Avatar>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownSection title={"Profile"}>
                <DropdownItem>
                  <p className={"font-semibold text-black"}>Signed in as</p>
                  <p className={"font-semibold text-black"}>test@test.com</p>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title={"Actions"}>
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
