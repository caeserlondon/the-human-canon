import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <main className="hc-bg flex min-h-screen flex-col">
      <Header />

      <article className="mx-auto max-w-2xl flex-1 px-4 py-10">
        <h1 className="font-serif text-3xl font-bold">About</h1>

        <div className="mt-8 space-y-6 text-muted leading-relaxed">
          <p>
            The Human Canon is an independent digital project created by Caeser Ibrahim.
          </p>
          <p>
            The goal of the project is to explore how the most important works in human intellectual
            history can be presented in a clear, structured, and accessible way for modern readers.
          </p>
          <p>
            Many classical books are long, complex, and difficult to approach. This project
            experiments with transforming those works into structured summaries and concise
            explanations that make their ideas easier to understand.
          </p>
          <p>
            The Human Canon focuses on timeless works of philosophy, ethics, political thought,
            economics, and self-mastery that have shaped civilizations across centuries.
          </p>

          <h2 className="mt-10 text-xl font-bold text-text">Purpose of the Project</h2>
          <p>
            This website was built as a technical portfolio project demonstrating the ability to
            design and build a complete modern web application.
          </p>
          <p>It showcases skills including:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>modern frontend architecture</li>
            <li>responsive interface design</li>
            <li>structured content systems</li>
            <li>performance-focused development</li>
            <li>scalable project structure</li>
          </ul>
          <p>
            The site is built using modern web technologies and is intended to demonstrate practical
            engineering capabilities in building real digital products.
          </p>

          <h2 className="mt-10 text-xl font-bold text-text">Creator</h2>
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
          <p>
            If you are interested in collaborating or hiring me for software engineering work, feel
            free to get in touch.
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
