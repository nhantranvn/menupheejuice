import type { MenuImportStatus } from "@prisma/client";

export type OcrPreviewResult = {
  status: MenuImportStatus;
  extractedText: string | null;
  rawOcrJson: Record<string, unknown> | null;
  errorMessage: string | null;
};

export async function runMockOcrPreview(fileName: string): Promise<OcrPreviewResult> {
  return {
    status: "OCR_PENDING",
    extractedText: `OCR chua duoc kich hoat cho file ${fileName}. Day la scaffold san sang de gan OCR engine o buoc sau.`,
    rawOcrJson: {
      provider: "stub",
      enabled: false,
      nextStep: "Gan OCR provider va map ket qua sang MenuCategory/MenuItem",
    },
    errorMessage: null,
  };
}

