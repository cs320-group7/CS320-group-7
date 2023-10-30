'use client'

import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getUserDiets, getUserIntolerances } from "@/src/db/queries"; 
import {Card, CardHeader, CardBody, Image, Button, ButtonGroup} from "@nextui-org/react";
import {getRecipeInformation, searchRecipes, RecipeData} from "@/src/api/fetch-recipes";
import {RecipeCard, RecipeList} from "./recipe_list"

export function RecipeForm (props:{user:User, diets:{diets: string[]}, intolerances:{intolerances: string[]}}) {
    const [diets, setDiets] = useState<{diets: string[]} | null>(props.diets);
    const [intolerances, setIntolerances] = useState<{intolerances: string[]} | null>(props.intolerances);
    const [recipeList, setRecipeList] = useState<JSX.Element[] | null>(null);

    async function pressed() {
        let query = await searchRecipes("pasta", "tomato,onion", diets, intolerances) as RecipeData
        setRecipeList(await RecipeList({searchedRecipes:query}))
    }

    return (
        <>
            <Button onPress = {pressed} radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" >
                do Query
            </Button>
            <ul>{recipeList}</ul>
        </>
    );
}