import React from "react";

const Badges = ({ badge }: { badge: string }) => {
  return (
    <div className="tablet:px-2 tablet:py-1 inline-block rounded-xl bg-bg-yellow-01 px-1.5 py-0.5">
      <p className="tablet:text-xs text-[7px] text-main-text">{badge}</p>
    </div>
  );
};

export default Badges;
