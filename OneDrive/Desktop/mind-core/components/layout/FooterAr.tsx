import { nav } from "@/content/site-ar";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline px-6 pb-14 pt-20">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-beam/40 to-transparent"
      />

      <div className="mx-auto mb-16 max-w-6xl">
        <p
          aria-hidden
          className="display select-none bg-gradient-to-b from-frost/10 to-frost/[0.02] bg-clip-text text-center text-[18vw] font-semibold leading-[0.8] tracking-tightest text-transparent sm:text-[15vw] lg:text-[12rem]"
        >
          MIND CORE
        </p>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="relative block h-2 w-2 rounded-full bg-beam">
            <span className="absolute -inset-1 rounded-full bg-core/40 blur-[5px]" />
          </span>
          <span className="font-display text-sm font-semibold text-frost">
            مايند كور
          </span>
          <span className="mr-2 text-[13px] text-mist/60">
            © {new Date().getFullYear()}
          </span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-7">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-mist transition-colors duration-300 hover:text-frost"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-[13px] text-mist transition-colors duration-300 hover:text-frost"
          >
            التواصل
          </a>
        </nav>

        <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-wide text-mist/50">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-beam opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-beam" />
          </span>
          All systems operational · Built five years early
        </p>
      </div>
    </footer>
  );
}
