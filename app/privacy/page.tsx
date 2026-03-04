import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <main className="hc-bg flex min-h-screen flex-col">
      <Header />

      <article className="mx-auto max-w-2xl flex-1 px-4 py-10">
        <h1 className="font-serif text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted2">Last updated: 2026</p>

        <div className="mt-8 space-y-6 text-muted leading-relaxed">
          <p>
            The Human Canon is a personal project created by Caeser Ibrahim. This website is
            designed primarily as a technical demonstration of web development capabilities.
          </p>

          <h2 className="text-xl font-bold text-text">Information We Collect</h2>
          <p>
            The Human Canon does not actively collect personal information from visitors.
          </p>
          <p>
            However, certain basic data may be collected automatically by standard web technologies,
            including:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>browser type</li>
            <li>device type</li>
            <li>pages visited</li>
            <li>approximate geographic region</li>
          </ul>
          <p>
            This information may be collected through analytics tools or hosting providers in order
            to understand how the website is used and to improve performance.
          </p>

          <h2 className="text-xl font-bold text-text">Cookies</h2>
          <p>
            This website may use cookies to support basic functionality and analytics. Cookies are
            small text files stored on your device that help websites function properly.
          </p>
          <p>
            You can disable cookies through your browser settings if you prefer not to allow them.
          </p>

          <h2 className="text-xl font-bold text-text">Third-Party Services</h2>
          <p>This website may use third-party services such as:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>analytics providers</li>
            <li>hosting platforms</li>
            <li>advertising networks</li>
          </ul>
          <p>
            These services may collect anonymous usage information according to their own privacy
            policies.
          </p>

          <h2 className="text-xl font-bold text-text">Purpose of the Website</h2>
          <p>
            The Human Canon is a portfolio project intended to demonstrate web development and
            software engineering capabilities. It is not intended to collect or process personal data
            beyond standard web analytics.
          </p>

          <h2 className="text-xl font-bold text-text">Contact</h2>
          <p>
            If you have any questions regarding this privacy policy, you can contact:{" "}
            <Link href="mailto:caeserlondon@gmail.com" className="text-gold hover:text-gold2 underline">
              caeserlondon@gmail.com
            </Link>
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
