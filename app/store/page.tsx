import SectionPageLayout from '../../components/layout/SectionPageLayout';
import StoreCatalogClient from '../../components/store/StoreCatalogClient';

export default function StorePage() {
  return (
    <SectionPageLayout
      title="Redstone Haven Store"
      subtitle="On-domain commerce hub for infrastructure systems and mission gear"
    >
      <StoreCatalogClient />
    </SectionPageLayout>
  );
}
