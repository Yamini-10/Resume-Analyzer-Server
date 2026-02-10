import { Injectable } from '@nestjs/common';
import { extractTokens } from '../nlp/nlp.utils';

@Injectable()
export class AnalysisService {
  private extractExperience(text: string): number {
    const match = text.match(/(\d+)\s*(\+)?\s*(years?|yrs?)/i);
    return match ? Number(match[1]) : 0;
  }

  analyze(resume: string, jd: string) {
    const jdTokens = extractTokens(jd);
    const resumeTokens = extractTokens(resume);

    const matched: string[] = [];
    const missing: string[] = [];

    jdTokens.forEach((token) => {
      if (resumeTokens.has(token)) {
        matched.push(token);
      } else {
        missing.push(token);
      }
    });

    // ---- SCORING ----
    const skillRatio = jdTokens.size === 0 ? 0 : matched.length / jdTokens.size;

    let score = Math.round(skillRatio * 70);

    const resumeExp = this.extractExperience(resume);
    const jdExp = this.extractExperience(jd);

    if (jdExp > 0 && resumeExp >= jdExp) {
      score += 30;
    }

    score = Math.min(score, 100);

    return {
      matchScore: {
        score,
        matched,
        missing,
      },
      status:
        score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs improvement',
      suggestions: this.buildSuggestions(missing),
    };
  }

  private buildSuggestions(missing: string[]) {
    const tips: string[] = [];

    if (missing.length) {
      tips.push('Add missing technical keywords from the job description');
    }

    tips.push('Use exact role and technology names');
    tips.push('Mention experience duration clearly');

    return tips;
  }
}
