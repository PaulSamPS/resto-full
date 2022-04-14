import React from 'react';
import {DeliveryBlock} from '../../components/DeliveryBlock/DeliveryBlock';
import {MyOrdersProps} from './MyOrders.props';
import {Spinner} from '../../components/Spinner/Spinner';
import {priceRu} from '../../helpers/priceRu';
import {getOrderSuccess} from '../../redux/actions/ActionCreator';
import {useAppDispatch} from '../../hooks/redux';
import styles from './MyOrders.module.scss';
import {Button} from '../../components/Button/Button';
import {ReactComponent as ArrowIcon} from '../../helpers/icons/arrow.svg';
import {useNavigate} from 'react-router-dom';

export const MyOrders: React.FC<MyOrdersProps> = ({order, loading}): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateToMainPage = () => {
    navigate('/');
  };

  React.useEffect(() => {
    dispatch(getOrderSuccess());
  }, []);

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.arrBtn} onClick={navigateToMainPage}>
        <Button appearance={'count'}><ArrowIcon/></Button>
        <span>На главную</span>
      </div>
      <h1 className={styles.title}>Мои заказы</h1>
      {order.map((o) =>
        <DeliveryBlock key={o.id}>
          <div className={styles.infoBlock}>
            <div className={styles.info}>
              <label>Имя: </label>
              <span>{o.delivery.name}</span>
            </div>
            <div className={styles.info}>
              <label>Номер телефона: </label>
              <span>{o.delivery.phone}</span>
            </div>
            <div className={styles.info}>
              <label>Тип доставки: </label>
              <span>{o.deliveryType}</span>
            </div>
            <div className={styles.info}>
              <label>Оплата: </label>
              <span>{o.payment}</span>
            </div>
            {o.delivery.street &&
              <div className={styles.info}>
                <label>Улица: </label>
                <span>{o.delivery.street}</span>
              </div>
            }
            {o.delivery.house &&
              <div className={styles.info}>
                <label>Номер дома: </label>
                <span>{o.delivery.house}</span>
              </div>
            }
            {o.delivery.office &&
              <div className={styles.info}>
                <label>Номер Квартиры/Офиса: </label>
                <span>{o.delivery.office}</span>
              </div>
            }
            {o.delivery.entrance &&
              <div className={styles.info}>
                <label>Подъезд №: </label>
                <span>{o.delivery.entrance}</span>
              </div>
            }
            {o.delivery.level &&
              <div className={styles.info}>
                <label>Этаж: </label>
                <span>{o.delivery.level}</span>
              </div>
            }
            {o.delivery.comment &&
              <div className={styles.info}>
                <label>Комментарий: </label>
                <span>{o.delivery.comment}</span>
              </div>
            }
          </div>
          {o.products.map((p) =>
            <div key={p.id} className={styles.card}>
              <img src={p.image} alt={p.name}/>
              <h2>{p.name}</h2>
              <div className={styles.count}>{p.qty}</div>
            </div>
          )}
          <div className={styles.total}>
            <div className={styles.countBlock}>
              <span>Колличество: </span>
              <span className={styles.totalCount}>{o.totalCount}</span>
            </div>
            <div className={styles.totalSum}>
              <span>Итого: </span>
              <span className={styles.totalPrice}>{priceRu(o.totalPrice)}</span>
            </div>
          </div>
        </DeliveryBlock>
      )}
    </div>
  );
};
