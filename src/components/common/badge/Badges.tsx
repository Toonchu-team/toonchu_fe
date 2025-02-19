import clsx from "clsx";
import React from "react";

const Badges = ({ badge }: { badge: string }) => {
  return (
    <div
      className={clsx(
        "inline-block rounded-xl bg-bg-yellow-01",
        "px-1.5 py-0.5",
        "tablet:px-2 tablet:py-1",
      )}
    >
      <p className="text-[7px] text-main-text tablet:text-xs">{badge}</p>
    </div>
  );
};

export default Badges;
