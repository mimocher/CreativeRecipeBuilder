import React from 'react';
import RecipeItem from './RecipeItem1';
function RecipeList(props) {
  const { recipes, onEdit, onDelete, onDuplicate } = props;
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      ))}
    </div>
  );
}
export default RecipeList;