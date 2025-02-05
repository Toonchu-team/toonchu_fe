import React from "react";

const Tags = ({ tag, col = false }: { tag: string; col: boolean }) => {
  return (
    <div
      className={`border-1-main-grey inline-block cursor-pointer ${!col ? "rounded-lg px-1.5 py-0.5" : "px-1 py-0.5"} rounded-md border hover:bg-bg-yellow-01 sm:rounded-lg sm:px-2 sm:py-1`}
    >
      <p className={`${col && "text-[10px]"} text-main-text sm:text-base`}>
        #{tag}
      </p>
    </div>
  );
};

export default Tags;
