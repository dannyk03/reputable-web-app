import React from "react";
import { Box } from "@chakra-ui/react";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import MDPreviewT from "@uiw/react-markdown-preview";

const MDPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
}) as unknown as typeof MDPreviewT;

export default function ExperimentCardContent({
  content,
}: {
  content: string;
}) {
  const ref = React.useRef(null);
  const [height, setHeight] = React.useState(0);
  React.useEffect(() => {
    const cHeight = ref.current.clientHeight;
    setHeight(cHeight);
  });
  return (
    <Box
      color="gray.600"
      fontSize="18px"
      lineHeight="28px"
      className="previewBox"
      fontWeight={400}
      position="relative"
      maxH={300}
      _after={
        height > 280 && {
          position: "absolute",
          top: 0,
          left: 0,
          color: "primary.600",
          content: '"↓ Read more"',
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          cursor: "pointer",
          fontSize: "16px",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(2,0,36,0) 65%, rgba(255,255,255,1) 100%);",
        }
      }
      mt={3}
      textOverflow="ellipsis"
      overflow="hidden"
      ref={ref}
    >
      <MDPreview source={content} />
    </Box>
  );
}
