import { describe, it, expect } from "vitest";

// Input validation rules matching the /api/analyze route
function validateInput(file: unknown, fileSize?: number): { valid: boolean; error?: string } {
  if (!file) return { valid: false, error: "Arquivo PDF não fornecido." };

  const mimeType = typeof file === "object" && file !== null && "type" in file
    ? (file as { type: string }).type
    : "";

  if (mimeType !== "application/pdf") {
    return { valid: false, error: "Apenas arquivos PDF são aceitos." };
  }

  const size = fileSize ?? (typeof file === "object" && file !== null && "size" in file
    ? (file as { size: number }).size
    : 0);

  if (size > 50 * 1024 * 1024) {
    return { valid: false, error: "O arquivo excede o limite de 50 MB." };
  }

  return { valid: true };
}

describe("Input validation", () => {
  it("rejects when no file is provided", () => {
    const result = validateInput(null);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("não fornecido");
  });

  it("rejects non-PDF file types", () => {
    const fakeFile = { type: "image/jpeg", size: 1024 };
    const result = validateInput(fakeFile);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("PDF");
  });

  it("rejects files larger than 50 MB", () => {
    const bigFile = { type: "application/pdf", size: 51 * 1024 * 1024 };
    const result = validateInput(bigFile);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("50 MB");
  });

  it("accepts a valid PDF under 50 MB", () => {
    const validFile = { type: "application/pdf", size: 10 * 1024 * 1024 };
    const result = validateInput(validFile);
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("accepts a PDF at exactly 50 MB", () => {
    const borderFile = { type: "application/pdf", size: 50 * 1024 * 1024 };
    const result = validateInput(borderFile);
    expect(result.valid).toBe(true);
  });
});
