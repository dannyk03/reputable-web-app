import React, { Component } from "react";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor as IEditor } from "react-draft-wysiwyg";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
) as unknown as IEditor;

export default class RichTextEditor extends Component {
  state: { editorState: EditorState };
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.handleContent(convertToRaw(editorState.getCurrentContent()));
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
        // toolbarOnFocus
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
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
          history: { inDropdown: true },
        }}
      />
    );
  }
}
