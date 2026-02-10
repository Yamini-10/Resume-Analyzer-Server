import { Injectable } from '@nestjs/common';
import { removeStopwords } from 'stopword';

@Injectable()
export class NlpService {
  private extractKeywords(text: string): string[] {
    return Array.from(
      new Set(
        removeStopwords(text.toLowerCase().split(/\W+/))
          .filter(w => w.length > 2)
      )
    );
  }

  analyze(resume: string, jd: string) {
    const resumeKeywords = this.extractKeywords(resume);
    const jdKeywords = this.extractKeywords(jd);

    const matched = resumeKeywords.filter(k =>
      jdKeywords.includes(k)
    );

    const missing = jdKeywords.filter(k =>
      !resumeKeywords.includes(k)
    );

    const score = Math.round(
      (matched.length / jdKeywords.length) * 100
    );

    return {
      score: isNaN(score) ? 0 : score,
      matched,
      missing,
    };
  }
}
