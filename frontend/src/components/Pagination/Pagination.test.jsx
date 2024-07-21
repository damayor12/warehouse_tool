import Pagination from './Pagination';
import React from 'react';

import * as testUtils from '../../test-utils';

test('Task Item should display a LineItem when view is picking', async () => {
  const setPageMock = jest.fn();

  testUtils.render(
    <Pagination totalPages={2} currentPage={2} setPage={setPageMock} />,
  );
  const pagination = testUtils.screen.getByTestId('pagination');

  expect(pagination).toBeInTheDocument();

  const pageItemBtns = await testUtils
    .within(pagination)
    .findAllByTestId('pagination-page');

  expect(pageItemBtns.length).toBeGreaterThan(1);

  testUtils.fireEvent.click(pageItemBtns[1]);

  expect(setPageMock).toHaveBeenCalled();
});
