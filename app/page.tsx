"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/shared/layout/AppShell";
import { PlaygroundLayout } from "@/components/shared/layout/PlaygroundLayout";
import SectionSelector from "@/components/shared/layout/SectionSelector";
import { SharedPreviewDownloadPanel } from "@/components/shared/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/components/shared/layout/PreviewPanel";
import { DEFAULT_NAVBAR_STATE } from "./_data/NavbarPresets";
import { buildExportPayload } from "./_utils/exportUtils";
import LivePreview from "./_section/LivePreview";
import PresetsSection from "./_section/PresetsSection";
import BasicsSection from "./_section/BasicsSection";
import MetadataSection from "./_section/MetadataSection";
import StructureSection from "./_section/StructureSection";
import LayoutSection from "./_section/LayoutSection";
import SizingSection from "./_section/SizingSection";
import SpacingSection from "./_section/SpacingSection";
import SurfaceSection from "./_section/SurfaceSection";
import ColorsSection from "./_section/ColorsSection";
import BorderSection from "./_section/BorderSection";
import RadiusSection from "./_section/RadiusSection";
import ShadowSection from "./_section/ShadowSection";
import TypographySection from "./_section/TypographySection";
import StatesSection from "./_section/StatesSection";
import AccessibilitySection from "./_section/AccessibilitySection";
import { SECTIONS, type SectionId, type NavbarState, type StudioPreset } from "./types";

export default function Page() {
  const [state, setState] = useState<NavbarState>(DEFAULT_NAVBAR_STATE);
  const [activeSection, setActiveSection] = useState<SectionId>("presets");
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [downloadName] = useState("navbar-component");
  const [previewBgMode, setPreviewBgMode] = useState<PreviewCanvasMode>("custom");
  const [previewBgInput, setPreviewBgInput] = useState("#0b1220");
  const [previewResetKey, setPreviewResetKey] = useState(0);
  const update = <K extends keyof NavbarState>(key: K, value: NavbarState[K]) => { setState((current) => ({ ...current, [key]: value })); setActivePresetId(null); };
  const applyPreset = (preset: StudioPreset) => { setState({ ...DEFAULT_NAVBAR_STATE, ...(preset.state as Partial<NavbarState>) }); setActivePresetId(preset.id); setPreviewResetKey((value) => value + 1); };
  const exportPayload = useMemo(() => buildExportPayload(state, downloadName), [downloadName, state]);
  const preview = useMemo(() => <LivePreview key={previewResetKey} state={state} />, [previewResetKey, state]);
  const controls = <><SectionSelector sections={SECTIONS} active={activeSection} onChange={setActiveSection} />{activeSection === "presets" && <PresetsSection activePresetId={activePresetId} onApply={applyPreset} />}{activeSection === "basics" && <BasicsSection state={state} update={update} />}{activeSection === "metadata" && <MetadataSection state={state} update={update} />}{activeSection === "structure" && <StructureSection state={state} update={update} />}{activeSection === "layout" && <LayoutSection state={state} update={update} />}{activeSection === "sizing" && <SizingSection state={state} update={update} />}{activeSection === "spacing" && <SpacingSection state={state} update={update} />}{activeSection === "surface" && <SurfaceSection state={state} update={update} />}{activeSection === "colors" && <ColorsSection state={state} update={update} />}{activeSection === "border" && <BorderSection state={state} update={update} />}{activeSection === "radius" && <RadiusSection state={state} update={update} />}{activeSection === "shadow" && <ShadowSection state={state} update={update} />}{activeSection === "typography" && <TypographySection state={state} update={update} />}{activeSection === "states" && <StatesSection state={state} update={update} />}{activeSection === "accessibility" && <AccessibilitySection state={state} update={update} />}</>;
  const output = <SharedPreviewDownloadPanel preview={preview} code={exportPayload.content} downloadName={downloadName} previewBgMode={previewBgMode} previewBgInput={previewBgInput} onPreviewBgMode={setPreviewBgMode} onPreviewBgInput={setPreviewBgInput} />;
  return <AppShell contentOverflow="hidden"><PlaygroundLayout title="Navbar Studio" controls={controls} preview={output} /></AppShell>;
}
