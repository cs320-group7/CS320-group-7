"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface ISearchRecipe {
  query: string;
  includeIngredients: string;
}

export default function CreateForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [state, setState] = useState<ISearchRecipe>({
    query: "",
    includeIngredients: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    console.log(state.includeIngredients);

    params.set("query", state.query);
    params.set("includeIngredients", state.includeIngredients);

    const query = params.toString();

    console.log(query);

    router.push(`/search-recipes` + "?" + query);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center"
      >
        {" "}
        <Input
          name="query"
          label="Query"
          onChange={handleChange}
          variant="bordered"
          size="md"
        />
        <Input
          name="includeIngredients"
          label="Ingredients"
          onChange={handleChange}
          variant="bordered"
          size="md"
        />
        <Button type="submit" variant="flat" color="success">
          Search
        </Button>
      </form>
    </div>
  );
}
