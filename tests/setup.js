import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from '../mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});