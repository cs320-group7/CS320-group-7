"use client";

import {
  Button,
  Card,
  CardBody,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";
import { HeartIcon } from "@/app/HeartIcon";
import { useState } from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, } from "@nextui-org/react";
import {
  getRecipeInformation,
  IRecipesByIngredients,
  RecipeItem,
} from "@/src/api/fetch-recipes";
import { redirect, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function CardGroup({
  results,
}: {
  results: IRecipesByIngredients[];
}) {

  const [liked, setLiked] = useState(false); // I recommend an array of false for # of results. or dict by recipeID. (phi

  const [state, setState] = useState(results.map((e) => false));

  const router = useRouter();

  //for modal
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [instructions, setInstructions] = useState("")
  const [title, setTitle] = useState("")
  const [url, setURL] = useState("")
  const [cred, setCred] = useState("")

  const handleClick = async (id: number) => {

    const recipeInfo = await getRecipeInformation(id) as any as {
      id: number,
      instructions: string,
      creditsText: string,
      sourceUrl: string,
      title: string
    }; //hack for quick test
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

  // const recipes = [
  //   {
  //     id: 73420,
  //     image: "https://spoonacular.com/recipeImages/73420-312x231.jpg",
  //     imageType: "jpg",
  //     likes: 0,
  //     missedIngredientCount: 3,
  //     missedIngredients: [
  //       {
  //         aisle: "Baking",
  //         amount: 1.0,
  //         id: 18371,
  //         image:
  //           "https://spoonacular.com/cdn/ingredients_100x100/white-powder.jpg",
  //         meta: [],
  //         name: "baking powder",
  //         original: "1 tsp baking powder",
  //         originalName: "baking powder",
  //         unit: "tsp",
  //         unitLong: "teaspoon",
  //         unitShort: "tsp",
  //       },
  //       {
  //         aisle: "Spices and Seasonings",
  //         amount: 1.0,
  //         id: 2010,
  //         image: "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg",
  //         meta: [],
  //         name: "cinnamon",
  //         original: "1 tsp cinnamon",
  //         originalName: "cinnamon",
  //         unit: "tsp",
  //         unitLong: "teaspoon",
  //         unitShort: "tsp",
  //       },
  //       {
  //         aisle: "Milk, Eggs, Other Dairy",
  //         amount: 1.0,
  //         id: 1123,
  //         image: "https://spoonacular.com/cdn/ingredients_100x100/egg.png",
  //         meta: [],
  //         name: "egg",
  //         original: "1 egg",
  //         originalName: "egg",
  //         unit: "",
  //         unitLong: "",
  //         unitShort: "",
  //       },
  //     ],
  //     title: "Apple Or Peach Strudel",
  //     unusedIngredients: [],
  //     usedIngredientCount: 1,
  //     usedIngredients: [
  //       {
  //         aisle: "Produce",
  //         amount: 6.0,
  //         id: 9003,
  //         image: "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
  //         meta: [],
  //         name: "apples",
  //         original: "6 large baking apples",
  //         originalName: "baking apples",
  //         unit: "large",
  //         unitLong: "larges",
  //         unitShort: "large",
  //       },
  //     ],
  //   },
  // ];

  const handlePress = (e: number) => {
    setState((prev) =>
      prev.map((e2, i) => {
        if (i == e) {
          return !e2;
        }
        return e2;
      }),
    );
  };

  return (
    <div className="grid grid-cols-3 p-24 justify-center gap-4">
      {results.map((e, i) => {
        return (
          <Card key={e.id} className={"w-full"} shadow={"none"} radius={"sm"}>
            <CardBody className={"grid grid-cols-2 gap-4"}>
              <Image
                alt={"Recipe image"}
                src={`https://spoonacular.com/recipeImages/${e.id}-312x150.${e.imageType}`}
                radius={"sm"}
              ></Image>

              <div className={"flex flex-col justify-between"}>
                <div className={"flex items-start justify-between"}>
                  <div className={"flex flex-col"}>
                    <h1 className={"font-semibold"}>{e.title}</h1>
                    <p className={"text-xs text-red-500"}>
                      Missed ingredients: {e.missedIngredientCount} (
                      {e.missedIngredients.map((e) => e.name).join(", ")})
                    </p>
                    <p className={"text-xs text-default-500"}>
                      Used ingredients: {e.usedIngredientCount} (
                      {e.usedIngredients.map((e) => e.name).join(", ")})
                    </p>
                  </div>
                  <Button
                    isIconOnly
                    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                    radius="full"
                    variant="light"
                    onPress={() => {
                      // const searchUrl = new URL("/api/foo");
                      // searchUrl.searchParams.append("id", e.id.toString());
                      // searchUrl.searchParams.append("title", e.title);
                      // searchUrl.searchParams.append("imageType", e.imageType);
                      fetch(
                        `/api/foo?id=${e.id}&title=${e.title}&imageType=${e.imageType}`,
                      )
                        .then((res) => {
                          if (!res.ok) {
                            return Promise.reject(res);
                          }
                          // TODO: Fix?
                          return res;
                        })
                        .then((data) => {
                          toast.success("Successfully updated profile!");
                        })
                        .catch((err) => {
                          toast.error("Failed to update profile!");
                        });
                      handlePress(i);
                    }}
                    // onPress={() => setLiked((v) => !v)}
                  >
                    <HeartIcon
                      className={liked ? "[&>path]:stroke-transparent" : ""}
                      size={24}
                      fill={state[i] ? "currentColor" : "none"}
                    />
                  </Button>
                </div>
                <Link
                  isBlock
                  color={"foreground"}
                  showAnchorIcon
                  className={"text-green-800"}
                  onPress={() => {
                    handleClick(e.id);
                  }}
                >
                  View Recipe
                </Link>
              </div>
            </CardBody>
          </Card>
        );
      })}
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
                  Visit Source URL
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
