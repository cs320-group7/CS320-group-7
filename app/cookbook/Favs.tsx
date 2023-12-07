"use client";
import { Recipe } from ".prisma/client";
import { Button, Card, CardBody, Image, Link } from "@nextui-org/react";
import { toast } from "react-toastify";
import { HeartIcon } from "@/app/HeartIcon";
import { getRecipeInformation } from "@/src/api/fetch-recipes";
import { useState } from "react";

export default function Favs({ results }: { results: void | Recipe[] | null }) {
  const Alert = () => (
    <div
      className="p-4 mb-4 max-w-xl mx-auto w-full text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <span className="font-medium">Success alert!</span> Profile updated.
    </div>
  );

  const [showAlert, setShowAlert] = useState(false);
  return (
    <>
      {results ? (
        results.length === 0 ? (
          <p className={"mx-auto text-black font-semibold text-xl"}>
            You have not saved any recipes yet!{" "}
          </p>
        ) : (
          <div className={"flex justify-center py-10"}>
            <div className={"flex flex-col"}>
              {showAlert && <Alert />}
              <p className={"mx-auto text-black font-semibold text-xl"}>
                Your saved recipes{" "}
              </p>
              <div className={"grid grid-cols-3 gap-4 py-5"}>
                {results.map((e) => {
                  return (
                    <Card key={e.id}>
                      <CardBody className={"flex flex-col items-center gap-2"}>
                        <div
                          className={"flex justify-between w-full px-2 gap-4"}
                        >
                          <p className={"font-semibold"}>{e.title}</p>
                          <Button
                            variant={"bordered"}
                            color={"danger"}
                            size={"sm"}
                            radius={"none"}
                            onPress={() => {
                              fetch(`/api/world?id=${e.id}`).then(() => {
                                setShowAlert(true);
                                setTimeout(() => {
                                  setShowAlert(false);
                                }, 5000); // 5000 milliseconds (5 seconds)
                              });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                        <Image
                          alt={"Recipe image"}
                          src={`https://spoonacular.com/recipeImages/${e.id}-312x231.${e.imageType}`}
                          radius={"sm"}
                        ></Image>
                        <div className={"flex flex-col justify-between"}>
                          <div className={"flex items-start justify-between"}>
                            <div className={"flex flex-col"}></div>
                          </div>
                          <Link
                            isBlock
                            color={"foreground"}
                            showAnchorIcon
                            className={"text-green-800"}
                          >
                            Go to recipe source url
                          </Link>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )
      ) : (
        <div></div>
      )}
    </>
  );
}
