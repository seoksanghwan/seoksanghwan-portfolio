import { highlights } from '@/lib/consts/highlights';

export const Highlights = () => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-[3rem] gap-y-[1.8rem] mt-[2.4rem]">
    {highlights.map((item) => (
      <li key={item.metric} className="flex flex-col gap-[0.4rem]">
        <span className="text-[2.2rem] font-bold text-[#18181c] break-keep">{item.metric}</span>
        <span className="text-[1.5rem] text-[#777] break-keep">{item.description}</span>
      </li>
    ))}
  </ul>
);
