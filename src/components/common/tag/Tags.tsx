import React from "react";

const Tags = ({ tag }: { tag: string }) => {
  return (
    <div className="inline-block border border-1-main-grey rounded-md sm:rounded-lg px-1.5 py-0.5 sm:px-2 sm:py-1">
      <p className="text-main-text text-[8px] sm:text-base">#{tag}</p>
    </div>
  );
};

export default Tags;
