import { useDispatch } from 'react-redux';
import { updateOrder } from '../../store/slices/taskSlice';
import * as S from './styles';
import { Select } from '../../ui/Input/Input';
import { updateOrderRequest } from '../../utils';
import { format } from 'date-fns';
import React from 'react';

const OrderItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleSelect = async (itemObj) => {
    try {
      const response = await updateOrderRequest(itemObj);

      if (response) {
        dispatch(
          updateOrder({
            id: item._id,
            status:
              item.pack_status === 'completed' ? 'incomplete' : 'completed',
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <S.Wrapper data-testid="orderItem">
        <S.Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            Order ID {item._id} -{' '}
            <span
              style={{
                fontSize: '12px',
                fontWeight: 'normal',
              }}
            >
              x {item.lineItems.length} lineItems
            </span>
          </p>
          <div>{format(new Date(item.order_date), 'p, MM/dd/yyyy')}</div>
        </S.Box>

        <S.ActionBtnContainer>
          <Select
            id="status"
            variant="styled"
            onChange={() => handleSelect(item)}
            value={item.pack_status}
          >
            <option value="incomplete">Incomplete</option>
            <option value="completed">Complete</option>
          </Select>
        </S.ActionBtnContainer>
      </S.Wrapper>
      <div style={{ fontWeight: 'bold', marginBottom: 16, fontSize: 12 }}>
        Ships to: {item.shipping_address}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        {item.lineItems.map((lineItem) => (
          <p
            data-testid="order-products"
            style={{ marginBottom: '1rem', fontSize: '12px' }}
            key={lineItem.order_product_id}
          >
            *** {lineItem.name}
          </p>
        ))}
      </div>
    </>
  );
};

export default OrderItem;
