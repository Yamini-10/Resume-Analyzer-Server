import { Injectable, BadRequestException } from '@nestjs/common';
import * as mammoth from 'mammoth';

const pdfParse = require('pdf-parse');

@Injectable()
export class ResumeService {
  async parseResume(file: any) {
    if (!file) {
      throw new BadRequestException('File not provided');
    }

    if (file.mimetype === 'application/pdf') {
      const data = await pdfParse(file.buffer);
      console.log('Data', data.text)
      return { text: data.text };
    }

    if (
      file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const data = await mammoth.extractRawText({
        buffer: file.buffer,
      });
      return { text: data.value };
    }

    throw new BadRequestException('Unsupported file format');
  }
}
