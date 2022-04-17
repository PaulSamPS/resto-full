import React from 'react';
import cn from 'classnames';
import styles from './Nav.module.scss';

const nav = [
  { id: 1, name: 'Горячие закуски' },
  { id: 2, name: 'Холодные закуски' },
  { id: 3, name: 'Супы' },
  { id: 4, name: 'Десерты' },
  { id: 5, name: 'Мясные блюда' },
  { id: 6, name: 'Фирменные блюда' },
];

export const Nav: React.FC = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = React.useState<number>(1);

  const handleClick = (id: number) => {
    setActiveIndex(id);
  };

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        {nav.map((n) => (
          <a
            className={cn(styles.navLink, {
              [styles.activeLink]: activeIndex === n.id,
              [styles.activeLinkBorder]: activeIndex === n.id,
            })}
            key={n.id}
            onClick={() => handleClick(n.id)}
          >
            {n.name}
          </a>
        ))}
      </nav>
    </div>
  );
};
