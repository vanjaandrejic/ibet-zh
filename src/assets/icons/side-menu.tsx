import { SVGProps } from "react";

const SideMenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1.4rem"
    height="1.4rem"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 12H0V14H12V12ZM12 4H0V6H12V4ZM0 10H18V8H0V10ZM0 18H18V16H0V18ZM0 0V2H18V0H0Z"
      fill="#697484"
    />
  </svg>
);
export default SideMenuIcon;
