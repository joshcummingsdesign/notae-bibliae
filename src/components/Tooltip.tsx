import { Tooltip as TooltipBase } from "@mui/material";

interface Props {
  title: string | React.ReactNode;
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
          color: theme.palette.brand.white,
        }),
      },
    }}
  >
    <span>{children}</span>
  </TooltipBase>
);
