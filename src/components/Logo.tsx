import { Gem } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "@/lib/DataContext";
import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const dim = size === "sm" ? 24 : size === "lg" ? 40 : 32;
  const text =
    size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";
  const { settings } = useData();
  const customLogo = settings.logo || "";
  return (
    <Link
      to="/"
      className={cn(
        "inline-flex items-center gap-2.5 group select-none",
        className,
      )}
    >
      <div
        className="relative flex items-center justify-center rounded-xl bg-cyan-600 shadow-lg shadow-cyan-500/20 ring-1 ring-white/10 group-hover:shadow-cyan-500/50 transition-shadow overflow-hidden"
        style={{ width: dim + 6, height: dim + 6 }}
      >
        {customLogo ? (
          <img
            src={customLogo}
            alt={settings.siteName || "Site logo"}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <Gem
              size={dim * 0.6}
              strokeWidth={2.4}
              className="text-white drop-shadow-sm"
            />
          </>
        )}
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <BrandText
            name={settings.siteName || "Premium MC Hub"}
            className={cn("font-extrabold tracking-tight text-white", text)}
          />
          {size !== "sm" && (
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Clients · Mods · Macros
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

/**
 * Render the site name with the middle word highlighted with the brand accent.
 * Works for any name length (1, 2, 3+ words) without fragile splits.
 */
function BrandText({ name, className }: { name: string; className?: string }) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  if (parts.length === 1) {
    return <span className={className}>{parts[0]}</span>;
  }
  if (parts.length === 2) {
    return (
      <span className={className}>
        {parts[0]}{" "}
        <span className="text-lime-300">
          {parts[1]}
        </span>
      </span>
    );
  }
  const head = parts.slice(0, -2).join(" ");
  const accent = parts[parts.length - 2];
  const tail = parts[parts.length - 1];
  return (
    <span className={className}>
      {head}{" "}
      <span className="text-lime-300">
        {accent}
      </span>{" "}
      {tail}
    </span>
  );
}
