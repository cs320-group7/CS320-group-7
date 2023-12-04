"use client";

import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import Nav from "@/app/Nav";
import In from "@/app/In";
import useSWR from "swr";
import { Intolerance } from ".prisma/client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChangeEvent, useState } from "react";
import { FailureAlert, SuccessAlert, WarningAlert } from "@/app/alerts";
import { Ingredient } from "@prisma/client";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  Input,
  Selection,
} from "@nextui-org/react";
import { SearchIcon, DeleteIcon } from "@nextui-org/shared-icons";

export default function DisplayPreferences({
  intolerances,
  userIntolerances,
  userDiets,
  userEmail,
  ingredients,
  userIngredients

}: {
  intolerances: Intolerance[];
  userIntolerances: number[] | undefined;
  userDiets: string[] | undefined;
  userEmail: string | undefined | null;
  ingredients: Ingredient[],
  userIngredients: number[] | undefined
}) {
  const diets = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ];

  const notify = () => toast("wow so easy!");

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [showFailureAlert, setShowFailureAlert] = useState(false);

  const [showWarningAlert, setShowWarningAlert] = useState(false);

  const [selectedIngredeients, setSelectedIngredients] = useState<Set<string>>(
    new Set([]),
  );

  const handleChange = async (
    event: ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    fetch(`/api/hello?id=${id}&state=${event.target.checked}`)
      .then((res) => {
        console.log(res.ok);
        if (!res.ok) {
          console.log("hi");
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        toast.success("Successfully updated profile!");
      })
      .catch((err) => {
        toast.error("Failed to update profile!");
      });
  };

  return (
    <div className={"container min-h-screen min-w-full bg-gray-200"}>
      <Nav userEmail = {userEmail}/>

      <div className={"max-w-2xl my-auto mx-auto flex flex-col gap-4 my-5"}>
        {showSuccessAlert && (
          <SuccessAlert msg={"Successfully updated profile!"} />
        )}
        {showFailureAlert && (
          <FailureAlert msg={"Failed to update profile. Please try again!"} />
        )}
        {showWarningAlert && (
          <WarningAlert
            msg={"Please wait before submitting another request!"}
          />
        )}
      </div>
      <div className={"flex justify-center mt-40 gap-40"}>
        <div>
          <h1 className={"text-xl text-black py-2"}> Intolerances </h1>
          <div className={"grid grid-cols-1 gap-2"}>
            {" "}
            {intolerances.map((e) => {
              return (
                <Checkbox
                  key={e.id}
                  defaultSelected={userIntolerances?.includes(e.id)}
                  onChange={(event) => {
                    if (showSuccessAlert || showFailureAlert) {
                      setShowWarningAlert(true);
                      setTimeout(() => {
                        setShowWarningAlert(false);
                      }, 5000);
                      return;
                    }

                    if (showWarningAlert) {
                      return;
                    }

                    fetch(`/api/hello?id=${e.id}&state=${event.target.checked}`)
                      .then((res) => {
                        if (!res.ok) {
                          return Promise.reject(res);
                        }
                        // TODO: Fix?
                        return res;
                      })
                      .then((data) => {
                        setShowSuccessAlert(true);
                        setTimeout(() => {
                          setShowSuccessAlert(false);
                        }, 5000);
                      })
                      .catch((err) => {
                        setShowFailureAlert(true);
                        setTimeout(() => {
                          setShowFailureAlert(false);
                        }, 5000);
                      });
                  }}
                >
                  <ToastContainer />
                  {e.name}
                </Checkbox>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className={"text-xl text-black py-2"}> Diets </h1>
          <div className={"grid grid-cols-1 gap-2"}>
            {" "}
            {diets.map((e) => {
              return (
                <Checkbox key={e} defaultSelected={userDiets?.includes(e)}>
                  {" "}
                  {e}{" "}
                </Checkbox>
              );
            })}
          </div>
        </div>
        <div className = "flex flex-col">
          <h1 className={"text-xl text-black py-2"}>Pantry</h1>
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
              {ingredients.map((e)=>(
                <AutocompleteItem key={e.id} textValue={e.name}>
                  <div className={'flex justify-between items-center'}>
                    <span className= {"text-small"}></span>
                    <Button
                    className="border-small mr-0.5 font-medium shadow-none"
                    radius="full"
                    size="sm"
                    variant="light"
                    onPress={() => {
                      //HOW TO ADD TO PASSED IN USER INGREDIENTS LIST
                      setSelectedIngredients((prev) => {
                        const newSet = new Set(prev);
                        newSet.add(e.name);
                        return newSet;
                      });
                    }}
                    >
                      Add Ingredient
                    </Button>
                  </div>
                </AutocompleteItem>
              ))}
            </Autocomplete>

            
            <div>
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
              startContent={<DeleteIcon className={"text-black"} />}
              radius={"none"}
              >
                {ingredients.filter((e)=>userIngredients?.includes(e.id)).map((e)=>(
                <AutocompleteItem key={e.id} textValue={e.name}>
                  <div className={'flex justify-between items-center'}>
                    <span className= {"text-small"}></span>
                    <Button
                    className="border-small mr-0.5 font-medium shadow-none"
                    radius="full"
                    size="sm"
                    variant="light"
                    onPress={() => {
                      //DELETE INGREDIENTS
                      
                    }}
                    >
                      Add Ingredient
                    </Button>
                  </div>
                </AutocompleteItem>
              ))}
              </Autocomplete>
            </div>
        </div>
      </div>
    </div>
  );
}
