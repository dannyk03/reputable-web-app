import React from 'react';
import { Box } from '@chakra-ui/react';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import MDPreviewT from '@uiw/react-markdown-preview';
import { useMediaQuery } from '@chakra-ui/react';

const MDPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
}) as unknown as typeof MDPreviewT;

export default function ExperimentCardContent({
  content,
  color,
}: {
  content: string;
  color?: string;
}) {
  const ref = React.useRef(null);
  const [height, setHeight] = React.useState(0);
  const [isMobile] = useMediaQuery('(max-width: 30em');
  console.log('isMobile', isMobile);
  React.useEffect(() => {
    const cHeight = ref.current.clientHeight;
    setHeight(cHeight);
  });
  return (
    <Box
      color={color ? color : 'gray.600'}
      fontSize="18px"
      lineHeight="28px"
      className="previewBox"
      fontWeight={400}
      position="relative"
      // maxH={300}
      // _after={
      //   height > 280 && {
      //     position: 'absolute',
      //     top: 0,
      //     left: 0,
      //     color: 'primary.600',
      //     content: '"↓ Read more"',
      //     display: 'flex',
      //     justifyContent: 'center',
      //     alignItems: 'end',
      //     cursor: 'pointer',
      //     fontSize: '16px',
      //     width: '100%',
      //     height: '100%',
      //   }
      // }
      mt={3}
      textOverflow="ellipsis"
      overflow="hidden"
      ref={ref}
    >
      <MDPreview
        style={{ fontSize: isMobile && '14px', whiteSpace: 'break-spaces' }}
        source={content}
      />
    </Box>
  );
}
