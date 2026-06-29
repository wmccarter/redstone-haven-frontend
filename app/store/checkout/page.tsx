import { Suspense } from 'react';
import SectionPageLayout from '../../../components/layout/SectionPageLayout';
import StoreCheckoutClient from '../../../components/store/StoreCheckoutClient';

export default function StoreCheckoutPage() {
  return (
    <SectionPageLayout
      title="Checkout"
      subtitle="Transmit your order request to store operations"
    >
      <Suspense fallback={null}>
        <StoreCheckoutClient />
      </Suspense>
    </SectionPageLayout>
  );
}
