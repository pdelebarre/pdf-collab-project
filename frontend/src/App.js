import React, { useEffect } from "react";
import PSPDFKit from "pspdfkit";
import "./assets/pspdfkit.js";

// Mention the location of `pspdfkit-lib` directory to look for library assets.
const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

PSPDFKit.load({
  baseUrl,
  container: "#pspdfkit",
  document: "document.pdf",
})
  .then((instance) => {
    console.log("PSPDFKit loaded", instance);
  })
  .catch((error) => {
    console.error(error.message);
  });

//   PSPDFKit.load({
//   container: "#pspdfkit",
//   documentId: "[DOCUMENT ID FROM DOCUMENT ENGINE]",
//   serverUrl: "[DOCUMENT ENGINE URL]",
//   authPayload: { jwt: "[JWT]" },
//   instant: true
// })

function App() {
    // useEffect(() => {
    //     PSPDFKit.load({
    //         container: "#pspdfkit-container",
    //         document: "example.pdf",
    //         licenseKey: "YOUR_LICENSE_KEY"
    //     }).then(instance => {
    //         console.log("PSPDFKit loaded", instance);
    //     });
    // }, []);

    // return <div id="pspdfkit-container" style={{ width: "100%", height: "100vh" }} />;

    return <div id="pspdfkit" style="width: 100%; height: 100vh;"></div>
}

export default App;