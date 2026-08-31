/**
 * 경력 기간을 "X년 Y개월" 형식으로 계산하는 함수
 * @param startDateStr - 시작일 (예: "2019.05")
 * @param endDateStr - 종료일 (예: "2024.12" 또는 null)
 * @param isGoing - 현재 재직 여부
 * @returns - "X년 Y개월" 형태의 문자열
 */
export const getDuration = (
  startDateStr: string,
  endDateStr: string | null,
  isGoing: boolean,
): string => {
  if (!startDateStr) return '';

  // "2024.5" 또는 "2019.05" 분리
  const [sYear, sMonth] = startDateStr.split('.').map(Number);
  const start = new Date(sYear, sMonth - 1);

  let end: Date;
  // 재직 중일 때 end는 아직 끝나지 않은 이번 달의 특정 하루(오늘)이므로,
  // 퇴사월까지 포함해 세는 +1 보정을 적용하면 안 된다.
  let inclusive: boolean;
  if (isGoing) {
    end = new Date();
    inclusive = false;
  } else if (endDateStr) {
    const [eYear, eMonth] = endDateStr.split('.').map(Number);
    end = new Date(eYear, eMonth - 1);
    inclusive = true;
  } else {
    return '';
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (inclusive) {
    // 입사월과 퇴사월을 모두 포함하기 위해 1개월 추가
    months += 1;

    if (months >= 12) {
      years += 1;
      months -= 12;
    }
  }

  const yearText = years > 0 ? `${years}년 ` : '';
  const monthText = months > 0 ? `${months}개월` : '';

  return `${yearText}${monthText}`.trim() || '1개월 미만';
};

export default getDuration;
