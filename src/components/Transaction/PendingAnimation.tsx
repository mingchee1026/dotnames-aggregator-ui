import React from "react";

type Props = {};

function PendingAnimation({}: Props) {
  return (
    <div className="flex items-center justify-center">
      {" "}
      <span className="loading loading-ring w-[10em] bg-primary"></span>
    </div>
  );
}

export default PendingAnimation;
