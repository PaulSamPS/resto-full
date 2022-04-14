import React from 'react';
import {useAppSelector} from '../../hooks/redux';
import {Card} from '../../components/Card/Card';
import {Modal} from '../../components/Modal/Modal';
import {CardInfo} from '../../components/CardInfo/CardInfo';
import {MainProps} from './Main.props';
import {Spinner} from '../../components/Spinner/Spinner';
import styles from './Main.module.scss';

export const Main: React.FC<MainProps> = ({product}): JSX.Element => {
  const {cart} = useAppSelector((state) => state.cartReducer);
  const {isLoading} = useAppSelector((state) => state.productReducer);
  const [modal, setModal] = React.useState<boolean>(false);

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{product.map((p) => p.categoryRu)[0]}</h1>
      <div className={styles.cardWrapper}>
        {product.map((p) => <Card setModal={setModal} count={cart} key={p.id} product={p}/>)}
      </div>
      <Modal setModal={setModal} modal={modal}>
        <CardInfo count={cart}/>
      </Modal>
    </div>
  );
};

