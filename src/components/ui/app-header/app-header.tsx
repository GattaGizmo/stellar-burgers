import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../services/store';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';

export const AppHeaderUI = ({ userName, currentPath }: TAppHeaderUIProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const getNavLinkClass = (path: string) =>
    `${styles.link} ${currentPath.startsWith(path) ? styles.link_active : ''}`;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to='/' className={getNavLinkClass('/')}>
            <BurgerIcon type='primary' />
            <span className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </span>
          </NavLink>
          <NavLink to='/feed' className={getNavLinkClass('/feed')}>
            <ListIcon type='primary' />
            <span className='text text_type_main-default ml-2'>
              Лента заказов
            </span>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Link to='/'>
            <Logo className='' />
          </Link>
        </div>
        <div className={styles.link_position_last}>
          <NavLink
            to={isAuthenticated ? '/profile' : '/login'}
            className={getNavLinkClass('/profile')}
          >
            <ProfileIcon type='primary' />
            <span className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
