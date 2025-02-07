import React from "react";

const Tags = ({ tag, col = false }: { tag: string; col: boolean }) => {
  return (
    <div
      className={`border-1-main-grey inline-block cursor-pointer ${!col ? "rounded-lg px-1.5 py-0.5" : "px-1 py-0.5"} tablet:rounded-lg tablet:px-2 tablet:py-1 rounded-md border hover:bg-bg-yellow-01`}
    >
      <p className={`${col && "text-[10px]"} tablet:text-base text-main-text`}>
        #{tag}
      </p>
    </div>
  );
};

export default Tags;
