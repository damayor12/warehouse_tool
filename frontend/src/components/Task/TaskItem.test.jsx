import { mocks } from '../../mocks/mockResponse';
import * as testUtils from '../../test-utils';
import TaskItem from './TaskItem';
import React from 'react';

import '@testing-library/jest-dom';

test('Task Item should display a LineItem when view is picking', async () => {
  const mockSetIsCloseClick = jest.fn();
  testUtils.render(
    <TaskItem
      view={'picking'}
      item={['Birthday Box', mocks.lineItems]}
      setIsCloseClick={mockSetIsCloseClick}
    />,
  );
  const itemRow = testUtils.screen.getByTestId('lineItem');

  expect(itemRow).toBeInTheDocument();
  expect(await testUtils.screen.queryAllByTestId('lineItem').length).toEqual(1);
  expect(
    testUtils.screen.queryByText(/Birthday Box \(x 2\)/i),
  ).toBeInTheDocument();
});

test('Task Item should display a Order when view is packing', async () => {
  const mockSetIsCloseClick = jest.fn();
  testUtils.render(
    <TaskItem
      view={'packing'}
      item={mocks.paginatedOrders.orders[0]}
      setIsCloseClick={mockSetIsCloseClick}
    />,
  );
  const itemRow = testUtils.screen.getByTestId('orderItem');

  expect(itemRow).toBeInTheDocument();
  expect(await testUtils.screen.queryAllByTestId('orderItem').length).toEqual(
    1,
  );
  expect(
    testUtils.screen.queryByText(/Order ID 669b0ba00b66a9c87bd54d76/i),
  ).toBeInTheDocument();
});
