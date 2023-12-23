"use client";

import { useCallback, useEffect, useState } from "react";

const useScroll = (threshold: number) => {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.screenY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // also check on first load
  useEffect(() => {
    onScroll();
  }, [onScroll]);

  return scrolled;
};

export default useScroll;
