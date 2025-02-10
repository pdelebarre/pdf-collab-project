/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current; // This `useRef` instance will render the PDF.

    let PSPDFKit, instance;

    (async function () {
      PSPDFKit = await import("pspdfkit");

      PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.

      instance = await PSPDFKit.load({
        // Container where PSPDFKit should be mounted.
        container: "#pspdfkit",
        serverUrl: "http://localhost:5001/",
        // The document to open.
        documentId: props.documentId,
        authPayload: { jwt: props.token },
        baseUrl: `${window.location.origin}/`,
        instant: true,
        toolbarItems: [
          ...PSPDFKit.defaultToolbarItems,
          { type: "content-editor" },
        ],
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  // This div element will render the document to the DOM.
  return <div id="pspdfkit" ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
