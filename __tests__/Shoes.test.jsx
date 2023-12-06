import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Booking from '../src/views/Booking';
import { BrowserRouter } from 'react-router-dom';

describe('Shoes component', () => {
  it('allows adding a new shoe size input when the add shoe button is clicked', () => {
    render(
      <BrowserRouter>
        <Booking />
      </BrowserRouter>
    );

    const addShoeButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(addShoeButton);

    expect(screen.getByLabelText('Shoe size / person 1')).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Shoe size / person 1' })).toBeVisible();
  });

  it('allows removing a shoe size input when the remove shoe button is clicked', () => {
    render(
      <BrowserRouter>
        <Booking />
      </BrowserRouter>
    );

    const addShoeButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(addShoeButton);

    const removeShoeButton = screen.getByRole('button', { name: '-' });
    fireEvent.click(removeShoeButton);

    expect(screen.queryByLabelText('Shoe size / person 1')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'Shoe size / person 1' })).not.toBeInTheDocument();
  });
});
