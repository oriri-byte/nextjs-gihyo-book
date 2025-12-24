import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

/**
 * 各テストの終了後に、レンダリングされたDOMをアンマウント（掃除）します。
 * これにより、テスト間でのDOMの状態の干渉を防ぎます。
 */
afterEach(() => {
  cleanup();
});
