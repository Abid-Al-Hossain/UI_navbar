"use client";

import type { CSSProperties } from "react";
import type { NavbarState } from "../types";

function box(state: NavbarState): CSSProperties {
  return { width: state.width, minHeight: state.height, padding: state.padding, margin: state.margin, gap: state.gap, borderRadius: state.radius, border: `${state.borderWidth}px solid ${state.border}`, boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`, background: state.background, color: state.foreground, fontFamily: state.fontFamily };
}

export default function LivePreview({ state }: { state: NavbarState }) {
  const model = state as Record<string, unknown>;
  const numberValue = (key: string, fallback: number) => typeof model[key] === "number" ? model[key] : fallback;
  const stringValue = (key: string, fallback: string) => typeof model[key] === "string" ? model[key] : fallback;
  const boolValue = (key: string, fallback = false) => typeof model[key] === "boolean" ? model[key] : fallback;
  const count = numberValue("itemCount", numberValue("navCount", numberValue("linkCount", numberValue("columnCount", 4))));
  const items = Array.from({ length: count }, (_, index) => index + 1);
  const style = box(state);
  if (stringValue("role", "") === "separator" || "orientation" in model) {
    const orientation = stringValue("orientation", "horizontal") as "horizontal" | "vertical";
    const length = numberValue("length", state.width);
    const thickness = numberValue("thickness", state.borderWidth || 1);
    return <div role={boolValue("decorative") ? "presentation" : "separator"} aria-orientation={orientation} style={{ ...style, minHeight: orientation === "vertical" ? length : thickness, width: orientation === "vertical" ? thickness : length, padding: 0, background: state.accent }} />;
  }
  if ("axis" in model) {
    const axis = stringValue("axis", "block");
    const size = numberValue("size", 72);
    const thickness = numberValue("thickness", 1);
    return <div aria-hidden={boolValue("decorative")} role={boolValue("decorative") ? "presentation" : "separator"} style={{ ...style, minHeight: axis === "inline" ? thickness : size, width: axis === "block" ? "100%" : size, display: "grid", placeItems: "center" }}>{boolValue("debugVisible") ? stringValue("token", "space") : ""}</div>;
  }
  const gridColumns = "columns" in model ? `repeat(${numberValue("columns", 3)}, minmax(0, 1fr))` : undefined;
  const isFlex = "direction" in model;
  return <section id={state.id} role={state.role === "presentation" ? undefined : state.role} aria-label={state.landmarkLabel} tabIndex={state.tabIndex} style={style} className="grid content-center"><h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3><p style={{ color: state.muted, fontSize: state.bodySize }}>{state.description}</p><div className="grid gap-3" style={{ gridTemplateColumns: gridColumns, display: isFlex ? "flex" : undefined, flexDirection: isFlex ? stringValue("direction", "row") as CSSProperties["flexDirection"] : undefined, flexWrap: "wrap" in model ? stringValue("wrap", "wrap") as CSSProperties["flexWrap"] : undefined, justifyContent: "justify" in model ? stringValue("justify", "center") as CSSProperties["justifyContent"] : undefined, alignItems: "align" in model ? stringValue("align", "stretch") as CSSProperties["alignItems"] : undefined }}>{items.map((item) => <div key={item} className="rounded-xl border p-3" style={{ borderColor: state.border, background: "rgba(255,255,255,.06)" }}>Item {item}</div>)}</div></section>;
}
