import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  return (
    <main className="hc-bg flex min-h-screen flex-col">
      <Header />

      <section className="mx-auto max-w-2xl flex-1 px-4 py-10">
        <h1 className="font-serif text-3xl font-bold">Contact</h1>

        <div className="mt-8 space-y-6 text-muted leading-relaxed">
          <p>
            The Human Canon is an independent project created by Caeser Ibrahim.
          </p>
          <p>
            The project explores how modern technology can be used to present the most important
            intellectual works in human history in a clear and accessible format.
          </p>

          <h2 className="text-xl font-bold text-text">Creator</h2>
          <p className="font-semibold text-text">Caeser Ibrahim</p>
          <p className="text-sm">Software Engineer</p>
          <ul className="space-y-1 text-sm">
            <li>
              GitHub:{" "}
              <Link
                href="https://github.com/caeserlondon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold2 underline"
              >
                https://github.com/caeserlondon
              </Link>
            </li>
            <li>
              LinkedIn:{" "}
              <Link
                href="https://www.linkedin.com/in/caeser-ibrahim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold2 underline"
              >
                https://www.linkedin.com/in/caeser-ibrahim
              </Link>
            </li>
            <li>
              Email:{" "}
              <Link href="mailto:caeserlondon@gmail.com" className="text-gold hover:text-gold2 underline">
                caeserlondon@gmail.com
              </Link>
            </li>
          </ul>

          <h2 className="text-xl font-bold text-text">Collaboration & Opportunities</h2>
          <p>
            This website was built as a technical portfolio project demonstrating the ability to
            design and build a complete modern web application.
          </p>
          <p>If you are interested in:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>collaborating on projects</li>
            <li>discussing engineering opportunities</li>
            <li>hiring me for software development work</li>
          </ul>
          <p>please feel free to get in touch.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
