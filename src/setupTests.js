import { TextDecoder, TextEncoder } from 'util';
import '@testing-library/jest-dom';
// Explicitly cast TextDecoder and TextEncoder to avoid TypeScript errors
// @ts-expect-error: TypeScript does not recognize compatibility of TextDecoder with globalThis
globalThis.TextDecoder = TextDecoder;
globalThis.TextEncoder = TextEncoder;
