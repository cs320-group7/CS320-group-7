export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/search-recipes-by-ingredients",
    "/preferences",
    "/cookbook",
    "/complex-search",
  ],
};
