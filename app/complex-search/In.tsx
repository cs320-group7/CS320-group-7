"use client";

// import { react } from "React";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Selection,
} from "@nextui-org/react";
import { DeleteIcon, SearchIcon } from "@nextui-org/shared-icons";
import { useState } from "react";
import { Ingredient } from ".prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

export default function In({ ingredients }: { ingredients: Ingredient[] }) {
  // For routing purposes
  const router = useRouter();
  const searchParams = useSearchParams();

  // TODO: Fix type
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const [selectedValues, setSelectedValues] = useState<Set<string>>(
    new Set([]),
  );

  const [isIntolerances, setIsIntolerances] = useState(false);
  const [isDiets, setIsDiets] = useState(false);

  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // What does this do?
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    params.set("query", query);

    params.set("isIntolerances", String(isIntolerances));

    params.set("isDiets", String(isDiets));

    params.set("ingredients", Array.from(selectedValues).join(", "));

    console.log(params);

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className={"flex flex-col min-h-screen min-w-full py-36"}>
      <form
        onSubmit={handleSubmit}
        className={"flex flex-col mx-auto w-full max-w-md gap-2 items-center"}
      >
        {/*<pre className={"text-black"}>Query: {JSON.stringify(query)}</pre>*/}
        <Input
          className={"max-w-md"}
          value={query}
          label={"Query"}
          type={"text"}
          isRequired
          onChange={(e) => setQuery(e.target.value)}
          radius={"none"}
        ></Input>
        {/*<div className={"flex flex-col"}>*/}
        {/*  <Checkbox*/}
        {/*    onChange={() => {*/}
        {/*      setIsIntolerances((prevState) => !prevState);*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    Use intolerances preferences*/}
        {/*  </Checkbox>*/}
        {/*  <Checkbox*/}
        {/*    onChange={() => {*/}
        {/*      setIsDiets((prevState) => !prevState);*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    Use dietary preferences*/}
        {/*  </Checkbox>*/}
        {/*</div>*/}
        <Autocomplete
          placeholder={"Add/paste ingredients"}
          classNames={{
            base: "max-w-md",
            listboxWrapper: "max-h-[320px]",
            selectorButton: "text-default-500",
          }}
          listboxProps={{
            hideSelectedIcon: true,
            itemClasses: {
              base: [
                "rounded-medium",
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "dark:data-[hover=true]:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[hover=true]:bg-default-200",
                "data-[selectable=true]:focus:bg-default-100",
                "data-[focus-visible=true]:ring-default-500",
              ],
            },
          }}
          inputProps={{
            classNames: {
              input: "ml-1",
              // inputWrapper: "h-[48px]",
            },
          }}
          popoverProps={{
            offset: 10,
            classNames: {
              base: "rounded-large",
              content: "p-1 border-small border-default-100 bg-background",
            },
          }}
          aria-label={"Select an ingredient"}
          startContent={<SearchIcon className={"text-black"} />}
          radius={"none"}
        >
          {ingredients.map((e) => (
            <AutocompleteItem key={e.id} textValue={e.name}>
              <div className={"flex justify-between items-center"}>
                <span className={"text-small"}>{e.name}</span>
                <Button
                  className="border-small mr-0.5 font-medium shadow-none"
                  radius="full"
                  size="sm"
                  variant="light"
                  onPress={() => {
                    setSelectedValues((prev) => {
                      const newSet = new Set(prev);
                      newSet.add(e.name);
                      return newSet;
                    });
                  }}
                >
                  Add
                </Button>
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <div className={"flex justify-between w-full"}>
          <div className={"flex flex-col"}>
            <Checkbox
              onChange={() => {
                setIsIntolerances((prevState) => !prevState);
              }}
            >
              Use intolerances preferences
            </Checkbox>
            <Checkbox
              onChange={() => {
                setIsDiets((prevState) => !prevState);
              }}
            >
              Use dietary preferences
            </Checkbox>
          </div>
          <Button
            size={"lg"}
            radius={"none"}
            variant={"flat"}
            color={"success"}
            type={"submit"}
            className={"max-w-xs"}
          >
            Search
          </Button>
        </div>
      </form>
      <h1 className={"flex justify-center py-6 text-xl text-gray-500"}>
        Pantry
      </h1>
      {/*TODO: Make cards bigger*/}
      <div className={"flex justify-center w-full"}>
        <div className={"grid grid-cols-6 gap-4"}>
          {Array.from(selectedValues).map((e) => {
            return (
              <Card key={e} className={"w-full max-w-md"}>
                <CardBody>
                  <div className={"flex justify-between"}>
                    <div className={"flex-col"}>
                      {/* TODO: cast?*/}
                      <h3 className={"font-semibold"}> {e as string} </h3>
                      {/*<p className={"text-sm"}>Fruits </p>*/}
                    </div>
                    <Button
                      isIconOnly={true}
                      variant={"light"}
                      className={
                        "data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                      }
                      radius={"full"}
                      // TODO: Polish
                      onPress={() => {
                        setSelectedValues((prev) => {
                          const newSet = new Set(prev);
                          newSet.delete(e);
                          return newSet;
                        });
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
