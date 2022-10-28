"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toPng, toJpeg, toSvg, toBlob } from "html-to-image";
import { Options } from "html-to-image/lib/types";
import { useAtom } from "jotai";
import { AppState, appStateAtom, initAppState } from "../stores/appState";
import { exportSettingsAtom } from "../stores/exportSettings";
import * as gtag from "../lib/gtag";
import { useSupportDialog } from "./SupportDialogContext";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export type EditorContextType = {
  canvasRef: React.RefObject<HTMLDivElement>;
  onExport: () => void;
  onReset: () => void;
  onCopyAsLink: () => void;
  onCopyAsImage: () => void;
};

export const EditorContext = createContext<EditorContextType | null>(null);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useAtom(appStateAtom);
  const [exportSettings] = useAtom(exportSettingsAtom);
  const { openSupportDialog } = useSupportDialog();
  const searchParams = useSearchParams();

  const router = useRouter();

  const getSettings = useCallback(async () => {
    let decodedQuery: any = Object.fromEntries(
      new URLSearchParams(location.search)
    );
    Object.keys(decodedQuery).map((key) => {
      switch (decodedQuery[key]) {
        case "true":
          decodedQuery[key] = true;
          break;

        case "false":
          decodedQuery[key] = false;
          break;

        default:
          break;
      }
    });

    setSettings({
      ...initAppState,
      ...decodedQuery,
    });

    setIsLoading(false);
  }, [setSettings]);

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  const canvasRef = useRef<HTMLDivElement>(null);

  const getConvertOptions = useCallback(
    (settings: AppState) => {
      const scale =
        exportSettings.renderScale === "3x"
          ? 3
          : exportSettings.renderScale === "2x"
          ? 2
          : 1;
      console.log(scale);

      const options: Options = {
        canvasWidth: canvasRef.current.clientWidth * scale,
        canvasHeight: canvasRef.current.clientHeight * scale,
        quality: 0.95,
      };
      return options;
    },
    [exportSettings.renderScale]
  );

  const onExport: EditorContextType["onExport"] = useCallback(async () => {
    if (!canvasRef.current) return;
    openSupportDialog(async () => {
      const options = getConvertOptions(settings);

      var imgUrl: string | null = null;

      const fileExtension = `.${exportSettings.renderFormat.toLowerCase()}`;

      switch (fileExtension) {
        case ".jpeg":
          imgUrl = await toJpeg(canvasRef.current, options);
          break;
        case ".svg":
          imgUrl = await toSvg(canvasRef.current, options);
          break;
        default:
          imgUrl = await toPng(canvasRef.current, options);
          break;
      }

      if (!imgUrl) return;
      const filename = `${settings.filename || "Untitled"}${fileExtension}`;
      const link = document.createElement("a");
      link.download = filename;
      link.href = imgUrl;
      link.click();

      gtag.event({
        action: "image_export",
        category: "export",
        label: location.href,
      });
    });
  }, [
    getConvertOptions,
    settings,
    exportSettings.renderFormat,
    openSupportDialog,
  ]);

  const onCopyAsLink: EditorContextType["onCopyAsLink"] =
    useCallback(async () => {
      window.navigator.clipboard.writeText(location.href);
      gtag.event({
        action: "copy_link",
        category: "export",
        label: location.href,
      });
    }, []);

  const onCopyAsImage: EditorContextType["onCopyAsImage"] =
    useCallback(async () => {
      if (!canvasRef.current) return;
      const options = getConvertOptions(settings);
      const blog = await toBlob(canvasRef.current, options);
      window.navigator.clipboard.write([
        new ClipboardItem({ "image/png": blog }),
      ]);
      console.log("Copied");
      gtag.event({
        action: "copy_image",
        category: "export",
        label: location.href,
      });
    }, [getConvertOptions, settings]);

  const onReset = () => {
    setSettings(initAppState);
    gtag.event({
      action: "reset",
      category: "reset",
    });
  };
  if (isLoading) return null;

  return (
    <EditorContext.Provider
      value={{
        canvasRef,
        onExport,
        onCopyAsLink,
        onCopyAsImage,
        onReset,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw "Editor context is not initialized!";
  }
  return context;
};
