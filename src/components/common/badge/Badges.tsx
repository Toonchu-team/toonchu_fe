import React from "react";

const Badges = ({ badge }: { badge: string }) => {
  return (
    <div className="inline-block rounded-xl bg-bg-yellow-01 px-1.5 py-0.5 hover:bg-main-yellow sm:px-2 sm:py-1">
      <p className="text-[7px] text-main-text sm:text-xs">{badge}</p>
    </div>
  );
};

export default Badges;
