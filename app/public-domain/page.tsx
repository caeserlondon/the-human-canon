import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Public Domain Notice | The Human Canon",
  description:
    "Information about public domain texts and images used on The Human Canon.",
};

export default function PublicDomainPage() {
  return (
    <main className="hc-bg flex min-h-screen flex-col">
      <Header />

      <article className="mx-auto max-w-2xl flex-1 px-4 py-10">
        <h1 className="font-serif text-3xl font-bold">Public Domain Notice</h1>

        <div className="mt-8 space-y-6 text-muted leading-relaxed">
          <p>
            The Human Canon publishes public-domain books and uses public-domain or properly
            licensed images.
          </p>

          <h2 className="text-xl font-bold text-text">Books</h2>
          <p>
            Unless stated otherwise, the texts on this site are believed to be in the public domain
            because copyright has expired (commonly author&apos;s life + 70 years or less, depending
            on the country).
          </p>

          <h2 className="text-xl font-bold text-text">Images</h2>
          <p>Book covers, portraits, and illustrations are either:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Public domain, or</li>
            <li>Open-licensed with attribution where required, or</li>
            <li>Original designs created for this site.</li>
          </ul>
          <p>
            We do not use copyrighted retailer images (for example, copying current Amazon cover
            images) unless we have permission.
          </p>

          <h2 className="text-xl font-bold text-text">Country differences</h2>
          <p>
            Copyright rules vary by country. A work that is public domain in one place may not be
            public domain everywhere.
          </p>

          <h2 className="text-xl font-bold text-text">Takedown / concerns</h2>
          <p>
            If you believe any content on this site is not public domain or is improperly used,{" "}
            <Link href="/contact" className="text-gold hover:text-gold2 underline">
              contact us
            </Link>{" "}
            and we will review it promptly.
          </p>

          <h2 className="text-xl font-bold text-text">Disclaimer</h2>
          <p>This page is general information, not legal advice.</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
