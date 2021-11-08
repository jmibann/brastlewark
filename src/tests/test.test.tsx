import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

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

  const inputs = await screen.findAllByText(/Select a profession/i);

  expect(inputs.length).toBe(1);
});

test('Renders Page: Types an age and search by age (loading search)', async () => {
  const AGE = '306';

  render(<App />);

  const ageInput = await screen.findByPlaceholderText(/Search by age/i);
  userEvent.type(ageInput, AGE);
  fireEvent.keyDown(ageInput, { key: 'Enter', code: 'Enter', charCode: 13 })

  const tableSkeleton = screen.getAllByLabelText(/loading table/i);
  expect(tableSkeleton.length).toBe(1);
});

test('Renders Page: Types an age and search by age (shows search result)', async () => {
  const AGE = '306';

  render(<App />);

  const ageInput = await screen.findByPlaceholderText(/Search by age/i);
  userEvent.type(ageInput, AGE);
  fireEvent.keyDown(ageInput, { key: 'Enter', code: 'Enter', charCode: 13 })

  const tableRows = await screen.findAllByRole('row');
  expect(tableRows.length).toBeGreaterThan(10);
});
