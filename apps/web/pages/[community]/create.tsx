import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CreateExperiment from "../../containers/Experiments/Create";
import { useApiContext } from "../../providers/ApiContext";

const id = "create-experiment-toast";

export default function CraeteExperimentView() {
  const { user } = useApiContext();
  const router = useRouter();
  const toast = useToast();
  const authorized = user?.app_metadata?.isApproved;
  useEffect(() => {
    if (!authorized && user) {
      router.push("/");
      if (!toast.isActive(id))
        toast({
          title: "Access Denied",
          description:
            "You have to be approved by an admin to create experiments",
          status: "warning",
          isClosable: true,
          variant: "top-accent",
        });
    }
  }, [router, toast, user, authorized]);
  if (!authorized) return <></>;
  return <CreateExperiment />;
}
