"use client";

import useWebtoonStore from "@/stores/webtoonStore";
import clsx from "clsx";
import React from "react";
import { Tag } from "../webtoonCard/type";
import { useRouter } from "next/navigation";

const Tags = ({ tag }: { tag: Tag }) => {
  const { selectedTags, toggleTag } = useWebtoonStore();
  const router = useRouter();

  return (
    <div
      className={clsx(
        `border-1-main-grey inline-block cursor-pointer bg-white px-1.5 py-1`,
        `h-[21px] rounded-md border hover:bg-bg-yellow-01`,
        `md:h-[25px] md:rounded-lg md:px-2 md:py-1`,
        `xl:h-[34px]`,
      )}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        toggleTag(tag.tag_name, tag.id); // selectedTags 업데이트 및 호출

        if (selectedTags.length === 0) {
          router.push("/tag-search");
        }
      }}
    >
      <p
        className={clsx(
          `text-[10px] leading-none text-main-text md:text-xs xl:text-base`,
        )}
      >
        #{tag.tag_name}
      </p>
    </div>
  );
};

export default Tags;
