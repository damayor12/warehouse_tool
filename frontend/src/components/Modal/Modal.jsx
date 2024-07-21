import React from 'react';
import { useDispatch } from 'react-redux';
import { switchView } from '../../store/slices/taskSlice';
import Button from '../../ui/Button/Button';
import * as S from './styles';

const TasksCompleted = ({ setIsModalOpen, setIsCloseClick }) => {
  const dispatch = useDispatch();

  return (
    <S.Container>
      <div style={{ fontSize: 20 }}> Picking Completed!</div>
      <S.BtnContainer>
        <Button
          type="submit"
          data-testid="modal_submitBtn"
          variant="primary"
          onClick={() => {
            dispatch(switchView('packing'));
            setIsModalOpen(false);
          }}
        >
          Begin Packing
        </Button>

        <button
          onClick={() => {
            setIsModalOpen(false);
            setIsCloseClick(true);
          }}
        >
          close
        </button>
      </S.BtnContainer>
    </S.Container>
  );
};

const Info = ({ name, lineItems, setIsModalOpen }) => {
  return (
    <S.Container>
      <div style={{ fontSize: 20 }}>{name}</div>
      <S.BtnContainer>
        <ul>
          {lineItems.map((item, ind) => (
            <li key={ind} style={{ fontSize: 16 }}>
              *** {item}
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            setIsModalOpen(false);
          }}
          style={{ cursor: 'pointer' }}
        >
          close
        </button>
      </S.BtnContainer>
    </S.Container>
  );
};

function Modal({
  isModalOpen,
  setIsModalOpen,
  setIsCloseClick,
  mode,
  name,
  lineItems,
}) {
  if (!isModalOpen) return <></>;

  return (
    <>
      {isModalOpen && (
        <S.Wrapper
          onClick={(e) => {
            e.stopPropagation();
          }}
          data-testid="modal"
        >
          {mode === 'info' ? (
            <Info
              setIsModalOpen={setIsModalOpen}
              name={name}
              lineItems={lineItems}
            />
          ) : (
            <TasksCompleted
              setIsModalOpen={setIsModalOpen}
              setIsCloseClick={setIsCloseClick}
            />
          )}
        </S.Wrapper>
      )}
    </>
  );
}

export default Modal;
