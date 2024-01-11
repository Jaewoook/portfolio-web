import { createContext } from "react";

export interface ILayerContext {
  layers: string[];
  addLayer: (layerId: string) => number;
  removeLayer: (layerId: string) => void;
  focus: (layerId: string) => void;
  blur: (layerId: string) => void;
}

export const LayerContext = createContext<ILayerContext>({
  layers: [],
  addLayer: () => -1,
  removeLayer: (_) => {},
  focus: (_) => {},
  blur: (_) => {},
});
