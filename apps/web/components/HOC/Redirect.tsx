import { useRouter } from "next/router";
import React, { useEffect } from "react";

/**
 * Simple Redirect component, mainly used to avoid hook usage,
 * when user needs to be redirected to another page. Instead, this component
 * can be used conditionally while rendering.
 */
export default function Redirect({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => {
    router.push(to);
  }, []);
  return <></>;
}
