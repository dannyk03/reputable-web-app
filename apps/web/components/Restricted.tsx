import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import Redirect from "./Redirect";
import { useApiContext } from "../providers/ApiContext";

const id = "restricted-view-toast";

export default function Restricted({
  bool,
  errorMessage = "Can not view this page.",
  redirectTo = "/",
  children,
}: React.PropsWithChildren<{
  bool: (user) => boolean;
  errorMessage?: string;
  redirectTo?: string;
}>) {
  const toast = useToast();
  const { user, isLoading } = useApiContext();
  console.log("renders restrictred");
  const shouldContinue = bool(user);
  useEffect(() => {
    if (!shouldContinue) {
      if (!toast.isActive(id))
        toast({
          title: "Access Denied",
          description: errorMessage,
          status: "error",
          isClosable: true,
          variant: "top-accent",
        });
    }
    () => {
      toast.close(id);
    };
  }, [bool, toast, isLoading]);
  if (isLoading || !user) return <></>;
  if (!shouldContinue) {
    return <Redirect to={redirectTo}></Redirect>;
  }
  return <>{children}</>;
}
