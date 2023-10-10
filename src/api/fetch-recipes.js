// fetchRecipes(query: string, includeIngredients: string) => string[]
export const fetchRecipes = async (query, includeIngredients) => {

    // This method combines searching by query, by ingredients, and by nutrients into one endpoint.
    const searchUrl = new URL('https://api.spoonacular.com/recipes/complexSearch');

    searchUrl.searchParams.append('apiKey', "4c60051133c54a499fb0d966c01e78af");

    // The (natural language) recipe search query.
    searchUrl.searchParams.append('query', query);

    // A comma-separated list of ingredients that should/must be used in the recipes.
    searchUrl.searchParams.append('includeIngredients', includeIngredients);

    const res = await fetch(searchUrl.toString());

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const json = await res.json();

    let recipes = [];

    json.results.forEach(e => result.push(e.title));

    return recipes;
}
