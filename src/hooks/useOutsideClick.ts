import { RefObject, useEffect } from "react";

interface UseOutsideClickProps<T extends HTMLElement> {
  ref: RefObject<T>;
  callback: () => void;
}

function useOutsideClick<T extends HTMLElement>({
  ref,
  callback,
}: UseOutsideClickProps<T>): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default useOutsideClick;
