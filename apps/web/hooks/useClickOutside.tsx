import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useClickOutside(ref, onClickOutside: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

/**
 * Component that alerts if you click outside of it
 */
export function ClickOutside({
  onClickOutside,
  children,
}: React.PropsWithChildren<{ onClickOutside: () => void }>) {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, onClickOutside);

  return <div ref={wrapperRef}>{children}</div>;
}
