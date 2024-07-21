import "@testing-library/jest-dom";
import { server } from "./mocks/server";

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

beforeAll((done) => {
  server.listen();
  done();
});

afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});

afterAll(() => {
  server.close();
});
