import React from "react";
import { Text } from "@chakra-ui/react";
import type { ExperimentStatus } from "@reputable/types";

interface StatusTagProps {
  status: ExperimentStatus;
}

type statusToPropMapper = {
  [k in ExperimentStatus]?: { backgroundColor: string; text: string };
};

export default function StatusTag({
  status,
}: React.PropsWithChildren<StatusTagProps>) {
  const statusToProps: statusToPropMapper = {
    [ExperimentStatus.ACTIVE]: { backgroundColor: "green.400", text: "Active" },
    [ExperimentStatus.CLOSED]: { backgroundColor: "red.400", text: "Closed" },
    [ExperimentStatus.IN_DESIGN]: {
      backgroundColor: "pink.400",
      text: "In design",
    },
    [ExperimentStatus.RESULTS_PENDING]: {
      backgroundColor: "blue.400",
      text: "Results pending",
    },
  };
  return (
    <Text
      borderRadius="6px"
      px={2}
      color="white"
      backgroundColor={statusToProps[status].backgroundColor}
    >
      {statusToProps[status].text}
    </Text>
  );
}
