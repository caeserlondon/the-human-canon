import { RollLink } from "@/components/roll-link";

export function Footer() {
  return (
    <footer data-testid="footer" className="border-t border-border bg-bg2">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-sm text-muted">
            © 2026 The Human Canon — Built by Caeser Ibrahim
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <RollLink href="/about" className="nav-link transition-colors">
              About
            </RollLink>
            <RollLink href="/privacy" className="nav-link transition-colors">
              Privacy Policy
            </RollLink>
            <RollLink href="/terms" className="nav-link transition-colors">
              Terms
            </RollLink>
            <RollLink href="/contact" className="nav-link transition-colors">
              Contact
            </RollLink>
            <RollLink href="/public-domain" className="nav-link transition-colors">
              Public Domain
            </RollLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
