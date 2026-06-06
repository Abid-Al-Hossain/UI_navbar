"use client";

import type { CSSProperties } from "react";
import type { NavbarState } from "../types";

function box(state: NavbarState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.previewState === "mobile" ? state.height : "auto",
    padding: state.padding,
    margin: state.margin,
    gap: state.gap,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    position: state.sticky ? "sticky" : "relative",
    top: state.sticky ? 0 : undefined,
    transition: state.motion ? "all 180ms ease" : undefined,
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
