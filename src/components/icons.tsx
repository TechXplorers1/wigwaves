import type { SVGProps } from 'react';

export function WigIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 20a1 1 0 0 0 1-1v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2a1 1 0 0 0 1 1" />
      <path d="M4.5 15c0-4.97 4.03-9 9-9s9 4.03 9 9" />
      <path d="M12 15s-1-4 2-4" />
      <path d="M12 15s1-4-2-4" />
      <path d="M8 12c0-2 2-3 4-3s4 1 4 3" />
    </svg>
  );
}
