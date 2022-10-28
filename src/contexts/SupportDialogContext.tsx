"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import SupportDialog from "../components/SupportDialog";

interface SupportDialogContext {
  isShowing: boolean;
  openSupportDialog: (onClose?: () => void) => void;
  closeSupportDialog: () => void;
}

const supportDialogContext = createContext<SupportDialogContext | null>(null);

const SupportDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isShowing, setIsShowing] = useState(false);
  const onCloseRef = useRef<() => void>(null);

  const openSupportDialog = useCallback(
    (onClose?: () => void) => {
      if (isShowing) return;
      onCloseRef.current = onClose;
      setIsShowing(true);
    },
    [isShowing, onCloseRef]
  );

  const closeSupportDialog = useCallback(() => {
    setIsShowing(false);
    if (onCloseRef.current) {
      onCloseRef.current();
    }
  }, [onCloseRef]);

  return (
    <supportDialogContext.Provider
      value={{ isShowing, openSupportDialog, closeSupportDialog }}
    >
      {children}
      <SupportDialog />
    </supportDialogContext.Provider>
  );
};

export default SupportDialogProvider;

export const useSupportDialog = () => {
  const context = useContext(supportDialogContext);
  if (!context) {
    throw "useSupportDialog must use inside SupportProvider";
  }
  return context;
};
