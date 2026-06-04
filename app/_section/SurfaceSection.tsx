"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Switch from "@/components/shared/input/Switch";
import type { NavbarState } from "../types";

type Props = { state: NavbarState; update: <K extends keyof NavbarState>(key: K, value: NavbarState[K]) => void };

export default function SurfaceSection({ state, update }: Props) {
  return <SectionCard title="Surface" subtitle="Surface controls for native layout/page-structure generation."><Switch label="Sticky" checked={state.sticky} onChange={(value) => update("sticky", value)} /></SectionCard>;
}
