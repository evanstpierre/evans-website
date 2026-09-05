export type WorkExperience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  icon: string;
  iconSize?: number;
  uncroppedIcon?: boolean;
};

// Add new roles here, ordered from newest to oldest.
export const experiences: WorkExperience[] = [
  {
    id: 'planitar-2026',
    role: 'Full Stack Developer',
    company: 'Planitar Inc',
    period: '2026–Present',
    description: 'Member of the web product team.',
    icon: '/icons/iguide.png',
    iconSize: 32,
    uncroppedIcon: true,
  },
  {
    id: 'searchspring-2022',
    role: 'Software Developer Intern',
    company: 'Searchspring',
    period: '2022',
    description: 'Worked on the client portal.',
    icon: '/icons/searchspring.png',
  },
  {
    id: 'marsh-mclennan-2021',
    role: 'Software Developer Intern',
    company: 'MarshMclennan',
    period: '2021',
    description:
      'Led morning scrum. Developed test for COVID-19 check-in application and built frontend component for the finance portal.',
    icon: '/icons/MMC.png',
  },
];
