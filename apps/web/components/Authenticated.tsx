import { useToast } from "@chakra-ui/react";
import React from "react";
import { useApiContext } from "../providers/ApiContext";
import Redirect from "./Redirect";

interface AuthenticatedHOC_Props {
  checkIsApproved?: boolean;
}

const not_approved_toast_id = "not-approved-toast";
const not_authenticated_toast_id = "not-authenticated-toast";

export default function Authenticated({
  checkIsApproved,
  children,
}: React.PropsWithChildren<AuthenticatedHOC_Props>) {
  const toast = useToast();
  const { user, isLoading } = useApiContext();
  const authorized = user?.app_metadata?.isApproved || false;
  if (isLoading) return <></>;
  if (user === undefined) {
    if (!toast.isActive(not_authenticated_toast_id))
      toast({
        title: "Access Denied",
        description: "Please log-in to view this page.",
        status: "error",
        isClosable: true,
        variant: "top-accent",
      });
    return <Redirect to="/" />;
  }
  if (!authorized && checkIsApproved) {
    if (!toast.isActive(not_approved_toast_id))
      toast({
        title: "Access Denied",
        description:
          "You should be approved by an admin to perform this action",
        status: "error",
        isClosable: true,
        variant: "top-accent",
      });
    return <Redirect to="/" />;
  }
  return <>{children}</>;
}
