"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import type { NavbarState } from "../types";

type Props = { state: NavbarState; update: <K extends keyof NavbarState>(key: K, value: NavbarState[K]) => void };

export default function StructureSection({ state, update }: Props) {
  return <SectionCard title="Structure" subtitle="Structure controls for native layout/page-structure generation."><Slider label="Nav items" value={state.navCount} min={1} max={10} step={1} onChange={(value) => update("navCount", value)} /></SectionCard>;
}
