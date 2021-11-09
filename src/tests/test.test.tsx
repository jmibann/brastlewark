import React from 'react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { URL } from '../services/index';
import { mockedValues } from './mockedValues';

import App from '../App';

const server = setupServer(
  rest.get(
    URL,
    async (req, res, ctx) => res(ctx.json(mockedValues))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Renders Page: Loading State - Filter Spinner', () => {
  render(<App />);

  const spinner = screen.getAllByLabelText(/loading filters/i);
  expect(spinner.length).toBe(1);
});

test('Renders Page: Loading State - Table Skeleton', () => {
  render(<App />);

  const tableSkeleton = screen.getAllByLabelText(/loading table/i);
  expect(tableSkeleton.length).toBe(1);
});

test('Renders Page: Checks 2 inputs to set filter parameters', async () => {
  render(<App />);

  const inputs = await screen.findAllByPlaceholderText(/Search by/i);

  expect(inputs.length).toBe(2);
});

test('Renders Page: Checks 1 select input to set filter parameter', async () => {
  render(<App />);

  const selectInput = await screen.findByTestId('select-option');

  expect(selectInput).toBeInTheDocument();
});

test('Renders Page: Selects All professions and displays Test User', async () => {
  server.use(
    rest.get(
      URL,
      async (req, res, ctx) => res(ctx.json(mockedValues)),
    ))

  render(<App />);

  const selectInput = await screen.findByTestId('select-option');

  fireEvent.change(selectInput, { target: { value: 'all' } })

  const tableSkeleton = screen.getAllByLabelText(/loading table/i);
  expect(tableSkeleton.length).toBe(1);

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading table/i));

  const testUser = screen.getByText(/Usuario de Prueba/i);
  const tableRows = screen.getAllByRole('row');

  expect(testUser).toBeInTheDocument();
  expect(tableRows.length).toBeGreaterThan(10);
});

test('Renders Page: Types an age and searches by age (loading search)', async () => {
  const AGE = '306';

  render(<App />);

  const ageInput = await screen.findByPlaceholderText(/Search by age/i);
  userEvent.type(ageInput, AGE);
  fireEvent.keyDown(ageInput, { key: 'Enter', code: 'Enter', charCode: 13 })

  const tableSkeleton = screen.getAllByLabelText(/loading table/i);
  expect(tableSkeleton.length).toBe(1);
});

test('Renders Page: Types an age and searches by age (shows search result)', async () => {
  const AGE = '306';

  server.use(
    rest.get(
      URL,
      async (req, res, ctx) => res(ctx.json(mockedValues)),
    ))

  render(<App />);

  const ageInput = await screen.findByPlaceholderText(/Search by age/i);
  userEvent.type(ageInput, AGE);
  fireEvent.keyDown(ageInput, { key: 'Enter', code: 'Enter', charCode: 13 });

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading table/i));


  const tableRows = screen.getAllByRole('row');

  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  expect(tableRows.length).toBeGreaterThan(1);
});

test('Renders Page: Types an age and searches by age (no result)', async () => {
  const AGE = '55';

  server.use(
    rest.get(
      URL,
      async (req, res, ctx) => res(ctx.json(mockedValues)),
    ))

  render(<App />);

  const ageInput = await screen.findByPlaceholderText(/Search by age/i);
  userEvent.type(ageInput, AGE);
  fireEvent.keyDown(ageInput, { key: 'Enter', code: 'Enter', charCode: 13 });

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading table/i));

  const notItemFound = screen.getByText(/No items found/i);
  const tableRows = screen.getAllByRole('row');

  expect(notItemFound).toBeInTheDocument();
  expect(tableRows.length).toBe(2);
});