import type { NavbarState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: NavbarState, fileName = "navbar") : ExportPayload {
  return { fileName: `${fileName || "navbar"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: NavbarState) {
  return [
    "import * as React from \"react\";",
    "",
    "const state = " + JSON.stringify(state, null, 2) + ";",
    "",
    "export default function NavbarComponent() {",
    "  const navItems = Array.from({ length: state.navCount }, (_, index) => `Link ${index + 1}`);",
    "  const activeIndex = Math.max(0, Math.min(state.activeIndex, navItems.length - 1));",
    "  const isMobile = state.previewState === \"mobile\";",
    "  const isCollapsed = state.previewState === \"collapsed\" || (isMobile && state.mobileMode === \"collapse\");",
    "  const showDrawer = state.previewState === \"mobile\" && state.mobileMode === \"drawer\";",
    "  const style = {",
    "    width: state.width,",
    "    minHeight: isMobile ? state.height : \"auto\",",
    "    padding: state.padding,",
    "    margin: state.margin,",
    "    gap: state.gap,",
    "    borderRadius: state.radius,",
    "    border: `${state.borderWidth}px solid ${state.border}`,",
    "    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,",
    "    background: state.background,",
    "    color: state.foreground,",
    "    fontFamily: state.fontFamily,",
    "    position: state.sticky ? \"sticky\" : \"relative\",",
    "    top: state.sticky ? 0 : undefined,",
    "    transition: state.motion ? \"all 180ms ease\" : undefined,",
    "  };",
    "",
    "  return (",
    "    <nav id={state.id} aria-label={state.landmarkLabel} tabIndex={state.tabIndex} style={style}>",
    "      <div style={{ display: \"flex\", flexWrap: \"wrap\", alignItems: \"center\", justifyContent: \"space-between\", gap: state.gap }}>",
    "        <a href=\"#\" style={{ color: state.foreground, fontSize: state.titleSize, fontWeight: state.fontWeight, textDecoration: \"none\" }}>{state.title}</a>",
    "        <button type=\"button\" aria-expanded={showDrawer || !isCollapsed} style={{ border: `1px solid ${state.border}`, borderRadius: 999, padding: \"8px 12px\", color: state.foreground, background: showDrawer ? state.accent : \"transparent\" }}>Menu</button>",
    "        <div style={{ display: isMobile || !isCollapsed ? \"flex\" : \"none\", flexWrap: \"wrap\", width: isMobile ? \"100%\" : \"auto\", gap: state.gap }}>",
    "          {navItems.map((item, index) => {",
    "            const active = index === activeIndex || (state.previewState === \"active\" && index === 0);",
    "            return (",
    "              <a key={item} href=\"#\" aria-current={active ? \"page\" : undefined} style={{ borderRadius: 999, padding: \"8px 12px\", color: active || state.previewState === \"hover\" ? state.foreground : state.muted, background: active ? state.accent : state.previewState === \"hover\" && index === 0 ? \"rgba(255,255,255,.12)\" : \"transparent\", outline: state.previewState === \"focus\" && index === activeIndex ? `2px solid ${state.accent}` : undefined, outlineOffset: 3, textDecoration: \"none\" }}>",
    "                {item}{state.hasDropdowns && index === 1 ? \" +\" : \"\"}",
    "              </a>",
    "            );",
    "          })}",
    "        </div>",
    "        <div style={{ display: \"flex\", alignItems: \"center\", gap: Math.max(8, state.gap / 2) }}>",
    "          <a href=\"#\" style={{ color: state.muted, textDecoration: \"none\" }}>Log in</a>",
    "          <a href=\"#\" style={{ borderRadius: 999, padding: \"8px 16px\", background: state.accent, color: state.background, fontWeight: 700, textDecoration: \"none\" }}>Start</a>",
    "        </div>",
    "      </div>",
    "    </nav>",
    "  );",
    "}",
    "",
  ].join("\n");
}
