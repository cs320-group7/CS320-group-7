'use client'
import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {getRecipeInformation, RecipeData} from "../../src/api/fetch-recipes";

const getRecipeSrc = async (id: number) => {
    let info = await getRecipeInformation(id)
    return info.sourceUrl
}

export function RecipeCard ( props:{title: string, img_src:string, id:number}) {
    return (
        <Card className="py-4" isPressable onPress={async () => window.open(await getRecipeSrc(props.id), "_blank", "noreferrer")}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{props.title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                alt="Recipe Thumbnail"
                className="object-cover rounded-xl"
                src={props.img_src}
                width={312}
                />
            </CardBody>
        </Card>
    )
}

export async function RecipeList ( props:{searchedRecipes: RecipeData} ) {
    let recipes = props.searchedRecipes.results
    let recipeCards = []

    for (const {id, title, image} of recipes) {
        recipeCards.push(RecipeCard({title: title, img_src: image, id: id}))
    }

    const listItems = recipeCards.map(card => <li key={card.props.id}>{card}</li>)
    return <ul>{listItems}</ul>;
}