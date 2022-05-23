import ExperimentSingleView from "../../containers/Experiments/Single";
import React from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useExperiment } from "../../_api/Experiments/queries/single";
import { truncate } from "lodash";

export default function ExperimentSingle() {
  const router = useRouter();
  const { data, isLoading, isRefetching } = useExperiment(
    router.query.id as string
  );
  if (!router.query.id || isLoading) {
    return <></>;
  }
  return (
    <>
      <NextSeo
        openGraph={{
          title: data.title,
          description: truncate(data.description.goal, {
            length: 150,
            separator: "<br/>",
          }),
          url: `${window.location.origin}/experiments/${data._id}`,
          type: "article",
          article: {
            publishedTime: String(data.createdAt),
            modifiedTime: String(data.updatedAt),
            authors: [
              `${window.location.origin}/user/${encodeURIComponent(
                data.createdBy.email
              )}`,
            ],
          },
          images: [
            {
              url: `https://drive.google.com/uc?export=view&id=1QZBZvOpf0GV2BIhHTRokd7-EYFJpv22J`,
              width: 900,
              height: 965,
              alt: "Reputable Logo",
            },
          ],
        }}
      />
      <ExperimentSingleView
        experiment={data}
        isLoading={isLoading || isRefetching}
      />
    </>
  );
}
