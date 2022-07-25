import { useRouter } from 'next/router';
import UserExperiments from '../../containers/User/Experiments';
import { useUserById } from '../../_api/Users/queries';

export default function UserExperimentsPage() {
  const router = useRouter();
  const userId = decodeURIComponent(router.query?.userId as string);
  const { data, isLoading } = useUserById(userId);
  if (!userId || isLoading) {
    return <></>;
  }
  return <UserExperiments data={data} />;
}
