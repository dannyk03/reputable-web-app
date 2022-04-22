import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery, QueryClient } from "react-query";

export interface ExperimentsParams {
  GET: {
    community: string;
  };
}

export const getExperiments = async (params: ExperimentsParams["GET"]) => {
  const { community } = params;
  return axios
    .get("/experiments")
    .then((resp: AxiosResponse<any>) => resp.data)
    .catch((err: AxiosError<any>) => err.response.data);
};

export const useExperiments = (params: ExperimentsParams["GET"]) => {
  const { community } = params;
  return useQuery<any>(["/experiments", { community }], () =>
    getExperiments(params)
  );
};

export const prefetchExperiments = async (params: ExperimentsParams["GET"]) => {
  const { community } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["/experiments", { community }], () =>
    getExperiments(params)
  );
  return queryClient;
};
