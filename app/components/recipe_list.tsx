'use client'
import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {getRecipeInformation, RecipeData} from "../../src/api/fetch-recipes";
import {RecipeCard} from "./recipe_card"


export async function RecipeList ( props:{searchedRecipes: RecipeData} ) {
    let recipes = props.searchedRecipes.results
    let recipeCards = []

    for (const {id, title, image} of recipes) {
        recipeCards.push(RecipeCard({title: title, img_src: image, id: id}))
    }

    const listItems = recipeCards.map(card => <li key={card.props.id}>{card}</li>)
    return <ul>{listItems}</ul>;
}