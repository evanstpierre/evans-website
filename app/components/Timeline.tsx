import Image from 'next/image';
import { experiences } from '@/app/data/experiences';

export default function Timeline() {
  return (
    <ol className="w-full max-w-[850px]">
      {experiences.map((experience) => (
        <li
          key={experience.id}
          className="group relative grid grid-cols-[52px_minmax(0,1fr)] gap-x-4 sm:grid-cols-[84px_minmax(0,1fr)] sm:gap-x-2"
        >
          <div className="relative flex justify-center">
            <div
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-1/2 w-1 -translate-x-1/2 bg-[#F2E3DB]"
            />
            <div className="relative flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F2E3DB]">
              <Image
                src={experience.icon}
                alt={`${experience.company} logo`}
                width={experience.iconSize ?? 43}
                height={experience.iconSize ?? 43}
                className={experience.uncroppedIcon ? 'object-contain' : 'rounded-full object-contain'}
              />
            </div>
          </div>
          <div className="min-w-0 max-w-100 pb-10 opacity-75 group-last:pb-0 sm:min-h-35 sm:group-last:min-h-0">
            <h2>{experience.role} | {experience.company}</h2>
            <p>{experience.period}</p>
            {experience.description && (
              <p className="mt-1 sm:mx-3">{experience.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
