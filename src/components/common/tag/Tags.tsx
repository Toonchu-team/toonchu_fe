import clsx from "clsx";
import React from "react";

const Tags = ({ tag, col = false }: { tag: string; col?: boolean }) => {
  return (
    <div
      className={clsx(
        `border-1-main-grey inline-block cursor-pointer`,
        `${!col ? "rounded-lg px-1.5 py-1" : "px-1 py-0.5"}`,
        `rounded-md border hover:bg-bg-yellow-01`,
        `tablet:rounded-lg tablet:px-2 tablet:py-1`,
      )}
    >
      <p
        className={clsx(
          `${col && "text-[10px]"}`,
          `text-main-text tablet:text-base`,
        )}
      >
        #{tag}
      </p>
    </div>
  );
};

export default Tags;
