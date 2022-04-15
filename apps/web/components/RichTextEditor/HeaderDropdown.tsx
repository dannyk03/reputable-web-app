import { Select } from "@chakra-ui/react";
import { EditorState } from "draft-js";
import React from "react";

export interface HeaderDropdownProps {
  onToggle: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
  currentBlock: string;
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  currentBlock,
  onToggle,
  options = [],
}) => {
  console.log("renders");
  return (
    <Select
      value={currentBlock}
      onChange={(e) => onToggle(e.target.value)}
      placeholder="Header Levels"
    >
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </Select>
  );
};

export default React.memo(HeaderDropdown, (prevProps, nextProps) => {
  return prevProps.currentBlock !== nextProps.currentBlock;
});
