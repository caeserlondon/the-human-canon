import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <main className="hc-bg flex min-h-screen flex-col">
      <Header />

      <article className="mx-auto max-w-2xl flex-1 px-4 py-10">
        <h1 className="font-serif text-3xl font-bold">Terms of Use</h1>
        <p className="mt-4 text-sm text-muted2">Last updated: 2026</p>

        <div className="mt-8 space-y-6 text-muted leading-relaxed">
          <p>Welcome to The Human Canon.</p>
          <p>By using this website, you agree to the following terms.</p>

          <h2 className="text-xl font-bold text-text">Informational Purpose</h2>
          <p>
            The Human Canon provides educational and informational summaries of historical and
            public-domain works.
          </p>
          <p>
            The content is intended for general educational purposes and should not be considered
            professional advice.
          </p>

          <h2 className="text-xl font-bold text-text">Intellectual Content</h2>
          <p>
            Many works discussed on this website are in the public domain. The summaries, structure,
            and presentation of the material are original interpretations created for educational
            purposes.
          </p>

          <h2 className="text-xl font-bold text-text">Portfolio Demonstration</h2>
          <p>
            This website is a personal project created by Caeser Ibrahim to demonstrate the design
            and development of a modern web platform.
          </p>
          <p>
            The site may evolve over time as new features, content structures, or technologies are
            tested.
          </p>

          <h2 className="text-xl font-bold text-text">No Guarantees</h2>
          <p>
            While every effort is made to ensure the accuracy of information presented, no
            guarantees are made regarding completeness or accuracy.
          </p>

          <h2 className="text-xl font-bold text-text">Changes to the Terms</h2>
          <p>These terms may be updated as the project evolves.</p>

          <h2 className="text-xl font-bold text-text">Contact</h2>
          <p>
            For questions regarding these terms:{" "}
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
