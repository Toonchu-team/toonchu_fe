import React from "react";

const Tags = ({ tag }: { tag: string }) => {
  return (
    <div className="border-1-main-grey inline-block cursor-pointer rounded-md border px-1.5 py-0.5 hover:bg-bg-yellow-01 sm:rounded-lg sm:px-2 sm:py-1">
      <p className="text-[8px] text-main-text sm:text-base">#{tag}</p>
    </div>
  );
};

export default Tags;
