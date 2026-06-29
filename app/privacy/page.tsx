import Link from 'next/link';
import SectionPageLayout from '../../components/layout/SectionPageLayout';

const POLICY_SECTIONS = [
  {
    title: 'Information We Collect',
    points: [
      'Contact details you submit, such as name, email address, and message contents.',
      'Technical data generated when you browse the site, such as browser type, device information, IP address, and pages viewed.',
      'Operational form metadata used for abuse prevention and routing support requests.',
    ],
  },
  {
    title: 'How We Use Information',
    points: [
      'To respond to support requests, product questions, partnership inquiries, and other communications.',
      'To maintain and improve website performance, reliability, and security.',
      'To detect, prevent, and investigate fraud, abuse, spam, or other harmful activity.',
      'To comply with legal obligations and enforce our terms, policies, and safety requirements.',
    ],
  },
  {
    title: 'Cookies and Similar Technologies',
    points: [
      'We may use cookies, local storage, and similar technologies to keep essential site functionality working and to improve user experience.',
      'Some tools may collect usage and analytics information to help us understand site performance and visitor behavior.',
      'You can control many cookie preferences through your browser settings.',
    ],
  },
  {
    title: 'When We Share Information',
    points: [
      'We may share limited information with service providers that help us operate the website, including form processing, hosting, and security tooling.',
      'We may disclose information when required by law, legal process, or to protect rights, safety, and operations.',
      'We do not sell personal information for third-party advertising purposes.',
    ],
  },
  {
    title: 'Data Retention',
    points: [
      'We retain information only as long as needed for support, operational, legal, and security purposes.',
      'Retention periods vary based on data type, legal requirements, and risk controls.',
      'When data is no longer required, we delete or de-identify it according to reasonable operational practices.',
    ],
  },
  {
    title: 'Your Privacy Choices',
    points: [
      'You may request access, correction, or deletion of personal information, subject to legal and operational limitations.',
      'You may request details about the categories of information we process and why we process it.',
      'To make a privacy request, contact us using the details below and include enough information for verification.',
    ],
  },
  {
    title: 'Security',
    points: [
      'We use administrative, technical, and organizational safeguards intended to protect data from unauthorized access, loss, misuse, or alteration.',
      'No online system can guarantee absolute security, but we continuously improve our controls and monitoring practices.',
    ],
  },
  {
    title: 'Children Privacy',
    points: [
      'This website is not directed to children under 13, and we do not knowingly collect personal information from children under 13.',
      'If you believe a child has provided personal information, contact us and we will take appropriate steps to delete it when required.',
    ],
  },
  {
    title: 'Changes to This Policy',
    points: [
      'We may update this Privacy Policy to reflect legal, technical, or business changes.',
      'When we make material changes, we will update the effective date shown on this page.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <SectionPageLayout
      title="Privacy Policy"
      subtitle="How Redstone Haven collects, uses, protects, and manages personal information"
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Effective Date</p>
          <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.2em] text-slate-100">June 29, 2026</h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-300">
            This Privacy Policy explains how Redstone Haven collects, uses, discloses, and protects information when you visit our website,
            submit forms, or communicate with our team.
          </p>
        </section>

        {POLICY_SECTIONS.map((section) => (
          <section key={section.title} className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
            <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-slate-100">{section.title}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
              {section.points.map((point) => (
                <li key={point} className="rounded-lg border border-slate-800/80 bg-slate-900/65 px-4 py-3">
                  {point}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
          <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-slate-100">Contact Us About Privacy</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            For privacy questions or requests, use our contact page and select the most relevant request type.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center rounded-lg border border-slate-700/80 bg-slate-900/65 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-100 transition-colors hover:border-cyan-300/40 hover:text-white"
          >
            Use Our Contact Page
          </Link>
        </section>
      </div>
    </SectionPageLayout>
  );
}
