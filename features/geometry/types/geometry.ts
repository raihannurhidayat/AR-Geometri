export interface GeometryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  characteristics: string[];
  targetIndex: number;
  modelGlbPath: string;
  markerPreviewPath: string;
  formulaVolume: {
    formula: string;
    description: string;
  };
  formulaSurface: {
    formula: string;
    description: string;
  };
  variables: Record<string, string>;
  color: {
    primary: string;
    accent: string;
    bg: string;
  };
}

export type ScannerStatus =
  | "idle"
  | "requesting_permission"
  | "ready"
  | "scanning"
  | "detected"
  | "error";

export interface CameraErrorState {
  code: "NOT_ALLOWED" | "NOT_FOUND" | "NOT_SUPPORTED" | "INSECURE_CONTEXT" | "UNKNOWN";
  message: string;
  helpTip: string;
}
