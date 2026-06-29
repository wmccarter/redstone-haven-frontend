import SectionPageLayout from '../../components/layout/SectionPageLayout';

export default function TransmissionsPage() {
  return (
    <SectionPageLayout
      title="Transmission Archive"
      subtitle="Decoupled data streams fetched from WordPress GraphQL endpoint"
    >
      <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded p-6 text-center text-xs font-mono text-neutral-500">
        [ BROADCAST LOGS: EMPTY ]
        <p className="mt-2 text-neutral-600">Awaiting automated content ingest loops from your headless administration vault.</p>
      </div>
    </SectionPageLayout>
  );
}