import { careerData } from '@/lib/consts/career';
import {
  ProfileHeader,
  AboutSection,
  SkillsSection,
  CareerSection,
  AboutIntro,
  Highlights,
  EducationSection,
} from '@/components/about';

export default function AboutPage() {
  return (
    <div className="career-container px-5 py-5">
      <div className="career-spec shadow-sm">
        <ProfileHeader />

        <AboutSection title="자기 소개">
          <AboutIntro />
          <Highlights />
        </AboutSection>

        <AboutSection title="기술 스택">
          <SkillsSection />
        </AboutSection>

        <AboutSection title="경력">
          <CareerSection careers={careerData} />
        </AboutSection>

        <AboutSection title="학력 및 기타">
          <EducationSection />
        </AboutSection>
      </div>
    </div>
  );
}
