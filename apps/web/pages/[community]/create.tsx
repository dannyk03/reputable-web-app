import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CreateExperiment from "../../containers/Experiments/Create";

export default function CraeteExperimentView() {
  const { user, isAuthenticated } = useAuth0();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  });
  if (!isAuthenticated) return <></>;
  return <CreateExperiment />;
}
