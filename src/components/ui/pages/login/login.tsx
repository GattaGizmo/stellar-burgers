import { FC } from 'react';
import {
  Input,
  Button,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from '../common.module.css';
import { LoginUIProps } from './type';

export const LoginUI: FC<LoginUIProps> = ({
  email,
  setEmail,
  errorText,
  handleSubmit,
  password,
  setPassword
}) => (
  <main className={styles.container}>
    <section className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-medium'>Вход</h3>
      <form className={`pb-15 ${styles.form}`} onSubmit={handleSubmit}>
        <Input
          type='email'
          placeholder='E-mail'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name='email'
          size='default'
          extraClass='pb-6'
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name='password'
          extraClass='pb-6'
        />
        <Button
          type='primary'
          size='medium'
          htmlType='submit'
          extraClass='pb-6'
        >
          Войти
        </Button>
        {errorText && (
          <p className={`${styles.error} text text_type_main-default pb-6`}>
            {errorText}
          </p>
        )}
      </form>
      <p className={`pb-4 ${styles.question} text text_type_main-default`}>
        Вы - новый пользователь?
        <Link to='/register' className={`pl-2 ${styles.link}`}>
          Зарегистрироваться
        </Link>
      </p>
      <p className={`${styles.question} text text_type_main-default pb-6`}>
        Забыли пароль?
        <Link to='/forgot-password' className={`pl-2 ${styles.link}`}>
          Восстановить пароль
        </Link>
      </p>
    </section>
  </main>
);
