import React, { Component } from "react";
import { ContentState, EditorState, RawDraftContentState } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorProps } from "react-draft-wysiwyg";
import {
  Box,
  Collapse,
  Flex,
  HStack,
  VStack,
  Text,
  useDisclosure,
  WithCSSVar,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import styles from "./styles.module.css";
import ToolbarDropdown from "./components/ToolbarDropdown";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

interface RTEProps {
  onChange: (value: ContentState) => void;
  initialData?: RawDraftContentState;
  theme: WithCSSVar<any>;
}

interface RTEState {
  editorState: EditorState;
}

export default class RichTextEditor extends Component<RTEProps, RTEState> {
  state: { editorState: EditorState };
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });
    if (this.props.onChange)
      this.props.onChange(editorState.getCurrentContent());
  };

  render() {
    const blockTypeOptions = [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code",
    ];
    const fontSizes = [
      8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
    ];
    const { editorState } = this.state;
    const { theme } = this.props;
    return (
      <Box w="100%">
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          // toolbarOnFocus
          editorStyle={{
            border: `1px solid ${theme.colors.gray[200]}`,
            borderRadius: "12px",
            minHeight: "200px",
            padding: "5px 20px",
          }}
          editorClassName={styles.editorClass}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              "history",
            ],
            blockType: {
              component: (params) =>
                ToolbarDropdown({
                  ...params,
                  placeholder: "Normal",
                  options: blockTypeOptions,
                  w: "140px",
                  h: "25px",
                }),
            },
            fontSize: {
              component: (params) =>
                ToolbarDropdown({
                  ...params,
                  palceholder: 16,
                  options: fontSizes,
                  w: "50px",
                  h: "25px",
                }),
            },
          }}
        />
      </Box>
    );
  }
}
