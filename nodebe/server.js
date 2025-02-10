import express from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5002;

// Allow CORS for frontend requests
import cors from "cors";
app.use(cors());

// Function to generate JWT
function generateJwt(documentId) {
  const privateKey = fs.readFileSync(path.resolve("private.pem"), "utf8");

  const claims = {
    document_id: documentId,
    permissions: ["read-document", "write", "download"],
  };

  return jwt.sign(claims, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });
}

// API Endpoint to get JWT
app.get("/token/:documentId", (req, res) => {
    const { documentId } = req.params;
    
    console.log('getting token for doc :>> ', documentId);

  if (!documentId) {
    return res.status(400).json({ error: "Document ID is required" });
  }

  try {
    const token = generateJwt(documentId);
    console.log("Generated Token:", token); // Log the generated token
    res.json({ token });
  } catch (error) {
    console.error("Error generating token:", error); // Log errors in generating token
    res.status(500).json({ error: "Failed to generate JWT" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ JWT server running on http://localhost:${PORT}`);
});
