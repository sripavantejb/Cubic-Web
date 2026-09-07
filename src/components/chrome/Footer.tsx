import { footer, site } from "@/content/site";

const columns = [
  { heading: "Company", links: footer.company.slice(0, 3) },
  { heading: "Services", links: footer.services.slice(0, 3) },
  {
    heading: "Connect",
    links: [
      { label: "Contact", href: "#contact" },
      ...footer.social,
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="section-x mx-auto max-w-[1440px] pt-10 pb-[max(1rem,env(safe-area-inset-bottom))] md:pt-12 md:pb-5">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <p className="flex max-w-[22rem] items-start gap-3 text-[14px] leading-relaxed text-paper/80">
            <span
              className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-mist/25 text-[9px] font-semibold tracking-wide text-mist"
              aria-hidden
            >
              HI
            </span>
            Hazel is the green facility home India has been searching for.
          </p>

          <div className="grid grid-cols-2 gap-8 min-[480px]:grid-cols-3 min-[480px]:gap-6 sm:gap-12 lg:gap-16">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="meta mb-4 text-mist/55">{col.heading}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        className="text-[13px] text-paper/55 transition-colors hover:text-mist"
                        href={l.href}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-10 overflow-x-clip pr-[0.28em] md:mt-12">
          <p className="display pb-[0.08em] text-[clamp(2.8rem,22vw,14.5rem)] leading-none tracking-[-0.06em] text-paper/80">
            <span className="relative inline-block">
              HAZEL
              <span
                className="absolute top-[0.08em] -right-[0.22em] text-[0.11em] font-medium tracking-normal text-mist/55"
                aria-hidden
              >
                ©
              </span>
            </span>
          </p>
        </div>
        <p className="sr-only">
          {site.name}. {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
