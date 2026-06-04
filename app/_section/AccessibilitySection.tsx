"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import type { NavbarState } from "../types";

type Props = { state: NavbarState; update: <K extends keyof NavbarState>(key: K, value: NavbarState[K]) => void };

export default function AccessibilitySection({ state, update }: Props) {
  return <SectionCard title="Accessibility" subtitle="Accessibility controls for native layout/page-structure generation."><Input label="Landmark label" value={state.landmarkLabel} onChange={(value) => update("landmarkLabel", value)} />
<Select label="Semantic role" value={state.role} options={[
  "presentation",
  "group",
  "region",
  "main",
  "banner",
  "contentinfo",
  "navigation",
  "separator"
]} onChange={(value) => update("role", value)} /></SectionCard>;
}
