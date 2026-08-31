import { Career, CareerTask } from '@/types';
import { getDuration } from '@/lib/getDuration';

const introText =
  '"효율적인 시스템으로 팀의 생산성을 높이고, 기술로 서비스의 가치를 더하는 개발자"';

const aboutParagraphs = [
  '저는 명확한 책임과 의도가 담긴 설계를 지향합니다. 퍼블리셔 출신의 섬세한 UI 구현력에 프론트엔드 기술력을 더해, 디자이너와 개발자 모두가 만족하는 협업 구조를 만들어왔습니다.',
  '특히 글로벌 구독 결제 파이프라인을 5년간 설계·운영하며 구독 취소율을 35%에서 22%로 낮췄고, 데이터 기반 A/B 테스트로 전환율 6%p 상승과 매출 $128K를 만들었습니다. 디자인 시스템을 주도적으로 구축하여 컴포넌트 재사용률을 50%까지 끌어올렸으며, 개인의 기술적 성장이 팀 전체의 시너지로 이어지는 선순환 구조를 만드는 데 집중합니다.',
  'Claude·Cursor 등 AI 도구를 실무에 적극 활용합니다. 단순 코드 생성을 넘어 결제 로직 같은 복잡한 도메인의 엣지 케이스 검토와 코드 리뷰에 활용하며, 팀의 개발 생산성을 높이는 방법을 계속 실험하고 있습니다.',
];

function CareerTaskItem({ task }: { task: CareerTask }) {
  return (
    <li className="mb-[1.5rem]">
      <p className="text-[2rem] font-bold mb-[0.8rem] relative pl-[1.2rem] before:content-['•'] before:absolute before:left-[-5px] flex flex-wrap items-baseline gap-x-[1.2rem]">
        <span>{task.service}</span>
        <span className="text-[1.3rem] font-normal text-[#888]">{task.period}</span>
      </p>
      <ul className="pl-[2.5rem] flex flex-col gap-[5px]">
        {task.descriptions.map((desc, dIdx) => (
          <li
            key={dIdx}
            className="text-[2rem] leading-[1.6] text-[#444] relative before:content-['◦'] before:absolute before:left-[-20px] before:text-[#888] break-keep"
          >
            {desc}
          </li>
        ))}
      </ul>
    </li>
  );
}

function CareerCard({ career }: { career: Career }) {
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <div>
        <div className="text-[2.4rem] font-bold text-[#111]">{career.company}</div>
        <div className="text-[1.5rem] text-[#555]">
          {career.startDate} ~{' '}
          {career.isGoing ? (
            <span className="text-[#00c471] font-semibold ml-1">재직 중</span>
          ) : (
            career.endDate
          )}
          <span className="text-[#666] ml-[8px]">
            ({getDuration(career.startDate, career.endDate, career.isGoing)})
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[1rem]">
        <ul className="list-none p-0">
          {career.tasks.map((task, tIdx) => (
            <CareerTaskItem key={tIdx} task={task} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export const AboutIntro = () => (
  <div className="flex flex-col gap-[10px] text-[2rem] leading-[1.6] text-[#18181c] break-keep">
    <p>
      <b>{introText}</b>
    </p>
    {aboutParagraphs.map((p, i) => (
      <p key={i}>{p}</p>
    ))}
  </div>
);

type CareerSectionProps = {
  careers: Career[];
};

export const CareerSection = ({ careers }: CareerSectionProps) => (
  <div className="flex flex-col gap-[30px]">
    {careers.map((career, idx) => (
      <CareerCard key={idx} career={career} />
    ))}
  </div>
);
