import { Box, ChakraProps } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import ExperimentCard, { ExperimentCardProps } from "./ExperimentCard";

interface Props extends ChakraProps {
  experiments: ExperimentCardProps["experiment"][];
}

/** This component would make a call to useExperiment when cursor-based pagination is implemented */

export default function ExperimentCardsWithScroll({
  experiments,
  ...restProps
}: Props) {
  const perPage = 10;
  const [expToRender, setExpToRender] = React.useState(
    experiments.slice(0, perPage)
  );
  const loadFunc = (page) => {
    setExpToRender(experiments.slice(perPage * page, perPage * (page + 1)));
  };
  return (
    <Box {...restProps}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true || false}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <Box>
          {expToRender.map((experiment, idx) => (
            <ExperimentCard
              mt={6}
              key={`experiment_${idx}`}
              experiment={experiment}
            />
          ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
}
