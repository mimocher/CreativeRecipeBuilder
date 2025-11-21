import React, { useState } from 'react';
import Pagination from './Pagination1';
import RecipeForm from './RecipeForm1';
import RecipeItem from './RecipeItem1';
import RecipeList from './RecipeList1';
import RecipeFilter from './RecipeFilter1';
import Aide from './Aide1';
function MainPage() {

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      nom: 'Tajine aux légumes',
      categorie: 'plat',
      ingredients: ['Courgettes', 'Carottes', 'Pommes de terre', 'Oignons'],
      difficulte: 3,
      description: 'Un délicieux tajine marocain aux légumes de saison',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'
    },
    {
      id: 2,
      nom: 'Salade Marocaine',
      categorie: 'entree',
      ingredients: ['Tomates', 'Concombres', 'Poivrons', 'Oignons'],
      difficulte: 1,
      description: 'Une salade fraîche et colorée',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'
    },
    {
      id: 3,
      nom: 'Pastilla au poulet',
      categorie: 'entree',
      ingredients: ['Poulet', 'Amandes', 'Cannelle', 'Feuilles de brick'],
      difficulte: 4,
      description: 'Un plat traditionnel sucré-salé',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  //c Le nombre de recette qui doit etre affichees dans la page pour moi 6 recettes
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6; 

  const addRecipe = (recipe) => {
    const nouvelleRecette = {
      ...recipe,
      id: Date.now() //pour chaque recette sera un id unique
    };
    setRecipes([...recipes, nouvelleRecette]); };

  
  const updateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r)
    );
    setShowForm(false);
    setEditingRecipe(null);
  };

  const deleteRecipe = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette recette ?')) {
      setRecipes(recipes.filter(r => r.id !== id));
    }
  };
  const duplicateRecipe = (recipe) => {
    const duplicated = {
      ...recipe,
      id: Date.now(),
      nom: recipe.nom + ' (dupliquee)'
    };
    setRecipes([...recipes, duplicated]);
  };
  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const filteredRecipes = recipes.filter(recipe => {
    const parRecherche = recipe.nom
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const parCateg = 
      selectedCategory === '' || recipe.categorie === selectedCategory;
    
    return parRecherche && parCateg;
  });
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe, 
    indexOfLastRecipe
  );
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  return (
    <div className="main-page">
      <header className="page-header">
        <h1>🍳 Creative Recipe Builder</h1>
        <p className="subtitle">Créez et gérez vos recettes de cuisine préférées</p>
      </header>
      <div className="page-container">
        <div className="top-actions">
          <RecipeFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <button 
            className="btn-create"
            onClick={() => {
              setEditingRecipe(null);
              setShowForm(true);
            }}
          >
            ➕ Créer une nouvelle recette
          </button><Aide />
        </div>
        <RecipeList
          recipes={currentRecipes}
          onEdit={handleEdit}
          onDelete={deleteRecipe}
          onDuplicate={duplicateRecipe}
        />
        {filteredRecipes.length >3 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        {showForm && (
          <RecipeForm
            recipe={editingRecipe}
            onSubmit={editingRecipe ? updateRecipe : addRecipe}
            onClose={() => {
              setShowForm(false);
              setEditingRecipe(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default MainPage;