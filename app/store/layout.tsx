import type { ReactNode } from 'react';
import StoreProvider from '../../components/store/StoreProvider';

export default function StoreLayout({ children }: { children: ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
