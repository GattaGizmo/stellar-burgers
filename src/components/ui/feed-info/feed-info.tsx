import React, { FC, memo } from 'react';
import styles from './feed-info.module.css';
import { FeedInfoUIProps, HalfColumnProps, TColumnProps } from './type';

export const FeedInfoUI: FC<FeedInfoUIProps> = memo(
  ({ feed, readyOrders, pendingOrders }) => (
    <section>
      <div className={styles.columns}>
        <HalfColumn orders={readyOrders} title='Готовы' textColor='#00cccc' />
        <HalfColumn orders={pendingOrders} title='В работе' />
      </div>
      <Column title='Выполнено за все время' content={feed.total} />
      <Column title='Выполнено за сегодня' content={feed.totalToday} />
    </section>
  )
);

const HalfColumn: FC<HalfColumnProps> = ({
  orders,
  title,
  textColor = '#F2F2F3'
}) => (
  <div className={`pr-6 ${styles.column}`}>
    <h3 className={`text text_type_main-medium ${styles.title}`}>{title}:</h3>
    <ul className={`pt-6 ${styles.list}`}>
      {orders.map((item, index) => (
        <li
          key={index}
          className={`text text_type_digits-default ${styles.list_item}`}
          style={{ color: textColor }}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Column: FC<TColumnProps> = ({ title, content }) => (
  <div className='pt-15'>
    <h3 className={`text text_type_main-medium ${styles.title}`}>{title}:</h3>
    <p className={`text text_type_digits-large ${styles.content}`}>{content}</p>
  </div>
);
