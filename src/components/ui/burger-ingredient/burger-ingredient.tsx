import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count = 0, handleAdd, locationState }) => (
    <li className={styles.container}>
      <Link
        className={styles.article}
        to={`/ingredients/${ingredient._id}`}
        state={locationState}
      >
        {count > 0 && <Counter count={count} />}
        <img
          className={styles.img}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={`${styles.cost} mt-2 mb-2`}>
          <p className='text text_type_digits-default mr-2'>
            {ingredient.price}
          </p>
          <CurrencyIcon type='primary' />
        </div>
        <p className={`text text_type_main-default ${styles.text}`}>
          {ingredient.name}
        </p>
      </Link>
      <AddButton
        text='Добавить'
        onClick={handleAdd}
        extraClass={`${styles.addButton} mt-8`}
      />
    </li>
  )
);
