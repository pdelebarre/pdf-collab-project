/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PdfViewerComponent from "./components/PdfViewerComponent";

const documentId = "7KPSS35T48XYSQBWNKMZ5YJM97";
const jwtServerUrl = "http://localhost:5002"; // Replace with your backend server URL

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJWT() {
      try {
        const response = await fetch(`${jwtServerUrl}/token/${documentId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Ensure the response is valid JSON
        console.log("JWT Data:", data); // Log the data to verify it's correct
        setToken(data.token);
      } catch (error) {
        console.error("Error fetching JWT:", error); // Log any error here
      } finally {
        setLoading(false); // Always set loading to false
      }
    }
    fetchJWT();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App" style={{ width: "100vw" }}>
      <div className="PDF-viewer">
        <PdfViewerComponent document={"document.pdf"} />
      </div>
    </div>
  );
}

export default App;
