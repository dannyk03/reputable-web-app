import { pick } from "lodash";
import { useRouter } from "next/router";
import Authenticated from "../../../components/Authenticated";
import Restricted from "../../../components/Restricted";
import ExperimentForm from "../../../containers/Experiments/Form";
import { useExperiment } from "../../../_api/Experiments/queries/single";

export default function EditExperimentView() {
  const router = useRouter();
  const { data, isLoading: isExperimentLoading } = useExperiment(
    router.query.id as string
  );
  if (isExperimentLoading) {
    return <></>;
  }
  return (
    <Authenticated>
      <Restricted
        bool={(user) => {
          return user.email === data.createdBy.email;
        }}
        errorMessage={"Can not edit this experiment!"}
      >
        <ExperimentForm
          defaultValues={pick(data, [
            "description",
            "title",
            "experimentPeriod",
            "markers",
          ])}
        />
      </Restricted>
    </Authenticated>
  );
}
