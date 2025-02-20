import clsx from "clsx";
import React from "react";

const Badges = ({ badge }: { badge: string }) => {
  return (
    <div
      className={clsx(
        "inline-block rounded-xl bg-bg-yellow-01",
        "px-1.5 py-0.5",
        "md:px-2 md:py-1",
      )}
    >
      <p className="text-[7px] text-main-text md:text-[9px] lg:text-xs">
        {badge}
      </p>
    </div>
  );
};

export default Badges;
