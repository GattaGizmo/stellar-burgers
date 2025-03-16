import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);

  const ingredientData = useMemo(
    () => ingredients.find((item) => item._id === id),
    [ingredients, id]
  );

  return ingredientData ? (
    <IngredientDetailsUI ingredientData={ingredientData} />
  ) : (
    <Preloader />
  );
};
