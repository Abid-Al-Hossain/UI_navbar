"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import Slider from "@/components/shared/input/Slider";
import Select from "@/components/shared/input/Select";
import type { NavbarState } from "../types";

type Props = { state: NavbarState; update: <K extends keyof NavbarState>(key: K, value: NavbarState[K]) => void };

export default function MetadataSection({ state, update }: Props) {
  return <SectionCard title="Metadata" subtitle="Metadata controls for native layout/page-structure generation."><Input label="id" value={state.id} onChange={(value) => update("id", value)} />
<Select label="Element" value={state.element} options={[
  "div",
  "section",
  "main",
  "header",
  "footer",
  "aside",
  "nav",
  "hr"
]} onChange={(value) => update("element", value)} />
<Select label="Role" value={state.role} options={[
  "presentation",
  "group",
  "region",
  "main",
  "banner",
  "contentinfo",
  "navigation",
  "separator"
]} onChange={(value) => update("role", value)} />
<Slider label="tabIndex" value={state.tabIndex} min={0} max={4} step={1} onChange={(value) => update("tabIndex", value)} /></SectionCard>;
}
