
import React from 'react';
function RecipeFilter(props) {
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory } = props;
  return (
    <div className="recipe-filter">
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Rechercher une recette..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="category-filter">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"  >
          <option value="">Toutes les catégories</option>
          <option value="entree">🥗 Entrée</option>
          <option value="plat">🍽 Plat</option>
          <option value="dessert">🍰 Dessert</option>
          <option value="boisson">🥤 Boisson</option>
        </select>
      </div>
    </div>
  );
}
export default RecipeFilter;