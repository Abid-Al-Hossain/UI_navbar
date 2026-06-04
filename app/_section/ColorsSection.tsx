"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import ColorControl from "@/components/shared/color/ColorControl";
import type { NavbarState } from "../types";

type Props = { state: NavbarState; update: <K extends keyof NavbarState>(key: K, value: NavbarState[K]) => void };

export default function ColorsSection({ state, update }: Props) {
  return <SectionCard title="Colors" subtitle="Colors controls for native layout/page-structure generation."><ColorControl label="Accent" value={state.accent} onChange={(value) => update("accent", value)} />
<ColorControl label="Background" value={state.background} onChange={(value) => update("background", value)} />
<ColorControl label="Foreground" value={state.foreground} onChange={(value) => update("foreground", value)} />
<ColorControl label="Muted text" value={state.muted} onChange={(value) => update("muted", value)} /></SectionCard>;
}
