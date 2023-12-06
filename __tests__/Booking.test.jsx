import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import Booking from '../src/views/Booking';
import Confirmation from '../src/views/Confirmation';
import utils from './misc/utils';
import { API_URL, booking, bookingResponse } from '../mocks/handlers';
import { BOOK_BUTTON_TEXT, ERROR_MESSAGE, X_API_KEY } from './misc/constants';

describe('Booking component', () => {
  it('has a clickable button to make a reservation', () => {
    utils.renderWithRouter(
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    );

    expect(screen.getByText(BOOK_BUTTON_TEXT)).toBeVisible();
    expect(screen.getByText(BOOK_BUTTON_TEXT)).not.toBeDisabled();
  });

  it('gets back a booking number and a total price when reservation is made', async () => {
    utils.renderWithRouter(
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    );

    utils.fillBookingForm(booking)
    utils.addShoes(booking)

    fireEvent.click(screen.getByRole('button', { name: BOOK_BUTTON_TEXT }));
    expect(await screen.findByText('See you soon!')).toBeVisible()

    const bookingNumberInput = screen.getByLabelText('Booking number');
    expect(bookingNumberInput.value).toBe(bookingResponse.id);

    const totalPriceElement = await screen.findByText(`${bookingResponse.price} sek`);
    expect(totalPriceElement).toBeVisible();
  });

  it('calculates the total price correctly using known formula', async () => {
    utils.renderWithRouter(
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    );

    utils.fillBookingForm(booking)
    utils.addShoes(booking)

    fireEvent.click(screen.getByRole('button', { name: BOOK_BUTTON_TEXT }));
    expect(await screen.findByText('See you soon!')).toBeVisible()

    const expectedTotalPrice = 120 * Number(booking.people) + 100 * Number(booking.lanes);

    const totalPriceElement = await screen.findByText(`${expectedTotalPrice} sek`);
    expect(totalPriceElement).toBeVisible();
  });

  it('sends a relevant POST request with booking details when making a reservation', () => {
    utils.renderWithRouter(
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    );

    const fetch = vi.spyOn(window, 'fetch')

    utils.fillBookingForm(booking)
    utils.addShoes(booking)

    fireEvent.click(screen.getByRole('button', { name: BOOK_BUTTON_TEXT }));

    expect(fetch).toHaveBeenCalledWith(
      API_URL,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'x-api-key': X_API_KEY
        },
        body: JSON.stringify(booking)
      })
    );
  })

  it('shows an error message if not all fields have been filled in', () => {
    utils.renderWithRouter(
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    );

    fireEvent.click(screen.getByRole('button', { name: BOOK_BUTTON_TEXT }));
    expect(screen.getByText(ERROR_MESSAGE)).toBeVisible();
  })

  it("it shows an error message if the number of shoes doesn't match the number of players", () => {
    utils.renderWithRouter(
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    );

    utils.fillBookingForm(booking)
    fireEvent.click(screen.getByRole('button', { name: BOOK_BUTTON_TEXT }));
    expect(screen.getByText(ERROR_MESSAGE)).toBeVisible();
  })
});