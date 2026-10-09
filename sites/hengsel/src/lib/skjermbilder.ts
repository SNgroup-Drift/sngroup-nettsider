/**
 * Skjermbildene av Hengsel Ute i public/skjermbilder (ute-*.webp, 2×). Leses ved bygging: filnavn, pikselmål og
 * bildetekst. Vises med width = halve pikselbredden (bildene er 2×), så de står i naturlig størrelse på skjermen.
 * Rekkefølgen er filnavnet sortert, så et tall først i navnet (ute-01-i-dag.webp) styrer rekkefølgen.
 * Bildeteksten hentes fra UTE_TEKST i content/forside.ts; mangler den, lages den av filnavnet (ute-i-dag → «I dag»).
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export interface Skjermbilde {
  /** Adressen på nettstedet, f.eks. /skjermbilder/ute-i-dag.webp */
  src: string;
  /** Nøkkelen i UTE_TEKST: filnavnet uten «ute-», tall foran og .webp */
  nokkel: string;
  /** Pikselmål i filen (2×) */
  px: [number, number];
  /** Mål på skjermen: halve pikselbredden */
  width: number;
  height: number;
}

// Bygget kjører fra sites/hengsel (npm workspaces); fra rotmappen finnes mappen under sites/hengsel
const MAPPE = [join(process.cwd(), "public", "skjermbilder"), join(process.cwd(), "sites", "hengsel", "public", "skjermbilder")]
  .find((m) => existsSync(m)) ?? join(process.cwd(), "public", "skjermbilder");

/** Bredde og høyde i piksler fra WebP-hodet (VP8, VP8L og VP8X). null hvis filen ikke er WebP. */
export function webpMaal(fil: string): [number, number] | null {
  const b = readFileSync(fil);
  if (b.length < 30 || b.toString("latin1", 0, 4) !== "RIFF" || b.toString("latin1", 8, 12) !== "WEBP") return null;
  const type = b.toString("latin1", 12, 16);
  if (type === "VP8X") return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (type === "VP8L") {
    const bits = b.readUInt32LE(21);
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
  }
  if (type === "VP8 ") return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  return null;
}

/** Alle ute-*.webp i public/skjermbilder, sortert på filnavn. Tom liste hvis mappen mangler. */
export function uteSkjermbilder(): Skjermbilde[] {
  let filer: string[] = [];
  try {
    filer = readdirSync(MAPPE).filter((f) => /^ute-.+\.webp$/i.test(f)).sort((a, b) => a.localeCompare(b, "nb"));
  } catch {
    return [];
  }
  const ut: Skjermbilde[] = [];
  for (const f of filer) {
    const px = webpMaal(join(MAPPE, f));
    if (!px) {
      console.warn(`skjermbilder: ${f} er ikke en WebP-fil, hoppes over`);
      continue;
    }
    ut.push({
      src: `/skjermbilder/${f}`,
      nokkel: f.replace(/^ute-/i, "").replace(/^\d+[-_]?/, "").replace(/\.webp$/i, ""),
      px,
      width: Math.round(px[0] / 2),
      height: Math.round(px[1] / 2),
    });
  }
  return ut;
}

/** Bildetekst fra nøkkelen: «i-dag» → «I dag» */
export function tekstFraNokkel(nokkel: string): string {
  const ord = nokkel.replace(/[-_]+/g, " ").trim();
  return ord ? ord[0].toUpperCase() + ord.slice(1) : nokkel;
}
