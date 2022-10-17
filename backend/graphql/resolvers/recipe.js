const Recipe = require("../../models/recipe");
const User = require("../../models/user");

module.exports = {
  createRecipe: async (args, req) => {
    
    // TODO check token to continue (Ignore this for now)

    
    const recipe = new Recipe({
      title: args.recipeInput.title,
      content: args.recipeInput.content,
      dateCreated: new Date(args.recipeInput.dateCreated),
      contributor: "634b99b78d5b79ca9856f95c",
    });

    let createdRecipe;
    try {
      const contributor = await User.findById("634b99b78d5b79ca9856f95c");

      if (!contributor) {
        throw new Error("User not found.");
      }

      const result = await recipe.save();
      console.log(result);
      // createdRecipe = transformEvent(result);

      contributor.listRecipes.push(recipe);
      await contributor.save();

      // TODO return proper data

      return {
        content: "someContent",
        title: "someTitle",
        _id: null,
        dateCreated: "somedate",
        contributor: null,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  
  getRecipeById: async (args,req) =>{
    
    // TODO check token to continue (Ignore this for now)
    
    const recipe = await Recipe.findOne({
     _id: args.id,
    });
    

    // TODO return proper data
    return {
      content: "someContent",
      title: "someTitle",
      _id: null,
      dateCreated: "somedate",
      contributor: null,
    };
  },

  getListRecipeByContributor: async (args, req) => {
    
    // TODO check token to continue (Ignore this for now)
    
    const user = await User.findOne({
      username: args.username,
    });

    if(!user){
      throw new Error("User not found");
    }

    const recipes = user.listRecipes; 
    // this return list of recipe ID
    console.log(recipes);
    
    //TODO  Return a list of recipes
    return [{
      content: "someContent",
      title: "someTitle",
      _id: null,
      dateCreated: "somedate",
      contributor: null,
    }]; 
    
  },
};
