import { useDispatch } from 'react-redux';
import { updateListItem } from '../../store/slices/taskSlice';
import React from 'react';

import * as S from './styles';
import { Select } from '../../ui/Input/Input';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { mapping } from './mapping';
import { updateListItemRequest } from '../../utils';

const LineItem = ({ total, name, itemIds, pick_status, setIsCloseClick }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectChange = async (ids, status) => {
    try {
      const response = await updateListItemRequest(ids, status);

      if (response) {
        setIsCloseClick(false);
        dispatch(
          updateListItem({
            ids,
            status: pick_status === 'completed' ? 'incomplete' : 'completed',
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.Wrapper data-testid="lineItem">
      <S.Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '1rem',
        }}
      >
        <p>
          {name} (x {total}){' '}
          <span
            data-testid="lineitem-info"
            style={{ marginLeft: '1rem', cursor: 'pointer' }}
            onClick={() => setIsModalOpen(true)}
          >
            &#9432;
          </span>
        </p>
      </S.Box>
      <S.ActionBtnContainer>
        <Select
          id="status"
          variant="styled"
          // eslint-disable-next-line no-unused-vars
          onChange={(_e) => handleSelectChange(itemIds, pick_status)}
          value={pick_status}
        >
          <option value="incomplete">Incomplete</option>
          <option value="completed">Complete</option>
        </Select>
      </S.ActionBtnContainer>

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        mode={'info'}
        name={name}
        lineItems={mapping[name]}
      />
    </S.Wrapper>
  );
};

export default LineItem;
