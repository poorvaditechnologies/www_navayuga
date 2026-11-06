import {
  AboutSection,
  FocusMarquee,
  GetInvolvedSection,
  HeroSection,
  JoinSection,
  MissionSection,
  ProgramsSection,
  StatementBand,
  TeamSection,
  TestimonialsSection,
} from '@/sections/home';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FocusMarquee />
      <AboutSection />
      <ProgramsSection />
      <MissionSection />
      <TestimonialsSection />
      <StatementBand />
      <GetInvolvedSection />
      <JoinSection />
      <TeamSection />
    </>
  );
}
