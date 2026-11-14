import { Link } from "react-router-dom";
import {
  ArrowRight,
  Gamepad2,
  Layers,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { useData } from "@/lib/DataContext";
import { ItemCard } from "@/components/ItemCard";

export function HomePage() {
  const { publishedItems } = useData();
  const featured = publishedItems.filter((i) => i.featured).slice(0, 6);
  const recent = [...publishedItems]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 6);

  const clientsCount = publishedItems.filter((i) => i.type === "client").length;
  const modsCount = publishedItems.filter((i) => i.type === "mod").length;
  const macrosCount = publishedItems.filter((i) => i.type === "macro").length;

  return (
    <div className="relative">
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/[0.07] px-3 py-1 text-xs font-medium text-lime-200">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_10px_rgba(190,242,100,0.9)]" /> Premium MC Hub
            </div>
            <h1 className="mt-5 text-4xl md:text-7xl font-semibold tracking-[-0.04em] leading-[0.98] text-balance">
              <span className="text-white">Tools that make</span>{" "}
              <span className="gradient-text">every session better.</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-400 max-w-2xl text-balance">
              Browse Minecraft clients, mods, and macros.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/clients" className="btn-primary h-11 px-5">
                Browse Clients <ArrowRight size={15} />
              </Link>
              <Link to="/mods-and-macros" className="btn-ghost h-11 px-5">
                Mods & Macros
              </Link>
            </div>
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CategoryCard
            to="/clients"
            icon={<Gamepad2 size={20} />}
            title="Minecraft Clients"
            desc="Full PvP, all-in-one, and free clients — ready to install."
            accent="violet"
            count={clientsCount}
          />
          <CategoryCard
            to="/mods-and-macros?type=mod"
            icon={<Layers size={20} />}
            title="Performance Mods"
            desc="OptiFine, Sodium, FPS boosts and visual upgrades."
            accent="emerald"
            count={modsCount}
          />
          <CategoryCard
            to="/mods-and-macros?type=macro"
            icon={<Zap size={20} />}
            title="Macros & Scripts"
            desc="Auto-clickers, bedwars helpers, and PvP scripts."
            accent="amber"
            count={macrosCount}
          />
        </div>
      </section>

      {featured.length > 0 && (
        <Section
          title="Featured"
          subtitle="The cream of the crop, curated weekly."
          icon={<Sparkles size={16} />}
          linkTo="/search?featured=1"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((i) => (
              <ItemCard key={i.id} item={i} featured />
            ))}
          </div>
        </Section>
      )}

      {recent.length > 0 && (
        <Section
          title="Recently Updated"
          subtitle="Fresh releases and version bumps."
          icon={<Sparkles size={16} />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recent.map((i) => (
              <ItemCard key={i.id} item={i} />
            ))}
          </div>
        </Section>
      )}

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900 p-8 md:p-12">
          <div className="relative max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Want your client on the hub?
            </h3>
            <p className="mt-3 text-slate-300/80">
              Add clients, mods, and macros to your catalog from the admin panel.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/search" className="btn-primary">
                Explore the catalog <ArrowRight size={14} />
              </Link>
              <Link to="/clients" className="btn-ghost">
                See clients
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({
  title,
  subtitle,
  icon,
  linkTo,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  linkTo?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <div className="flex items-end justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-violet-300">
            {icon}
            <h2 className="section-title">{title}</h2>
          </div>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
          )}
        </div>
        {linkTo && (
          <Link
            to={linkTo}
            className="text-sm text-violet-300 hover:text-violet-200 inline-flex items-center gap-1"
          >
            View all <ArrowRight size={13} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function CategoryCard({
  to,
  icon,
  title,
  desc,
  count,
  accent,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  count: number;
  accent: "violet" | "emerald" | "amber";
}) {
  const accents = {
    violet: "text-lime-300 border-lime-300/20",
    emerald: "text-slate-300 border-white/10",
    amber: "text-slate-300 border-white/10",
  } as const;
  return (
    <Link
      to={to}
      className={`group relative overflow-hidden rounded-2xl border bg-ink-800/60 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 ${accents[accent]}`}
    >
      <div className="relative">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${accents[accent].split(" ").pop()}`}
        >
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-400">{desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">{count} items</span>
          <span className="inline-flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity text-white">
            Browse <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}
