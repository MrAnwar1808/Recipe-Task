
import React from 'react';

const Filter = ({ filterOptions, setFilterOptions }) => {
  const handleVegetarianChange = (e) => {
    setFilterOptions({ ...filterOptions, isVegetarian: e.target.value });
  };

  const handleTimeChange = (e) => {
    setFilterOptions({ ...filterOptions, maxPreparationTime: e.target.value });
  };

  return (
    <div className="filter">
      <select onChange={handleVegetarianChange}>
        <option value="">Vegetarian Filter</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="non-vegetarian">Non-Vegetarian</option>
      </select>

      <select onChange={handleTimeChange}>
        <option value="">Max Preparation Time</option>
        <option value="20">20 mins</option>
        <option value="30">30 mins</option>
        <option value="40">40 mins</option>
      </select>
    </div>
  );
};

export default Filter;
