import React, { FC, memo } from 'react';
import styles from './ingredient-details.module.css';
import { IngredientDetailsUIProps } from './type';

export const IngredientDetailsUI: FC<IngredientDetailsUIProps> = memo(
  ({
    ingredientData: {
      name,
      image_large,
      calories,
      proteins,
      fat,
      carbohydrates
    }
  }) => (
    <div className={styles.content}>
      <img
        className={styles.img}
        alt='изображение ингредиента'
        src={image_large}
      />
      <h3 className='text text_type_main-medium mt-2 mb-4'>{name}</h3>
      <ul className={`${styles.nutritional_values} text_type_main-default`}>
        {[
          { label: 'Калории, ккал', value: calories },
          { label: 'Белки, г', value: proteins },
          { label: 'Жиры, г', value: fat },
          { label: 'Углеводы, г', value: carbohydrates }
        ].map(({ label, value }, index) => (
          <li key={index} className={styles.nutritional_value}>
            <p className={`text mb-2 ${styles.text}`}>{label}</p>
            <p className='text text_type_digits-default'>{value}</p>
          </li>
        ))}
      </ul>
    </div>
  )
);
