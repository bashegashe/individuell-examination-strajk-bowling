import { render, screen, fireEvent } from '@testing-library/react';
import BookingInfo from '../src/components/BookingInfo/BookingInfo';
import { booking } from '../mocks/handlers';

describe('Booking form', () => {
  it('renders input fields for date, time, number of players, and number of lanes', () => {
    const mockUpdate = vi.fn();
    render(<BookingInfo updateBookingDetails={mockUpdate} />);

    expect(screen.getByLabelText('Date')).toBeVisible();
    expect(screen.getByLabelText('Time')).toBeVisible();
    expect(screen.getByLabelText('Number of awesome bowlers')).toBeVisible();
    expect(screen.getByLabelText('Number of lanes')).toBeVisible();
  });

  it('is possible to insert values into the input fields for date, time, number of players, and number of lanes', () => {
    const mockUpdate = vi.fn();
    render(<BookingInfo updateBookingDetails={mockUpdate} />);

    const inputs = [
      { label: 'Date', value: booking.when.split('T')[0] },
      { label: 'Time', value: booking.when.split('T')[1] },
      { label: 'Number of awesome bowlers', value: booking.people },
      { label: 'Number of lanes', value: booking.lanes }
    ];

    inputs.forEach(input => {
      const field = screen.getByLabelText(input.label);
      expect(field).not.toBeDisabled();
      fireEvent.change(field, { target: { value: input.value } });
      expect(field.value).toBe(input.value);
      expect(mockUpdate).toHaveBeenCalled();
    });
  });
});

