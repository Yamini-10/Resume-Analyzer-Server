import { Module } from '@nestjs/common';
import { ResumeModule } from './resume/resume.module';
import { AnalysisModule } from './analysis/analysis.module';

@Module({
  imports: [ResumeModule, AnalysisModule],
})
export class AppModule {}
