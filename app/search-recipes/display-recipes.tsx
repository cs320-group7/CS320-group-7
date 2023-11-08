"use client";

import { RecipeItem, getRecipeInformation } from "@/src/api/fetch-recipes";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function DisplayRecipes({ data }: { data: RecipeItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (id: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("id", id.toString());
    const query = params.toString();

    router.push(`/recipe-URL` + "?" + query);
  };

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
    </div>
  );
}
