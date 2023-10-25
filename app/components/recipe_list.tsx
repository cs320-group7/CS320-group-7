'use client'
import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {getRecipeInformation} from "../../src/api/fetch-recipes";
import {RecipeCard} from "./recipe_card"


export async function RecipeList ( props:{searchedRecipes: Promise<any>} ) {
    let recipes = await props.searchedRecipes
    let recipeCards = []

    for (const {id, title, img_src, ext} of recipes.results) {
        recipeCards.push(RecipeCard({title, img_src, id}))
    }

    return recipeCards
}