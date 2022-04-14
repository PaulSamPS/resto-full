import React from 'react';
import {useAppSelector} from '../../hooks/redux';
import {CardInfoProps} from './CardInfo.props';
import {CardInfoButtons} from './CardInfoButtons/CardInfoButtons';
import {Spinner} from '../Spinner/Spinner';
import styles from './CardInfo.module.scss';

export const CardInfo: React.FC<CardInfoProps> = ({count}): JSX.Element => {
  const {product, isLoading} = useAppSelector((state) => state.productInfoReducer);
  const itemCount = count.filter((item) => item.id === product.id);

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <>
      {product &&
        <div className={styles.wrapper}>
          <img className={styles.image} src={product.image} alt={product.name}/>
          <div className={styles.infoBlock}>
            <h2 className={styles.title}>{product.name}</h2>
            <p className={styles.desc}>{product.description}</p>
            <span className={styles.weight}>Вес: {product.weight} г</span>
            <CardInfoButtons product={product} itemCount={itemCount}/>
            <div className={styles.nutritionValue}>
              <div className={styles.name}>
                {product.nutritionalValue?.map((v) =>
                  <span key={v.name}>{v.name}</span>
                )}
              </div>
              <div className={styles.value}>
                {product.nutritionalValue?.map((v) =>
                  <span key={v.value}>{v.value}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

