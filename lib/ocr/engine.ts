import { createWorker } from "tesseract.js";

type RunOcrOptions = {
  timeoutMs?: number;
};

export async function runOcrOnImage(filePath: string, options: RunOcrOptions = {}) {
  const worker = await createWorker("vie+eng");
  const timeoutMs = options.timeoutMs ?? 45000;

  try {
    const result = await Promise.race([
      worker.recognize(filePath),
      new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error("OCR xử lý quá lâu. Vui lòng thử lại với ảnh nhỏ hơn hoặc rõ hơn."));
        }, timeoutMs);
      }),
    ]);

    return result.data.text ?? "";
  } finally {
    await worker.terminate();
  }
}
