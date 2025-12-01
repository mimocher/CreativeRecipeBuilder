import React, { useState } from 'react';
function RecipeForm(props) {
  const { recipe, onSubmit, onClose } = props;
  const [nom, setNom] = useState('');
  const [categorie, setCategorie] = useState('plat');
  const [ingredients, setIngredients] = useState(['']);
  const [difficulte, setDifficulte] = useState(3);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  // pour ajouter un nouveau ingredient dans notre recette
  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };
  // Pour le supprimer
  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };
  // Pour le modifieer
  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  //pour la soumession d form
  const handleSubmit = (e) => {
    e.preventDefault();
    // cette etape pour filtrer les ingredients si ils sont vides ou pas avec alert d ajout au moins d un ing
    const validIngredients = ingredients.filter(ing => ing.trim() !== ''); 
    if (validIngredients.length === 0) {
      alert('Ajoutez au moins un ingrédient !');
      return;
    }
    // Creation de la recette et ses infos
    const recipeInfos = {
      nom: nom.trim(),
      categorie,
      ingredients: validIngredients,
      difficulte,
      description: description.trim(),
      image
    };
    // f le cas de modification on ajoute id
    if (recipe) {
      recipeInfos.id = recipe.id;
    }
    onSubmit(recipeInfos);
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{recipe ? '✏ Modifier la recette' : ' Créer une recette'}</h2>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-group">
            <label>Nom de la recette *</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)
              required
            />
          </div>
          <div className="form-group">
            <label>Catégorie *</label>
            <select 
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
            >
              <option value="entree">🥗 Entrée</option>
              <option value="plat">🍽 Plat</option>
              <option value="dessert">🍰 Dessert</option>
              <option value="boisson">🥤 Boisson</option>
            </select>
          </div>

          <div className="form-group">
            <label>Ingrédients </label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder='Votre ing'
                />
                <button
                  type="button"
                  className="btn btn-remove"
                  onClick={() => removeIngredient(index)}
                  disabled={ingredients.length === 1}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-add-ingredient"
              onClick={addIngredient}
            >
              ➕ Ajouter un ingrédient
            </button>
          </div>
          <div className="form-group">
            <label>
              Difficulté : {difficulte}/5 {'⭐'.repeat(difficulte)}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={difficulte}
              onChange={(e) => setDifficulte(Number(e.target.value))}
              className="slider"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre recette..."
              rows="4"
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && (
              <div className="image-preview">
                <img src={image} alt="Aperçu" />
              </div>
            )}
          </div>
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-cancel" 
              onClick={onClose}
            >
              Annuler
            </button>
            <button type="submit" className="btn btn-submit">
              {recipe ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeForm;


