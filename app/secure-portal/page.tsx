import Sidebar from '../../components/Sidebar';

export default function SecurePortalPage() {
  return (
    <div className="flex min-h-screen bg-[#050505] text-neutral-300 antialiased">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between pb-6 border-b border-[#1F1F1F] mb-8">
          <div>
            <h1 className="text-xl font-mono tracking-wider font-bold text-neutral-200 uppercase">Secure Entry Gateway</h1>
            <p className="text-xs text-neutral-500 font-sans mt-1">Restricted biometric and cryptographic authentication vault</p>
          </div>
        </header>
        <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded p-6 max-w-md mx-auto text-center">
          <div className="w-12 h-12 border border-[#E67E22]/30 bg-[#E67E22]/10 rounded flex items-center justify-center mx-auto mb-4 text-[#E67E22] font-mono text-sm font-bold animate-pulse">
            !
          </div>
          <h2 className="text-xs font-mono text-neutral-300 uppercase tracking-widest mb-2">Access Restrained</h2>
          <p className="text-xs font-sans text-neutral-500 leading-relaxed">
            Administrative credentials or passkey verification sequences required for localized file decryption.
          </p>
        </div>
      </main>
    </div>
  );
}