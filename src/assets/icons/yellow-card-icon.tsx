import { SVGProps } from "react";
const YellowCardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 5 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.62939e-05 5.5895C7.62939e-05 5.96493 0.350626 6.26929 0.783043 6.26929H3.60172C4.03415 6.26929 4.38469 5.96493 4.38469 5.5895V1.10292C4.38469 0.72748 4.03414 0.423134 3.60172 0.423134H0.783043C0.350626 0.423134 7.62939e-05 0.72748 7.62939e-05 1.10292V5.5895Z"
      //   fill="#FFBA33"
      fill={props.fill}
    />
  </svg>
);
export default YellowCardIcon;
