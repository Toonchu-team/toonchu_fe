import clsx from "clsx";
import React from "react";

const Tags = ({ tag }: { tag: string }) => {
  return (
    <div
      className={clsx(
        `border-1-main-grey inline-block cursor-pointer px-1.5 py-1`,
        `h-[21px] rounded-md border hover:bg-bg-yellow-01`,
        `md:h-[25px] md:rounded-lg md:px-2 md:py-1`,
        `xl:h-[34px]`,
      )}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
    >
      <p
        className={clsx(
          `text-[10px] leading-none text-main-text md:text-xs xl:text-base`,
        )}
      >
        #{tag}
      </p>
    </div>
  );
};

export default Tags;
