import { Tooltip as TooltipBase } from "@mui/material";
import { typography } from "@/assets/styles";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<Props> = ({ title, children }) => (
  <TooltipBase
    title={title}
    slotProps={{
      tooltip: {
        sx: (theme) => ({
          ...theme.typography.body2,
          backgroundColor: theme.palette.brand.darkGrey,
        }),
      },
    }}
  >
    <span>{children}</span>
  </TooltipBase>
);
