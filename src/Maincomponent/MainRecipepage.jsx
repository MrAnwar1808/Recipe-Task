
import React, { useEffect, useState } from 'react';
import RecipeList from '../recepie/Recepielist';
import Filter from '../recepie/Filter';
import SearchBar from '../recepie/SearchBar';
import './MainRecipepage.css'



const Mainpage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    isVegetarian: '',
    maxPreparationTime: '',
  });

  useEffect(() => {
    
    const fetchRecipes = async () => {
      const response = await fetch('/recipes.json');
      const data = await response.json();
      setRecipes(data);
      setFilteredRecipes(data);
    };

    fetchRecipes();
  }, []);

  
  useEffect(() => {
    let result = [...recipes];

    
    if (searchQuery) {
      result = result.filter((recipe) =>
          recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    
    if (filterOptions.isVegetarian !== '') {
      result = result.filter(
        (recipe) => recipe.isVegetarian === (filterOptions.isVegetarian === 'vegetarian')
      );
    }

    if (filterOptions.maxPreparationTime) {
      result = result.filter(
        (recipe) => recipe.preparationTime <= filterOptions.maxPreparationTime
      );
    }

    setFilteredRecipes(result);
  }, [searchQuery, filterOptions, recipes]);

  return (
    <div className="App">
      <h1>Recipe Finder</h1>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Filter filterOptions={filterOptions} setFilterOptions={setFilterOptions} />

     <RecipeList recipes={filteredRecipes} />

    </div>
  );
};

export default Mainpage;
