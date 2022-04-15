import React, { Component } from "react";
import { ContentState, EditorState, RawDraftContentState } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorProps } from "react-draft-wysiwyg";
import { Box, WithCSSVar } from "@chakra-ui/react";

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
            fontSize: "",
          }}
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
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
          }}
        />
      </Box>
    );
  }
}
