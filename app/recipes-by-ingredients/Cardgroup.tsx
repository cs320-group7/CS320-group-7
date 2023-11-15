"use client";

import {
  Button,
  Card,
  CardBody,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";
import { HeartIcon } from "@/app/recipes-by-ingredients/HeartIcon";
import { useState } from "react";
import {
  getRecipeInformation,
  IRecipesByIngredients,
} from "@/src/api/fetch-recipes";
import { redirect, useRouter } from "next/navigation";

export default function CardGroup({
  results,
}: {
  results: IRecipesByIngredients[];
}) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

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

  return (
    <div className="grid grid-cols-3 p-24 justify-center gap-4">
      {results.map((e) => {
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
                    onPress={() => setLiked((v) => !v)}
                  >
                    <HeartIcon
                      className={liked ? "[&>path]:stroke-transparent" : ""}
                      fill={liked ? "currentColor" : "none"}
                    />
                  </Button>
                </div>
                <Link
                  isBlock
                  color={"foreground"}
                  showAnchorIcon
                  className={"text-green-800"}
                  onPress={async () => {
                    const recipeURL = (await getRecipeInformation(+e.id))
                      .sourceUrl;

                    router.push(recipeURL);
                  }}
                >
                  Go to recipe source url
                </Link>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
