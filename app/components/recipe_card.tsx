'use client'
import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {getRecipeInformation} from "../../src/api/fetch-recipes";

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

