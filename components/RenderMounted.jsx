"use client";
import { useEffect, useState } from "react";

export const RenderMounted = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadMount = () => {
      setMounted(true);
    };
    loadMount();
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
};
