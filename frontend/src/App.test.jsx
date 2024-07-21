import React from 'react';
import '@testing-library/jest-dom';
import App from './App';
import * as testUtils from './test-utils';
import * as utils from './utils';

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test('should render App successfully', async () => {
    testUtils.render(<App />);
  });

  test('should render Picking on Mount', async () => {
    await testUtils.act(async () => testUtils.render(<App />));

    const pickContainer =
      await testUtils.screen.findByTestId('picklist-container');

    const lineItems = await testUtils
      .within(pickContainer)
      .findAllByTestId('lineItem');

    expect(pickContainer).toBeInTheDocument();
    expect(
      testUtils.screen.queryByText(/Pending picking tasks/i),
    ).toBeInTheDocument();
    expect(lineItems.length).toBe(2);
  });
  test('should make a GET /read/picking-list request on Mount', async () => {
    const getPickingListItemsMock = jest
      .spyOn(utils, 'getPickingListItems')
      .mockImplementation(() => Promise.resolve());

    await testUtils.act(async () => testUtils.render(<App />));

    expect(getPickingListItemsMock).toHaveBeenCalled();
  });

  test('should render Orders page on changing view', async () => {
    await testUtils.act(async () => testUtils.render(<App />));

    await testUtils.screen.findByTestId('picklist-container');

    const selectElement = testUtils.screen.getByTestId('select-view');

    testUtils.fireEvent.change(selectElement, { target: { value: 'packing' } });

    testUtils.waitFor(() => testUtils.screen.findByTestId('orderItem'));

    expect(
      testUtils.screen.queryByTestId('packlist-container'),
    ).toBeInTheDocument();

    expect(
      (await testUtils.screen.findAllByTestId('orderItem')).length,
    ).toBeGreaterThan(1);

    expect(testUtils.screen.queryAllByText(/Order ID/i).length).toBeGreaterThan(
      1,
    );

    const pagination = await testUtils.screen.findByTestId('pagination');

    expect(pagination).toBeInTheDocument();

    const pageItemBtns = (
      await testUtils.within(pagination).findAllByTestId('pagination-page')
    ).length;

    expect(pageItemBtns).toBeGreaterThan(1);

    expect(testUtils.within(pagination).queryByText(/1/i)).toBeInTheDocument();
  });

  test('should make a GET /read/packing-list request on Mount', async () => {
    const getPackingOrdersItemsMock = jest
      .spyOn(utils, 'getPackingOrdersItems')
      .mockImplementation(() => Promise.resolve());

    await testUtils.act(async () => testUtils.render(<App />));

    expect(getPackingOrdersItemsMock).toHaveBeenCalled();
  });
});
