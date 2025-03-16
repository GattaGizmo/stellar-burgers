import { FC } from 'react';
import { Input, Button } from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from '../common.module.css';
import { PageUIProps } from '../common-type';

export const ForgotPasswordUI: FC<PageUIProps> = ({
  errorText,
  email,
  setEmail,
  handleSubmit
}) => (
  <main className={styles.container}>
    <section className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-medium'>Восстановление пароля</h3>
      <form className={`pb-15 ${styles.form}`} onSubmit={handleSubmit}>
        <Input
          type='email'
          placeholder='Укажите e-mail'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name='email'
          error={false}
          errorText=''
          size='default'
          extraClass='pb-6'
        />
        <Button
          type='primary'
          size='medium'
          htmlType='submit'
          extraClass='pb-6'
        >
          Восстановить
        </Button>
        {errorText && (
          <p className={`${styles.error} text text_type_main-default pb-6`}>
            {errorText}
          </p>
        )}
      </form>
      <p className={`${styles.question} text text_type_main-default pb-6`}>
        Вспомнили пароль?
        <Link to='/login' className={`pl-2 ${styles.link}`}>
          Войти
        </Link>
      </p>
    </section>
  </main>
);
