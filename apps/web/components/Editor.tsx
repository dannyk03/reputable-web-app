import { Box, Button } from "@chakra-ui/react";
import { Editor, EditorState, RichUtils } from "draft-js";
import React from "react";
import Card from "./Card";
import "draft-js/dist/Draft.css";
import { Map } from "immutable";

const blockRenderMap = Map({
  "header-two": {
    element: "h2",
  },
  unstyled: {
    element: "h2",
  },
});

export default class RichTextEditor extends React.Component<
  {},
  { editorState: EditorState }
> {
  onChange: (editorState: any) => void;
  editor: Editor;
  setEditor: (editor: Editor) => void;
  focusEditor: () => void;
  constructor(props: {}) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.setEditor = (editor: Editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return "handled";
    }

    return "not-handled";
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }

  _onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  _onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  render() {
    return (
      <Card w="100%" noShadow onClick={this.focusEditor}>
        <Box mb={2}>
          <Button onClick={this._onBoldClick.bind(this)}>Bold</Button>
          <Button onClick={this._onUnderlineClick.bind(this)}>Underline</Button>
          <Button onClick={this._onItalicClick.bind(this)}>Italic</Button>
        </Box>
        <Editor
          ref={this.setEditor}
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          blockRenderMap={blockRenderMap}
          placeholder="Start adding your experiment description here!"
        />
      </Card>
    );
  }
}
