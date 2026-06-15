import Sidebar from '../../components/Sidebar';

export default function TransmissionsPage() {
  return (
    <div className="flex min-h-screen bg-[#050505] text-neutral-300 antialiased">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between pb-6 border-b border-[#1F1F1F] mb-8">
          <div>
            <h1 className="text-xl font-mono tracking-wider font-bold text-neutral-200 uppercase">Transmission Archive</h1>
            <p className="text-xs text-neutral-500 font-sans mt-1">Decoupled data streams fetched from WordPress GraphQL endpoint</p>
          </div>
        </header>
        <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded p-6 text-center text-xs font-mono text-neutral-500">
          [ BROADCAST LOGS: EMPTY ]
          <p className="mt-2 text-neutral-600">Awaiting automated content ingest loops from your headless administration vault.</p>
        </div>
      </main>
    </div>
  );
}