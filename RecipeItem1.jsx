import React from 'react';
function RecipeItem(props) {
  const { recipe, onEdit, onDelete, onDuplicate } = props;
  const Diff = () => {
    return '⭐'.repeat(recipe.difficulte);
  };
  return (
    <div className="recipe-card">
      <div className="recipe-image-container">
        <img 
          src={recipe.image || 'https://via.placeholder.com/300x200?text=Recette'} 
          alt={recipe.nom}
          className="recipe-image"
        />
      </div>
      <div className="recipe-content"><h3 className="recipe-title">{recipe.nom}</h3>
        <div className="recipe-meta">
          <span className='{badge badge-${recipe.categorie}}'>
            {recipe.categorie === 'entree' && '🥗 Entrée'}
            {recipe.categorie === 'plat' && '🍽 Plat'}
            {recipe.categorie === 'dessert' && '🍰 Dessert'}
            {recipe.categorie === 'boisson' && '🥤 Boisson'}
          </span>
        </div>
        <div className="recipe-difficulty">
          <strong>Difficulté :</strong> {Diff()} ({recipe.difficulte}/5)
        </div>
        <div className="recipe-ingredients">
          <strong>Ingrédients :</strong>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>• {ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="recipe-description">
          <strong>Description :</strong>
          <p>{recipe.description}</p>
        </div>
        <div className="recipe-actions">
          <button 
            className="btn btn-edit"
            onClick={() => onEdit(recipe)}
          >Modifier </button>
          
          <button 
            className="btn btn-duplicate"
            onClick={() => onDuplicate(recipe)}
          >Dupliquer </button>
          <button 
            className="btn btn-delete"
            onClick={() => onDelete(recipe.id)}
          >Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
export default RecipeItem;