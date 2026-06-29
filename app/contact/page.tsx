import Link from 'next/link';
import ContactFormCard from '../../components/contact/ContactFormCard';
import SectionPageLayout from '../../components/layout/SectionPageLayout';

export default function ContactPage() {
  return (
    <SectionPageLayout
      title="We're Here to Help"
      subtitle="Professional support, product questions, order help, and partnership outreach"
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.85fr)]">
        <ContactFormCard />

        <div className="space-y-6">
          <section className="contact-simplified-card">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Contact Details</p>
            <h2 className="mt-2 text-xl font-bold uppercase tracking-[0.18em] text-slate-100">Reach the Team Directly</h2>

            <div className="mt-5 space-y-5 text-sm text-slate-300">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Response Time</p>
                <p className="mt-2 leading-relaxed">We aim to reply within 24 business hours.</p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Direct Contact</p>
                <p className="mt-2 leading-relaxed">
                  To reduce spam and keep responses organized, use the secure contact form on this page for all support, product, and partnership requests.
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Mailing Address</p>
                <p className="mt-2 leading-relaxed">
                  Redstone Haven LLC
                  <br />
                  Mailing correspondence for returns, vendor documents, and partnership materials is coordinated through support.
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">FAQ</p>
                <p className="mt-2 leading-relaxed">Have a quick question? Check the FAQ before sending a message.</p>
                <Link href="/faq" className="contact-open-faq-pulse mt-3 inline-flex items-center rounded-lg border border-amber-400/45 bg-amber-500/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-100 transition-colors hover:border-amber-300 hover:text-white">
                  Open FAQ
                </Link>
              </div>
            </div>
          </section>

          <section className="contact-simplified-card">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Support Guidance</p>
            <h3 className="mt-2 text-lg font-bold uppercase tracking-[0.18em] text-slate-100">What to Include</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
              <li>Order questions: include order number, product name, and the issue you need resolved.</li>
              <li>Product inquiries: include the use case, environment, and what gear you are comparing.</li>
              <li>Partnership or press: include your organization, audience, and what kind of collaboration you want to discuss.</li>
            </ul>
          </section>
        </div>
      </div>
    </SectionPageLayout>
  );
}
