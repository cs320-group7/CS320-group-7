"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function DropDown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(",").replaceAll("_", " "),
    [selectedKeys],
  );

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("includeIngredient", selectedValue);
    const query = params.toString();

    console.log(query);
    router.push(`/recipes` + "?" + query);
  };




  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          //onSelectionChange={setSelectedKeys}
        >
          <DropdownItem key="tomato">Tomato</DropdownItem>
          <DropdownItem key="cheese">Cheese</DropdownItem>
          <DropdownItem key="onion">Onion</DropdownItem>
          <DropdownItem key="garlic">Garlic</DropdownItem>
          <DropdownItem key="olive_oil">Olive Oil</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button onPress={handleClick}> Search </Button>
    </>
  );
}
