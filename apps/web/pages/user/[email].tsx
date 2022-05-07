import { useRouter } from "next/router";
import UserExperiments from "../../containers/User/Experiments";
import { useUserByEmail } from "../../_api/Users/queries";

export default function UserExperimentsPage() {
  const router = useRouter();
  const email = decodeURIComponent(router.query?.email as string);
  const { data, isLoading } = useUserByEmail(email);
  if (!email || isLoading) {
    return <></>;
  }
  return <UserExperiments data={data} />;
}
