type AboutSectionProps = {
  title: string;
  children: React.ReactNode;
};

export const AboutSection = ({ title, children }: AboutSectionProps) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-[2rem] font-semibold text-[#18181c]">{title}</h4>
    {children}
  </div>
);
