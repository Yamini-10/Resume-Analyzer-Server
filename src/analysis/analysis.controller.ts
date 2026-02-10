import { Controller, Post, Body } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post()
  analyzeResume(
    @Body('resumeText') resumeText: string,
    @Body('jobDescription') jobDescription: string,
  ) {
    return this.analysisService.analyze(resumeText, jobDescription);
  }
}
