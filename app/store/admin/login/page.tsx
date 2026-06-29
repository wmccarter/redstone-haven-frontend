import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SectionPageLayout from '../../../../components/layout/SectionPageLayout';
import StoreAdminLoginClient from '../../../../components/store/StoreAdminLoginClient';
import { ADMIN_SESSION_COOKIE_NAME, verifyAdminSessionToken } from '../../../../lib/adminAuth';

export default async function StoreAdminLoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value ?? '';
  if (verifyAdminSessionToken(token)) {
    redirect('/store/admin/orders');
  }

  return (
    <SectionPageLayout
      title="Store Admin Access"
      subtitle="Authenticate to view and manage order fulfillment"
    >
      <StoreAdminLoginClient />
    </SectionPageLayout>
  );
}
