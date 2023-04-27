import classNames from "classnames";

type BackgroundProps = { readingMode?: boolean };

export const Background = ({ readingMode, ...props }: BackgroundProps) => (
  <div
    {...props}
    className={classNames(
      readingMode && "translate-y-1/4",
      "fixed -z-10 top-0 w-screen h-screen",
      "bg-scroll bg-cover bg-no-repeat",
      "bg-[url('/waves.min.svg')]",
      "transition-transform will-change-auto",
      "isolate"
    )}
  />
);
// styled.div<BackgroundProps>`
//   position: fixed;

//   z-index: -1;

//   top: 0;
//   width: 100vw;
//   height: 100vh;

//   background-attachment: scroll;
//   background-image: url("/waves.min.svg");
//   background-size: cover;
//   background-repeat: no-repeat;

//   transform: ${(props) => props.readingMode && "translateY(20%)"};
//   transition: transform 0.35s ease-in-out;
//   will-change: auto;

//   ${supportIsolate};

//   & ~ * {
//     z-index: 1;

//     ${supportIsolate};
//   }
// `;
