import { getGenAI, MODEL_NAME } from './config';
import { fileToGenerativePart } from './utils';

export class ImageProcessingService {
  private static instance: ImageProcessingService;

  private constructor() {}

  public static getInstance(): ImageProcessingService {
    if (!ImageProcessingService.instance) {
      ImageProcessingService.instance = new ImageProcessingService();
    }
    return ImageProcessingService.instance;
  }

  public async extractTextFromImage(file: File): Promise<string> {
    if (!this.validateImageFile(file)) {
      throw new Error('Invalid image file. Please upload a PNG, JPEG, or WEBP image under 10MB.');
    }

    try {
      const genAI = getGenAI();
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      const imagePart = await fileToGenerativePart(file);

      const prompt = `You are a forensic text analyzer assisting cyberbullying victims.
Please inspect this image (such as a chat screenshot, social media post, comment, or email) and extract ALL visible text.
Transcribe timestamps, user handles, message content, and platform identifiers accurately.
Format the output cleanly so it can be added to an incident report.
If no text is detected, reply with "[No text detected in this image]".`;

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('[ImageProcessingService Error]:', error);
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Unable to process image. Please try typing the message directly.'
      );
    }
  }

  public validateImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    return validTypes.includes(file.type.toLowerCase()) && file.size <= maxSize;
  }
}

export const imageProcessingService = ImageProcessingService.getInstance();
