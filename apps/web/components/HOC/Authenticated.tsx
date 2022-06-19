import { useToast } from "@chakra-ui/react";
import React from "react";
import { useApiContext } from "../../providers/ApiContext";
import Redirect from "./Redirect";

interface AuthenticatedHOCProps {
  checkIsApproved?: boolean;
}

const not_approved_toast_id = "not-approved-toast";
const not_authenticated_toast_id = "not-authenticated-toast";

/**
 * Encapsulates authentication logic for children components. It would redirect
 * if user is not defined.
 *
 * Optionally, you can pass checkIsApproved prop to further check user's authorization
 * to perform an action.
 */
export default function Authenticated({
  checkIsApproved = false,
  children,
}: React.PropsWithChildren<AuthenticatedHOCProps>) {
  const toast = useToast();
  const { user, isLoading } = useApiContext();
  const authorized = user?.app_metadata?.isApproved || false;
  console.log("user", user);
  console.log("îsLoading", isLoading);
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
