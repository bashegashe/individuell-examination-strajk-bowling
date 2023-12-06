import { screen, fireEvent } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import Booking from '../src/views/Booking';
import Confirmation from '../src/views/Confirmation';
import utils from './misc/utils';
import { BOOK_BUTTON_TEXT } from './misc/constants';

describe('Navigation', () => {
  it('shows the navigation menu when the icon is clicked', () => {
    utils.renderWithRouter(
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    );

    expect(screen.getByRole('navigation')).not.toHaveClass('show-menu');

    const navIcon = screen.getByAltText('Navigation icon');
    fireEvent.click(navIcon);

    expect(screen.getByRole('navigation')).toHaveClass('show-menu');
  });

  it('hides the navigation menu when a link is clicked', () => {
    utils.renderWithRouter(
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    );

    const navIcon = screen.getByAltText('Navigation icon');
    fireEvent.click(navIcon);
    expect(screen.getByRole('navigation')).toHaveClass('show-menu');
    fireEvent.click(screen.getByRole('link', { name: 'Confirmation' }));
    expect(screen.getByRole('navigation')).not.toHaveClass('show-menu');
  });

  it('navigates to the confirmation page when the confirmation link is clicked', () => {
    utils.renderWithRouter(
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    );

    const navIcon = screen.getByAltText('Navigation icon');
    fireEvent.click(navIcon);
    fireEvent.click(screen.getByRole('link', { name: 'Confirmation' }));

    expect(screen.getByText('See you soon!')).toBeInTheDocument();
  })

  it('navigates to the booking page when the booking link is clicked', () => {
    utils.renderWithRouter(
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    );

    const navIcon = screen.getByAltText('Navigation icon');
    fireEvent.click(navIcon);
    fireEvent.click(screen.getByRole('link', { name: 'Confirmation' }));
    fireEvent.click(screen.getByRole('link', { name: 'Booking' }));

    expect(screen.getByText(BOOK_BUTTON_TEXT)).toBeInTheDocument();
  })
});