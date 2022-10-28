import { FC, PropsWithChildren } from "react";
import { EditorProvider } from "src/contexts/EditorContext";
import SupportDialogProvider from "src/contexts/SupportDialogContext";

const EditorLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      EditorLayout
      <SupportDialogProvider>
        <EditorProvider>{children}</EditorProvider>
      </SupportDialogProvider>
    </div>
  );
};

export default EditorLayout;
