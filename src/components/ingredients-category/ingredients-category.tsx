import { TIngredient } from '@utils-types';
import { forwardRef, useMemo } from 'react';
import { useAppSelector } from '../../services/store';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { TIngredientsCategoryProps } from './type';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const { bun, ingredients: selectedIngredients } = useAppSelector(
    (state) => state.order
  );

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};

    if (bun) counters[bun._id] = 2;

    selectedIngredients.forEach(({ _id }) => {
      counters[_id] = (counters[_id] || 0) + 1;
    });

    return counters;
  }, [bun, selectedIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
