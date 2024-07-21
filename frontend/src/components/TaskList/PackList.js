import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from '../Task/TaskItem';
import * as S from './styles';
import { switchView, storeOrders } from '../../store/slices/taskSlice';
import Pagination from '../Pagination/Pagination';
import { memo } from 'react';
import { getPackingOrdersItems } from '../../utils';

function PackList() {
  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const orders = useSelector((state) => state.task.orders)?.orders;
  const currentView = useSelector((state) => state.task.view);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(switchView('packing'));

    (async () => {
      try {
        const response = await getPackingOrdersItems(currentPage);
        if (response) {
          setTotalPages(response.totalPages);
          dispatch(storeOrders(response));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentView, dispatch, currentPage]);

  return (
    <S.List data-testid="packlist-container">
      {orders && orders.length > 0 ? (
        <>
          {orders.map((orderItem) => (
            <TaskItem key={orderItem._id} view={'packing'} item={orderItem} />
          ))}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        </>
      ) : (
        <S.NoTask>No Tasks yet</S.NoTask>
      )}
    </S.List>
  );
}

export default memo(PackList);
