'use client'

import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getUserDiets, getUserIntolerances } from "@/src/db/queries"; 
import {Card, CardHeader, CardBody, Image, Button, ButtonGroup} from "@nextui-org/react";
import {getRecipeInformation, searchRecipes, RecipeData} from "@/src/api/fetch-recipes";
import {RecipeCard, RecipeList} from "./recipe_list"
import {CheckboxGroup, Checkbox} from "@nextui-org/react";

export function RecipeForm (props:{user:User, diets:{diets: string[]}, intolerances:{intolerances: string[]}}) {
    const [diets, setDiets] = useState<{diets: string[]}>(props.diets);
    const [intolerances, setIntolerances] = useState<{intolerances: string[]}>(props.intolerances);
    const [recipeList, setRecipeList] = useState<JSX.Element[] | null>(null);
    const [selected, setSelected] = React.useState(["useDiets", "useIntolerances"]);

    async function pressed() {
        let queryDiets = diets
        let queryIntol = intolerances
        if (!selected.includes("useDiets")){
            queryDiets = {diets: []}
        }
        if (!selected.includes("useIntolerances")){
            queryIntol = {intolerances: []}
        }
        let query = await searchRecipes("pasta", "tomato,onion", queryDiets, queryIntol) as RecipeData
        setRecipeList(await RecipeList({searchedRecipes:query}))
    }


    return (
        <>
            
            <div>diets: {diets.diets}</div>
            <div>intolerances: {intolerances.intolerances}</div>
            <Card>
                <CardBody>
                <CheckboxGroup 
                label="Select query options" 
                orientation="horizontal" 
                color="secondary"
                value={selected}
                onValueChange={setSelected}
                >

                
                <Checkbox defaultSelected value="useDiets" className="text-white">Use Diets</Checkbox>
                <Checkbox defaultSelected value="useIntolerances" className="text-white">Use Intolerances</Checkbox>
            </CheckboxGroup>
            
            <Button onPress = {pressed} radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" >
                do Query
            </Button>
                </CardBody>
            </Card> 
            <ul>{recipeList}</ul>
        </>
    );
}