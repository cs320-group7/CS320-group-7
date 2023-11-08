"use client";

import { getUserIntolerances } from "@/src/db/queries";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

export default function DisplayPreferences({
  data,
}: {
  data: string[] | undefined;
}) {
  const diets = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ];

  const intolerances = [
    "Dairy",
    "Egg",
    "Gluten",
    "Grain",
    "Peanut",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
    "Wheat",
  ];

  return (
    <div className="list-container bg-gray-400">
      {intolerances.map((e: string, i) => {
        return (
          <div key={i}>
            <Checkbox
              defaultSelected={data?.includes(e)}
              className="text-white"
            >
              {" "}
              {e}
            </Checkbox>
          </div>
        );
      })}
    </div>
  );
}
