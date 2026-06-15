"use client";

import type { CSSProperties } from "react";
import type { NavbarState } from "../types";
import { SYSTEM_FONTS } from "@/components/shared/typography/fontConstants";

function resolveFont(state: { fontBucket: "system" | "google"; googleFontFamily: string; systemFontIdx: number }): string {
  return state.fontBucket === "google"
    ? `"${state.googleFontFamily}", sans-serif`
    : (SYSTEM_FONTS[state.systemFontIdx]?.css ?? "inherit");
}

function buildShadow(state: { shadowEnabled: boolean; shadowX: number; shadowY: number; shadowBlur: number; shadowSpread: number; shadowColor: string; shadowOpacity: number }): string {
  if (!state.shadowEnabled) return "none";
  const hex = Math.round(state.shadowOpacity * 255).toString(16).padStart(2, "0");
  return `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}${hex}`;
}

function buildRadius(state: { radiusLinked: boolean; radius: number; radiusTL: number; radiusTR: number; radiusBR: number; radiusBL: number }): string {
  return state.radiusLinked
    ? `${state.radius}px`
    : `${state.radiusTL}px ${state.radiusTR}px ${state.radiusBR}px ${state.radiusBL}px`;
}

function box(state: NavbarState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.previewState === "mobile" ? state.height : "auto",
    padding: state.padding,
    margin: state.margin,
    gap: state.gap,
    borderRadius: buildRadius(state),
    border: `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`,
    boxShadow: buildShadow(state),
    background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight,
    position: state.sticky ? "sticky" : "relative",
    top: state.sticky ? 0 : undefined,
    transition: state.transitionDuration > 0 ? "all 180ms ease" : undefined,
  };
}

export default function LivePreview({ state }: { state: NavbarState }) {
  const navItems = Array.from({ length: state.navCount }, (_, index) => `Link ${index + 1}`);
  const activeIndex = Math.max(0, Math.min(state.activeIndex, navItems.length - 1));
  const style = box(state);
  const isMobile = state.previewState === "mobile";
  const isCollapsed = state.previewState === "collapsed" || (isMobile && state.mobileMode === "collapse");
  const showDrawer = state.previewState === "mobile" && state.mobileMode === "drawer";

  return (
    <nav id={state.id} aria-label={state.landmarkLabel} tabIndex={state.tabIndex} style={style}>
      <div className="flex flex-wrap items-center justify-between" style={{ gap: state.gap }}>
        <a href="#" className="font-semibold" style={{ color: state.foreground, fontSize: state.titleSize, fontWeight: state.fontWeight }}>
          {state.title}
        </a>
        <button
          type="button"
          aria-expanded={showDrawer || !isCollapsed}
          className="rounded-full border px-3 py-2 text-sm font-semibold sm:hidden"
          style={{ borderColor: state.border, color: state.foreground, background: showDrawer ? state.accent : "transparent" }}
        >
          Menu
        </button>
        <div
          className={isMobile && state.mobileMode === "stack" ? "grid w-full" : "hidden items-center sm:flex"}
          style={{
            gap: state.gap,
            display: isMobile || !isCollapsed ? undefined : "none",
          }}
        >
          {navItems.map((item, index) => {
            const active = index === activeIndex || (state.previewState === "active" && index === 0);
            return (
              <a
                key={item}
                href="#"
                aria-current={active ? "page" : undefined}
                className="rounded-full px-3 py-2 text-sm font-medium"
                style={{
                  color: active || state.previewState === "hover" ? state.foreground : state.muted,
                  background: active ? state.accent : state.previewState === "hover" && index === 0 ? "rgba(255,255,255,.12)" : "transparent",
                  outline: state.previewState === "focus" && index === activeIndex ? `2px solid ${state.accent}` : undefined,
                  outlineOffset: state.previewState === "focus" && index === activeIndex ? 3 : undefined,
                }}
              >
                {item}
                {state.hasDropdowns && index === 1 ? " +" : ""}
              </a>
            );
          })}
        </div>
        <div className="flex items-center" style={{ gap: Math.max(8, state.gap / 2) }}>
          <a href="#" className="text-sm font-medium" style={{ color: state.muted }}>
            Log in
          </a>
          <a href="#" className="rounded-full px-4 py-2 text-sm font-semibold" style={{ background: state.accent, color: state.background }}>
            Start
          </a>
        </div>
      </div>
    </nav>
  );
}
