import * as model from "./model.js";
import recipeView from "./views/recipeView";

import "core-js/stable";
import "regenerator-runtime/runtime";

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function() {
  try {
    const id = window.location.hash.replace("#", "");
    if (!id) return;

    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

["hashchange", "load"].forEach(ev => window.addEventListener(ev, controlRecipes));
