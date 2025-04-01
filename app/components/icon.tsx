import Image from 'next/image';

export default function MyIcon() {
  return (
    <Image
      src="/icons/my-icon.png"
      alt="My icon"
      width={32}
      height={32}
    />
  );
}