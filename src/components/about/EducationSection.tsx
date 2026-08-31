import { educationAndEtc } from '@/lib/consts/education';

export const EducationSection = () => (
  <ul className="flex flex-col gap-[1.2rem]">
    {educationAndEtc.map((item) => (
      <li
        key={item.title}
        className="flex flex-wrap items-baseline gap-x-[1rem] text-[1.7rem] text-[#333]"
      >
        <span className="font-medium break-keep">{item.title}</span>
        <span className="text-[1.4rem] text-[#888]">{item.period}</span>
        {item.note && <span className="text-[1.4rem] text-[#888]">· {item.note}</span>}
      </li>
    ))}
  </ul>
);
