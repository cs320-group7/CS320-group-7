import { assert } from "console";

import {
  getRecipeInformation,
  searchRecipes,
  searchRecipesByIngredients,
} from "../src/api/fetch-recipes";

test("searchRecipes follows type specification ", () => {
  const promise = searchRecipes("pasta", "tomato,cheese", null, null);

  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(Array.isArray(result));
    assert(result.every((e) => typeof e === "number"));
  });
});

test("getRecipeInformation follows type specification ", () => {
  const promise = getRecipeInformation(716429);

  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object");
    let keys = Object.keys(result);
    assert(keys.includes("id"));
    assert(keys.includes("title"));
    assert(keys.includes("sourceUrl"));
    assert(keys.includes("image"));
    assert(keys.includes("imageType"));
  });
});

test("searchRecipesByIngredients follows type specification ", () => {
  const promise = searchRecipesByIngredients(
    "chocolate, strawberries, ice cream",
  );

  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object");

    result.every((e) => {
      assert(Object.keys(e).every((x) => typeof x === "string"));
    });
  });
});
test("searchRecipesByIngredients returns expected output ", () => {
  const promise = searchRecipesByIngredients(
    "chocolate, strawberries, ice cream",
  );

  return promise.then((result) => {
    assert(typeof result === "object");

    result.every((e) => {
      const keys = Object.keys(e);
      assert(keys.includes("id"));
      assert(keys.includes("title"));
      assert(keys.includes("missedIngredientCount"));
    });
  });
});

test("searchRecipes fails if !response.ok ", () => {
  const promise = searchRecipes("", "", null, null);

  return promise.then(
    (result) => {
      assert(false);
    },
    (reason) => assert(reason instanceof Error),
  );
});

test("getRecipeInformation fails if !response.ok ", () => {
  const promise = getRecipeInformation(0);

  return promise.then(
    (result) => {
      assert(false);
    },
    (reason) => assert(reason instanceof Error),
  );
});

test("searchRecipesByIngredients fails if !response.ok ", () => {
  const promise = searchRecipesByIngredients("0");

  return promise.then(
    (result) => {
      assert(false);
    },
    (reason) => {
      assert(reason instanceof Error);
    },
  );
});
