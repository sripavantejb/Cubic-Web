import Link from "next/link";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-ink pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] text-center text-paper">
      <p className="meta text-mist">404</p>
      <h1 className="display mt-6 text-[clamp(2.4rem,6vw,4.4rem)]">This path isn&apos;t on the map.</h1>
      <p className="mt-4 max-w-md text-mist/90">
        Return to {site.name} and continue the journey.
      </p>
      <Link href="/" className="mt-10 inline-flex rounded-full bg-paper px-6 py-3 text-[15px] text-ink">
        Back to home
      </Link>
    </main>
  );
}
