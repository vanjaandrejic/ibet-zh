import { keyframes } from "@mui/styled-engine";

export const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export const fadeInOut = keyframes`
0% {
  opacity: 0;
}
50% {
  opacity: 1;
}
100% {
  opacity: 0;
}
`;
