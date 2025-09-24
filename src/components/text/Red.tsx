"use client";
import { styled } from "@mui/material";

interface Props {
  text: string;
}

/**
 * Red text.
 */
export const Red: React.FC<Props> = ({ text }) => <Text>{text}</Text>;

const Text = styled("span")(({ theme }) => ({
  color: theme.palette.brand.red,
}));
