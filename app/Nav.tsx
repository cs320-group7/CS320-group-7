"use client";

import {
  Avatar,
  Button,
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
  Tooltip
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { SearchIcon } from "@nextui-org/shared-icons";
import { AvatarIcon} from "@nextui-org/shared-icons";


export default function Nav({userEmail} :{userEmail: string | undefined | null}) {
  const router = useRouter();

  return (
    <>
      <Navbar style={{backgroundColor: '#5D8064'}} isBordered>
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
          {/* <Link
            className={' text-celadon'}
            underline={"hover"}
            href={"/search-recipes-by-ingredients"}
          >
            Ingredients search
          </Link> */}
          <Tooltip shadow='md' showArrow={true} style={{color: "#014421"}} content={'Generate Recipes based only on Ingredients chosen'}>
            <Button style={{color: '#A7DCA5', backgroundColor:'#355E3B'} } onClick={() => {window.location.href="/search-recipes-by-ingredients"}}>
            <SearchIcon></SearchIcon>
              Ingredients search
            </Button>
          </Tooltip>
          
          <Divider orientation={"vertical"} className={"max-h-5"} style={{backgroundColor: 'black'}} />
          {/* <Link
            className={" text-celadon"}
            color={"success"}
            underline={"hover"}
            href={"/complex-search"}
          >
            Complex search
          </Link> */}
          <Tooltip shadow='md' showArrow={true} style={{color: "#014421"}} content={'Generate recipes based on profile preferences'}>
            <Button style={{color: '#A7DCA5', backgroundColor:'#355E3B'} } onClick={() => {window.location.href="/complex-search"}}>
              <AvatarIcon></AvatarIcon>
              Complex search
            </Button>
          </Tooltip>
        </NavbarContent>
        <NavbarContent justify={"end"}>
          <Dropdown>
            <DropdownTrigger style={{ cursor: "pointer" }}>
            <Avatar className="transition-transform hover:scale-110"></Avatar>
            </DropdownTrigger>
            <DropdownMenu variant={"faded"} style={{backgroundColor: ''}}>
              <DropdownSection title={"Profile"}>
                <DropdownItem>
                  <p className={"font-semibold text-black"}>Signed in as</p>
                  <p className={"font-semibold text-black"}>{userEmail}</p>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title={"Actions"}>
                <DropdownItem
                  key={"cookbook"}
                  description="View the recipes you've saved"
                  className={"text-black"}
                  onPress={() => {
                    router.push("/cookbook");
                  }}
                >
                  Cookbook
                </DropdownItem>
                
                <DropdownItem
                  key={"preferences"}
                  description="View your current set preferences"
                  className={"text-black"}
                  onPress={() => {
                    router.push("/preferences");
                  }}
                >
                  Preferences
                </DropdownItem>
                
                <DropdownItem
                  key={"logout"}
                  description="Log out of your profile"
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
