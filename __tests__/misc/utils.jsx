import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const fillBookingForm = (booking) => {
  fireEvent.change(screen.getByLabelText('Date'), { target: { value: booking.when.split('T')[0] } });
  fireEvent.change(screen.getByLabelText('Time'), { target: { value: booking.when.split('T')[1] } });
  fireEvent.change(screen.getByLabelText('Number of awesome bowlers'), { target: { value: booking.people } });
  fireEvent.change(screen.getByLabelText('Number of lanes'), { target: { value: booking.lanes } });
}

const addShoes = (booking) => {
  booking.shoes.forEach((size, index) => {
    const addShoeButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(addShoeButton);
    fireEvent.change(screen.getByLabelText(`Shoe size / person ${index + 1}`), { target: { value: size } });
  });
}

// Resets the router path to '/'
const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

const utils = {
  fillBookingForm,
  addShoes,
  renderWithRouter
}

export default utils;