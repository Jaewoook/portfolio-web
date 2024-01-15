"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { LayerContext } from "../contexts/LayerContext";
import type { ILayerContext } from "../contexts/LayerContext";

const BASE_Z_INDEX = 10;

interface LayerRenderParams {
  zIndex: number;
  isTopLayer: boolean;
  focus: () => void;
  blur: () => void;
  remove: () => void;
}

interface LayerProps {
  layerId: string;
  children: (renderParams: LayerRenderParams) => ReactNode;
}

export const Layer = (props: LayerProps) => {
  const { children, layerId } = props;
  const { layers, addLayer, removeLayer, focus, blur } =
    useContext(LayerContext);
  const zIndex = useMemo(() => {
    const layerIndex = layers.indexOf(layerId);
    return layerIndex >= 0 ? BASE_Z_INDEX + layerIndex : -1;
  }, [layers, layerId]);
  const isTopLayer = useMemo(() => layers.indexOf(layerId) === layers.length - 1, [layers, layerId]);

  const focusCurrent = useCallback(() => focus(layerId), [focus, layerId]);
  const blurCurrent = useCallback(() => blur(layerId), [blur, layerId]);
  const removeCurrent = useCallback(
    () => removeLayer(layerId),
    [removeLayer, layerId]
  );

  useEffect(() => {
    addLayer(layerId);

    return () => removeLayer(layerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children({
    zIndex,
    isTopLayer,
    focus: focusCurrent,
    blur: blurCurrent,
    remove: removeCurrent,
  });
};

export const LayerManager = (props: React.PropsWithChildren) => {
  const [layers, setLayers] = useState<string[]>([]);

  const addLayer = useCallback((layerId: string) => {
    let zIndex = 0;
    setLayers((prevLayers) => {
      zIndex = prevLayers.length;
      return [...prevLayers, layerId];
    });

    return zIndex;
  }, []);

  const removeLayer = useCallback(
    (layerId: string) => {
      const layerPosition = layers.indexOf(layerId);

      if (layerPosition < 0) {
        return;
      }

      setLayers([
        ...layers.slice(0, layerPosition),
        ...layers.slice(layerPosition + 1),
      ]);
    },
    [layers]
  );

  const focus = useCallback(
    (layerId: string) => {
      const layerIndex = layers.indexOf(layerId);
      if (layerIndex < 0) {
        return;
      }

      setLayers([
        ...layers.slice(0, layerIndex),
        ...layers.slice(layerIndex + 1),
        layerId,
      ]);
    },
    [layers]
  );

  // TODO
  const blur = useCallback((layerId: string) => {}, []);

  const value: ILayerContext = {
    layers,
    addLayer,
    removeLayer,
    focus,
    blur,
  };

  return (
    <LayerContext.Provider value={value}>
      {props.children}
    </LayerContext.Provider>
  );
};
