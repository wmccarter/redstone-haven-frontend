import SectionPageLayout from '../../../../components/layout/SectionPageLayout';
import StoreOrdersAdminClient from '../../../../components/store/StoreOrdersAdminClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE_NAME, verifyAdminSessionToken } from '../../../../lib/adminAuth';

export default async function StoreAdminOrdersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value ?? '';
  if (!verifyAdminSessionToken(token)) {
    redirect('/store/admin/login');
  }

  return (
    <SectionPageLayout
      title="Store Admin Orders"
      subtitle="Search paid Stripe checkouts captured by webhook intake"
    >
      <StoreOrdersAdminClient />
    </SectionPageLayout>
  );
}
