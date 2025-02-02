import React from "react";

const Badges = ({ badge }: { badge: string }) => {
  return (
    <div className="inline-block bg-bg-yellow-01 rounded-xl px-1.5 py-0.5 sm:px-2 sm:py-1">
      <p className="text-main-text text-[7px] sm:text-xs">{badge}</p>
    </div>
  );
};

export default Badges;
