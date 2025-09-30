import type * as React from 'react';

export const DiceD4Icon = (props: React.SVGProps<SVGSVGElement>) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <test>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fill="currentColor"
      d="M14.109,1.068c-.498-.679-1.267-1.068-2.109-1.068s-1.611,.39-2.109,1.068L.015,15.426l11.985,8.566,11.998-8.566L14.109,1.068Zm-.815,.579l9.323,13.536-10.117,7.223V1.114c.312,.093,.597,.265,.794,.533Zm-2.592,.007c.202-.273,.488-.445,.798-.538V22.406L1.396,15.184,10.702,1.654Z"
    />
  </svg>
);
