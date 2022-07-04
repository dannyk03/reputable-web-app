import { useRouter } from 'next/router';
import Authenticated from '../../../components/HOC/Authenticated';
import Restricted from '../../../components/HOC/Restricted';
import ExperimentForm from '../../../containers/Experiments/Form';
import { useApiContext } from '../../../providers/ApiContext';
import { useExperiment } from '../../../_api/Experiments/queries/single';

export default function EditExperimentView() {
  const router = useRouter();
  const { authorized } = useApiContext();
  const { data, isLoading: isExperimentLoading } = useExperiment(
    router.query.id as string,
  );
  if (!authorized || isExperimentLoading) {
    return <></>;
  }
  return (
    <Authenticated>
      <Restricted
        condition={(user) => {
          return (
            user?.email === data.createdBy.email ||
            user?.app_metadata.role === 'admin'
          );
        }}
        errorMessage={'Can not edit this experiment!'}
      >
        <ExperimentForm defaultValues={data} />
      </Restricted>
    </Authenticated>
  );
}
