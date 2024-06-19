import { SVGProps } from "react";
const ClubLogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="3rem"
    height="3rem"
    viewBox="0 0 379 478"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27.6163 78.4583L2.00827 229.427C-16.1533 336.602 92.2875 400.401 189.092 477.864C285.896 400.401 394.349 336.602 376.175 229.427L350.579 78.4583L263.347 52.5062L272.551 14.7332L189.092 0L105.644 14.7332L114.848 52.5062L27.6163 78.4583Z"
      // fill={"#FFC211"}
      fill={props.fill}
    />
  </svg>
);
export default ClubLogoIcon;
