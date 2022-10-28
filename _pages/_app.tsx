import { AppProps } from "next/app";
import Header from "../src/components/Header";
import SEO from "../src/components/SEO";
import { EditorProvider } from "../src/contexts/EditorContext";
import SupportDialogProvider from "../src/contexts/SupportDialogContext";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SupportDialogProvider>
      <EditorProvider>
        <SEO />
        <Header />
        <Component {...pageProps} />
      </EditorProvider>
    </SupportDialogProvider>
  );
};

export default MyApp;
