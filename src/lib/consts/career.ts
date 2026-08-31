import { Career } from '@/types/index';

export const careerData: Career[] = [
  {
    company: '(주) 클로버추얼패션 (CLO Virtual Fashion)',
    startDate: '2019.05',
    endDate: null,
    isGoing: true,
    tasks: [
      {
        service: '글로벌 결제 및 복합 구독 파이프라인 아키텍처 설계',
        period: '2020.04 – 2025.09',
        descriptions: [
          '글로벌 PG(Stripe, PayPal, Alipay) 연동 및 14일 무료 트라이얼 기반 오토빌링(Auto-billing) 결제 자동화 시스템 주도적 구축',
          '구독 일시중지, 1년 선결제 스위칭, 카드 정보 업데이트 등 복잡한 엣지 케이스(Edge-case)를 포함한 구독 라이프사이클 상태 제어 로직을 완벽히 구현하여 구독 취소율 13%p(35%→22%) 감소',
          '데이터 기반 트라이얼 CTA A/B 테스트(Evidently, GA4) 직접 기획 및 실행으로 전환율 6%p 상승 및 매출 $128K 증대 비즈니스 성과 창출',
          '1~99% 할인 로직 및 100% 쿠폰 적용 시 PG 모듈을 우회하는 다이렉트 라이선스 발급 예외 처리 로직 설계',
          '기업 스탠드얼론 라이선스의 한 달 자동 구독 플랜을 신규 도입하고 결제 시스템을 연동하여 소규모 스타트업 및 개인 사업자의 구매율 향상',
          'B2B 관리자 페이지(팀 콘솔)의 레거시 데이터 가공 방식을 전면 개편하고, 구독 취소 및 1년 선결제 스위칭 UI를 직접 설계하여 유저 매뉴얼 문의량 감소',
          '아카데믹(학교) 온라인 판매 전용 구매 플로우 및 등록/승인 페이지를 구축하여 오프라인 수동 판매 업무를 자동화하고 B2B 매출 증대 기여',
        ],
      },
      {
        service: '전사 서비스 통합 및 운영 자동화',
        period: '2024.01 – 2024.10',
        descriptions: [
          '5개 자사 서비스(Marvelous Designer, CLO3D, CLO-SET, CONNECT, JINNY) 통합 로그인(SSO) 시스템 프론트엔드 설계 및 학생 인증 절차 자동화 구현으로 연간 150시간의 운영 리소스 절감',
          'MailChimp API를 활용해 프론트엔드 서버(Node.js) 내 구독 제어 API를 직접 설계하고, 어드민과 100% 동기화되는 데이터 싱크 파이프라인 자동화 구현으로 이메일 오픈율 15% → 23%',
          '기업용 소프트웨어 UserPool 등록/관리 기능 구현으로 외부 사용자 접근성 및 관리 효율 개선',
        ],
      },
      {
        service: '디자인 시스템 아키텍처 설계 및 배포 파이프라인 구축',
        period: '2022.06 – 2022.10',
        descriptions: [
          'Storybook 기반 UI 컴포넌트 라이브러리 아키텍처를 주도적으로 설계하고 size·variant·fillType 등 prop 규칙을 정립하여 일관된 컴포넌트 인터페이스 구현',
          'Rollup 기반 npm 패키지로 배포하여 전사 서비스에서 공통 사용 가능하도록 구성',
          'GitHub Actions + Chromatic CI/CD 연동으로 PR마다 시각적 회귀 테스트 자동화 → 컴포넌트 재사용률 50% 향상 및 전사 협업 리딩',
        ],
      },
      {
        service: '프론트엔드 성능 최적화 및 다국어 인프라 자동화',
        period: '2025.01 – 2026.01',
        descriptions: [
          'Lambda@Edge와 S3를 활용한 이미지 최적화·리사이징 서버리스 아키텍처를 설계하여 요청 시점 동적 변환 구현 → 페이지 로딩 속도 40% 개선',
          '다국어 CMS 인프라 주도적 설계: Google Spreadsheet 데이터를 JSON으로 변환해 S3에 저장하는 파이프라인을 구축하여 CX팀 문구 수정 리드타임 90% 이상 단축',
          '4개 국어 대응 시 unicode-range를 활용한 폰트 분리 로직 및 서브셋(Subset) 폰트 적용으로 국가별 렌더링 가독성 보장 및 로딩 성능 최적화',
          'SSR 환경에서 다국어 로딩 시 발생하는 FOUC(깜빡임) 이슈를 완벽히 제거하여 사용자 경험(UX) 극대화',
          'Next.js·Node.js 메이저 버전 업그레이드 및 의존성 정리로 빌드 파이프라인 안정성과 보안 취약점 개선',
        ],
      },
      {
        service: '글로벌 웹사이트 전면 리뉴얼 및 CS 인프라 구축',
        period: '2019.07 – 2020.04',
        descriptions: [
          'ASP.NET(Razor) 레거시 환경을 Next.js 기반으로 전면 마이그레이션 리딩하여 글로벌 SEO 점수 20% 향상 및 빌드 속도 30% 단축 달성',
          '백엔드 데이터를 활용한 Invoice PDF(html2canvas) 추출 기능 및 글로벌 유저 대상 다운로드/인스톨러 관리 페이지 주도적 구현',
          'Zendesk 헬프센터 템플릿을 자사 UI/UX 가이드에 맞춰 직접 커스텀 개발하고, Node.js 마이그레이션 스크립트로 레거시 아티클을 데이터 손실 없이 이관',
          '웹 문의 폼과 Zendesk API 연동 및 SSO 통합으로 CS 운영 리소스 최적화 및 동적 FAQ 리스트 구축',
        ],
      },
      {
        service: '인터랙티브 웹 구현 및 데이터 기반 사용자 플로우 최적화',
        period: '2023.01 – 2024.12',
        descriptions: [
          '주문 확인 페이지의 레이아웃을 전면 리뉴얼하여 트라이얼 종료일 강조 UI를 제공, 의도치 않은 자동 결제 방지 및 환불 관련 CS 문의 20% 감소 성과 달성',
          '기존 테이블 형태의 Plan Page를 카드형 컴포넌트로 리팩터링하고, 할인 계산기 및 학생 전용 섹션을 추가 설계하여 유저의 합리적 구매 유도 및 사용성 대폭 개선',
          'Framer Code Override 및 GSAP ScrollTrigger를 적극 활용하여 릴리즈 메인 랜딩 페이지의 동적 인터랙션 및 라우트 싱크 구현',
        ],
      },
      {
        service: 'Marvelous Designer 3D 스토어 전면 구축 및 라이프사이클 관리',
        period: '2020.04 – 2022.08',
        descriptions: [
          'CONNECT 플랫폼 홍보 및 매출 증대를 목표로 Marvelous Designer 3D 에셋 스토어의 프론트엔드 아키텍처 전면 설계 및 구축 주도',
          '장바구니 추가, 바로 구매, 마이페이지 내 아이템 및 인보이스 리스트 등 E-commerce 핵심 결제 및 관리 플로우 완벽 구현',
          '서비스 기획 목적 달성 후, 레거시 스토어 Service Down(종료) 처리까지 참여하며 신규 구축부터 서비스 종료까지의 전체 제품 라이프사이클(A to Z) 주도적 운영 경험 입증',
        ],
      },
    ],
  },
  {
    company: '(주) 뉴럴비씨 (NeuralBC)',
    startDate: '2018.12',
    endDate: '2019.05',
    isGoing: false,
    tasks: [
      {
        service: 'Uzmex 마진거래소 및 AI 봇 대시보드 인터페이스 구현',
        period: '2018.12 – 2019.05',
        descriptions: [
          '비트코인 마진거래소(Uzmex)의 핵심 거래 UI 개발 및 WebSocket 기반 실시간 주문장(Orderbook) 데이터 동기화 구현',
          'AI 투자 봇 대시보드(Aipebot) 개발 시 Chart.js를 도입하여 Tradelog 데이터 시각화 및 트렌드 그래프 제공으로 데이터 기반 모니터링 환경 구축',
          '코인 리워드 플랫폼(3Piks) 마이페이지 내 자산 현황, 랭킹, 플레이 기록 등을 컴포넌트 단위로 모듈화하여 코드 재사용성 확보',
        ],
      },
    ],
  },
];

export const skills = {
  core: ['Javascript', 'Typescript', 'React', 'Next.js'],
  stateData: ['Mobx', 'TanStack Query'],
  stylingUI: ['Styled-components', 'TailwindCss', 'SCSS'],
  'AI 도구': ['Cursor', 'Claude', 'ChatGPT'],
  other: [
    'Zendesk',
    'Node.js',
    'Git',
    'AWS',
    'Figma',
    'Framer',
    'Chromatic',
    'Stripe/PayPal API',
    'Weglot',
  ],
};
