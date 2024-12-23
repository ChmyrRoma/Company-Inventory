import { TextDecoder, TextEncoder } from 'util';

import '@testing-library/jest-dom';

// Explicitly cast TextDecoder and TextEncoder to avoid TypeScript errors
// @ts-expect-error: TypeScript does not recognize compatibility of TextDecoder with globalThis
globalThis.TextDecoder = TextDecoder as unknown as {
    new (label?: string, options?: { fatal?: boolean; ignoreBOM?: boolean }): TextDecoder;
};
globalThis.TextEncoder = TextEncoder as unknown as { new (): TextEncoder };
