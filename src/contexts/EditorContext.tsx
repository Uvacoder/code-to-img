import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
} from "react";
import { gradients } from "../data/gradients";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toPng, toJpeg, toSvg } from "html-to-image";
import { Options } from "html-to-image/lib/options";
import axios from "axios";

export type EditorSettings = {
  title: string;
  code: string;
  darkMode: boolean;
  dropShadow: boolean;
  showTitle: boolean;
  fontSize: string;
  padding: string;
  language: string;
  backgroundColor?: string;
  backgroundImage?: string;
  showLineNumber: boolean;
  renderScale: string;
  renderFormat: string;
};

const DEFAULT_JS_VALUE = `import React from "react";

const App = () => {
  return (
    <div>Hello, World!</div>
  )
}

export default App;`;

const defaultSettings: EditorSettings = {
  darkMode: true,
  dropShadow: true,
  showTitle: true,
  showLineNumber: true,
  fontSize: "16px",
  language: "jsx",
  padding: "medium",
  title: "App.tsx",
  code: DEFAULT_JS_VALUE,
  backgroundImage: gradients[0].gradient,
  backgroundColor: gradients[0].color,
  renderScale: "1x",
  renderFormat: "png",
};

export type EditorContextType = {
  settings: EditorSettings;
  setSettings: (newState: EditorSettings) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
  onExport: () => void;
  onCopyLink: () => void;
};
export const EditorContext = createContext<EditorContextType | null>(null);

export const EditorProvider = ({
  children,
  settings: initalSettings,
}: {
  children: ReactNode;
  settings?: EditorSettings;
}) => {
  const [settings, setSettings] = useLocalStorage<EditorSettings>({
    key: "editor-settings",
    value: initalSettings ? initalSettings : defaultSettings,
  });
  const canvasRef = useRef<HTMLDivElement>(null);

  const onExport: EditorContextType["onExport"] = useCallback(async () => {
    if (!canvasRef.current) return;

    const scale =
      settings.renderScale === "3x" ? 3 : settings.renderScale === "2x" ? 2 : 1;

    const options: Options = {
      canvasWidth: canvasRef.current.clientWidth * scale,
      canvasHeight: canvasRef.current.clientHeight * scale,
      skipFonts: true,
    };

    var imgUrl: string | null = null;

    const fileExtension = `.${settings.renderFormat.toLowerCase()}`;

    switch (fileExtension) {
      case ".png":
        imgUrl = await toPng(canvasRef.current, options);
        break;
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

    const link = document.createElement("a");
    link.download = `${settings.title}.${fileExtension}`;
    link.href = imgUrl;
    link.click();
  }, [settings, canvasRef]);

  const onCopyLink: EditorContextType["onCopyLink"] = useCallback(async () => {
    console.log(window.location);
    const origin = window.location.origin;
    await axios.get(`${origin}/hash-code`);
    // const searchParams = await Promise.all(
    //   Object.keys(settings).map(async (item) => {
    //     if (item === "code") {
    //       // const hashedCode = await bcrypt.hash(settings.code, 10);
    //       return `${item}=${hashedCode}`;
    //     }
    //     return `${item}=${settings[item]}`;
    //   })
    // );
    // console.log(searchParams);
  }, [settings]);

  return (
    <EditorContext.Provider
      value={{
        settings,
        setSettings,
        canvasRef,
        onExport,
        onCopyLink,
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
