import "./assets/pspdfkit.js";
import { generateJwt } from "../nodebe/jwtGenerator.js"; // ✅ Ensure correct import

const privateKeyPath = "private.pem";
const documentId = "7KPSS35T48XYSQBWNKMZ5YJM97";

// Generate the JWT
const token = generateJwt(privateKeyPath, documentId);

console.log("JWT:", token);

// Mention the location of `pspdfkit-lib` directory to look for library assets.
const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

async function loadPSPDFKit() {
  try {
    PSPDFKit.load({
      container: "#pspdfkit",
      documentId: documentId,
      serverUrl: "http://localhost:5001",
      authPayload: { jwt: token },
      instant: true,
    })
      .then(function (instance) {
        console.log("PSPDFKit loaded", instance);
      })
      .catch(function (error) {
        console.error(error.message);
      });
  } catch (error) {
    console.error("Error loading PSPDFKit:", error);
  }
}

loadPSPDFKit();
