import ExperimentSingleView from "../../containers/Experiments/Single";
import React from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useExperiment } from "../../_api/Experiments/queries/single";
import { truncate } from "lodash";
import { setCookies, getCookie } from "cookies-next";
import {
  Button,
  Modal,
  ModalBody,
  Text,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  HStack,
  VStack,
  Divider,
  Box,
} from "@chakra-ui/react";
import { PrimaryButton } from "../../components/Button";
import Image from "next/image";

export default function ExperimentSingle() {
  const router = useRouter();

  const [noMedicalAdviceAccepted, setNoMedicalAdviceAccepted] = React.useState(
    getCookie("no-medical-advice-accepted")
  );

  const acceptNoMedicalAdvice = () => {
    setCookies("no-medical-advice-accepted", true);
    setNoMedicalAdviceAccepted(true);
  };

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
      <Modal
        closeOnOverlayClick={false}
        size="4xl"
        isOpen={!noMedicalAdviceAccepted as boolean}
        onClose={() => setNoMedicalAdviceAccepted(true)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="primary.800">
            <VStack justify={"flex-start"} align="flex-start">
              <Text>We Do Not Provide Medical Advice</Text>
              <Divider pt={5} />
            </VStack>
          </ModalHeader>
          <ModalBody>
            <HStack justify={"center"} align="center">
              <VStack pr={8}>
                <Text color="gray.700">
                  We DO NOT provide medical advice, diagnosis or treatment
                  advice (collectively, “Medical Advice”).
                </Text>
                <Text color="gray.700">
                  All information and content provided through Reputable Health
                  including without limitation text, images, graphics, audio, or
                  video, is for informational purposes only and is not intended
                  to be Medical Advice or a substitute for Medical Advice.
                  Information and content provided through Reputable Health is
                  not intended to diagnose, treat, cure, or prevent any disease.
                  If you have any medical or health-related questions or if you
                  experience a medical emergency, please consult with a medical
                  professional as soon as possible. Reputable Health is not
                  responsible for any health or medical problems that may result
                  from your use of the Reputable platform. You agree that you
                  are voluntarily participating in the experiments on the
                  Reputable platform and do so at your own risk and to the
                  extent required or deemed necessary, you have consulted with
                  your healthcare professionals (or will continue to do so) with
                  regards to experiments available on the Reputable platform.
                </Text>
              </VStack>
              <Box>
                <Image
                  alt="No Medical Advice"
                  src="/icons/NoMedicalAdvice.png"
                  width={320}
                  layout="fixed"
                  height={300}
                />
              </Box>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <PrimaryButton
              w="100%"
              text="Accept"
              onClick={() => acceptNoMedicalAdvice()}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ExperimentSingleView
        experiment={data}
        isLoading={isLoading || isRefetching}
      />
    </>
  );
}
