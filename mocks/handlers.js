import { http, HttpResponse } from "msw";

export const API_URL = 'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com'

export const booking = {
  "when": "2023-12-28T15:30",
  "lanes": "1",
  "people": "4",
  "shoes": ["40", "44", "42", "43"],
}

export const bookingResponse = {
  ...booking,
  "price": 580,
  "id": "STR1828KYFZ",
  "active": true
}

export const handlers = [
  http.post(API_URL, () => HttpResponse.json(bookingResponse))
]