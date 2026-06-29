import SectionPageLayout from '../../../components/layout/SectionPageLayout';
import StoreCartClient from '../../../components/store/StoreCartClient';

export default function StoreCartPage() {
  return (
    <SectionPageLayout
      title="Cart"
      subtitle="Review and adjust your mission order before checkout"
    >
      <StoreCartClient />
    </SectionPageLayout>
  );
}
