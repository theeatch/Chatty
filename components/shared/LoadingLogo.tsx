import React from "react";
import Image from "next/image";

type Props = {
  size?: number;
};

const LoadingLogo = ({ size = 100 }: Props) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Image
        src="/logo.svg"
        alt="logo"
        height={size}
        width={size}
        className="animate-pulse duration-800"
      />
    </div>
  );
};

export default LoadingLogo;
