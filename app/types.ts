export type SectionId = "presets" | "basics" | "metadata" | "structure" | "layout" | "sizing" | "spacing" | "surface" | "colors" | "border" | "radius" | "shadow" | "typography" | "states" | "accessibility";

export type NavbarState = {
  description: string;
  id: string;
  tabIndex: number;
  width: number;
  height: number;
  gap: number;
  padding: number;
  margin: number;
  radius: number;
  borderWidth: number;
  shadow: number;
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  border: string;
  fontFamily: string;
  titleSize: number;
  bodySize: number;
  fontWeight: number;
  previewState: "default" | "hover" | "focus" | "active" | "collapsed" | "mobile" | "overflow";
  motion: boolean;
  title: string;
  element: "div" | "section" | "main" | "header" | "footer" | "aside" | "nav" | "hr";
  role: "presentation" | "group" | "region" | "main" | "banner" | "contentinfo" | "navigation" | "separator";
  landmarkLabel: string;
  navCount: number;
  activeIndex: number;
  hasDropdowns: boolean;
  sticky: boolean;
  mobileMode: "collapse" | "drawer" | "stack";
};

export type StudioPreset = { id: string; family: string; archetype: string; variant: string; size: string; tags: string[]; state: NavbarState };

export const SECTIONS: Array<{ id: SectionId; label: string }> = [
  {
    "id": "presets",
    "label": "Presets"
  },
  {
    "id": "basics",
    "label": "Basics"
  },
  {
    "id": "metadata",
    "label": "Metadata"
  },
  {
    "id": "structure",
    "label": "Structure"
  },
  {
    "id": "layout",
    "label": "Layout"
  },
  {
    "id": "sizing",
    "label": "Sizing"
  },
  {
    "id": "spacing",
    "label": "Spacing"
  },
  {
    "id": "surface",
    "label": "Surface"
  },
  {
    "id": "colors",
    "label": "Colors"
  },
  {
    "id": "border",
    "label": "Border"
  },
  {
    "id": "radius",
    "label": "Radius"
  },
  {
    "id": "shadow",
    "label": "Shadow"
  },
  {
    "id": "typography",
    "label": "Typography"
  },
  {
    "id": "states",
    "label": "State Preview"
  },
  {
    "id": "accessibility",
    "label": "Accessibility"
  }
];
