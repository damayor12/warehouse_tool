import * as testUtils from '../../test-utils';
import LineItem from './LineItem';
import * as utils from '../../utils';
import React from 'react';

test('Task Item should display a LineItem when view is picking', async () => {
  const { container } = testUtils.render(
    <LineItem
      total={3}
      name={'Client Gift Box'}
      itemIds={['669b0ba00b66a9c87bd54d79', '669b0ba00b66a9c87bd54d79']}
      pick_status={'completed'}
      setIsCloseClick={() => {}}
    />,
  );
  const itemRow = testUtils.screen.getByTestId('lineItem');

  expect(itemRow).toBeInTheDocument();
  expect(container.querySelector('select')).toBeInTheDocument();

  testUtils.fireEvent.click(testUtils.screen.getByTestId('lineitem-info'));

  expect(testUtils.screen.getByTestId('modal')).toBeInTheDocument();
});

test('Should make a request when select option is changed', async () => {
  const { container } = testUtils.render(
    <LineItem
      total={3}
      name={'Client Gift Box'}
      itemIds={['669b0ba00b66a9c87bd54d79', '669b0ba00b66a9c87bd54d79']}
      pick_status={'completed'}
      setIsCloseClick={() => {}}
    />,
  );
  const itemRow = testUtils.screen.getByTestId('lineItem');
  const updateListItemRequestMock = jest
    .spyOn(utils, 'updateListItemRequest')
    .mockImplementation(() => Promise.resolve());

  expect(itemRow).toBeInTheDocument();
  const selectElement = container.querySelector('select');
  testUtils.fireEvent.change(selectElement, {
    target: { value: 'incomplete' },
  });

  expect(updateListItemRequestMock).toHaveBeenCalled();
});

test('update lineItems api works as expected', async () => {
  try {
    const response = await utils.updateListItemRequest(
      ['669b0ba00b66a9c87bd54d77', '669b0ba00b66a9c87bd54d6d'],
      'completed',
    );

    expect(response).toBeTruthy();
    expect(response).toEqual({ msg: 'Successfully updated' });
  } catch (error) {
    // console.error(error);
  }
});
