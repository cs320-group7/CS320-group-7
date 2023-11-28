"use client";

import { RecipeItem, getRecipeInformation, extractRecipebyURL } from "@/src/api/fetch-recipes";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, } from "@nextui-org/react";
import { useState } from "react"
import {
  RedirectType,
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";



export default function DisplayRecipes({ data }: { data: RecipeItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //for modal
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [instructions, setInstructions] = useState("")
  const [title, setTitle] = useState("")
  const [url, setURL] = useState("")
  const [cred, setCred] = useState("")


  // const handleClick = (id: number) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("id", id.toString());
  //   const query = params.toString();

  //   router.push(`/recipe-URL` + "?" + query);
  // };

  const handleClick = async (id: number) => {

    const recipeInfo = await getRecipeInformation(id) as any; //hack for quick test
    setCred(recipeInfo.creditsText)

    if (recipeInfo.instructions ==  '') {
      setInstructions("To view this recipe's instructions, please visit the webpage linked below")
      // redirect(recipeInfo.sourceUrl);
    } else {
      setInstructions(recipeInfo.instructions)
    }
    setURL(recipeInfo.sourceUrl)
    setTitle(recipeInfo.title)
    onOpen()
  }

  const openURL = async () => {
    redirect(url) 
  }



  

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {data.map((e) => (
        <Card
          shadow="sm"
          key={e.id}
          isPressable
          onPress={() => {
            handleClick(e.id);
          }}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={e.title}
              className="w-full object-cover h-[140px]"
              src={e.image}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{e.title}</b>
            <p className="text-default-500">{e.id}</p>
          </CardFooter>
        </Card>
      ))}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-default-500">{title}</ModalHeader>
              <ModalBody>
                <p className={"text-xs text-default-500"}> 
                <h1>
                Instructions:
                </h1>
                
                  {instructions}
                </p>
                <p className={"text-xs text-default-500"}> 
                Credit: {cred}
                </p>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => window.open(url, "_blank", "noreferrer")}>
                  Visit Source
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
    
  );
}
