import { FC } from "react";
import {
  Autocomplete,
  styled,
  TextField as TextFieldBase,
} from "@mui/material";
import { FamilyNode } from "@/lib/types/FamilyTree";
import { CircularProgress } from "@mui/material";
interface Props {
  className?: string;
  data: FamilyNode[];
  value: FamilyNode | null;
  inputValue: string;
  isLoading?: boolean;
  onSearchChange: (node: FamilyNode) => void;
  onSearchInputChange: (value: string) => void;
  onClearSearchInput: () => void;
}

export const SearchInput: FC<Props> = ({
  className,
  data,
  value,
  inputValue,
  isLoading,
  onSearchChange,
  onSearchInputChange,
  onClearSearchInput,
}) => {
  return (
    <Autocomplete<FamilyNode>
      id="btr-search"
      className={className}
      value={value}
      inputValue={inputValue}
      loading={isLoading}
      onInputChange={(_, v) => onSearchInputChange(v)}
      getOptionLabel={(d) => d.name}
      onChange={(_, v, reason) => {
        if (v) {
          const d: any = { ...v };
          delete d.label;
          onSearchChange(d);
        }
        if (reason === "clear") {
          onClearSearchInput();
        }
      }}
      renderOption={({ key, ...props }, d) => (
        <li key={d.id} {...props}>
          {d.name}
        </li>
      )}
      filterOptions={(options, { inputValue }) =>
        options.filter(
          (option) =>
            option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            option.alt_names?.some((altName) =>
              altName.toLowerCase().includes(inputValue.toLowerCase())
            )
        )
      }
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={data.map((d) => ({ ...d, label: `${d.id}: ${d.name}` }))}
      sx={{ width: 300 }}
      renderInput={(params: any) => (
        <TextField
          {...params}
          label="Search"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
};

const TextField = styled(TextFieldBase)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    background: theme.palette.brand.white,

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.brand.black,
      borderWidth: 1,
    },
  },

  label: {
    color: `${theme.palette.brand.black} !important`,
  },
}));
