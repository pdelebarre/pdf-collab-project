import jwt from "jsonwebtoken";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates a JWT with RS256 signing.
 * @param {string} privateKeyPath - Path to the private key file.
 * @param {string} documentId - The document ID.
 * @param {Object} options - Optional settings (e.g., expiresIn).
 * @returns {string} - The generated JWT.
 */
export function generateJwt(privateKeyPath, documentId, options = {}) {
  const privateKey = readFileSync(
    path.resolve(__dirname, privateKeyPath),
    "utf8"
  );

  const claims = {
    document_id: documentId,
    permissions: ["read-document", "write", "download"],
  };

  return jwt.sign(claims, privateKey, {
    algorithm: "RS256",
    expiresIn: options.expiresIn || "1h", // Default expiration: 1 hour
  });
}
