"use client";
import { Autocomplete, styled, TextField } from "@mui/material";
import readingPlan from "./reading-plan.json";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  type?: "reading" | "psalm";
}

type PlanItems = { [index: string]: string };

export const ReadingPlan: React.FC<Props> = ({ id, type = "reading" }) => {
  if (type === "psalm") {
    const plan: PlanItems = Array.from(
      { length: 150 },
      (_, i) => `Psalm ${i + 1}`
    ).reduce<PlanItems>((acc, val, i) => {
      acc[String(i)] = val;
      return acc;
    }, {});

    return <PlanPicker id={`${id}-psalm`} label="Current Psalm" plan={plan} />;
  }

  const plan = readingPlan.reduce<PlanItems>((acc, val, i) => {
    acc[String(i)] = val;
    return acc;
  }, {});

  return (
    <PlanPicker id={`${id}-reading`} label="Current Reading" plan={plan} />
  );
};

export const PlanPicker = ({
  id,
  label,
  plan,
}: {
  id: string;
  label: string;
  plan: PlanItems;
}) => {
  const [index, setIndex] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    const index = localStorage.getItem(`${id}-plan-index`);
    const notes = localStorage.getItem(`${id}-plan-notes`);
    if (index) setIndex(Number(index));
    if (notes) setNotes(notes);
  }, []);

  const handleChange = (value: string) => {
    setIndex(Number(value));
    localStorage.setItem(`${id}-plan-index`, value);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
    localStorage.setItem(`${id}-plan-notes`, e.target.value);
  };

  return (
    <>
      <Wrapper>
        <Autocomplete<string, false, true> // string == index
          disablePortal
          value={String(index)}
          disableClearable={true}
          options={Object.keys(plan)}
          getOptionLabel={(option) => plan[option]}
          onChange={(_, value) => handleChange(value)}
          renderInput={(params) => <TextInput {...params} label={label} />}
        />
      </Wrapper>
      <TextWrap>
        <TextInput
          value={notes}
          label="Notes"
          multiline={true}
          minRows={4}
          onChange={handleNotesChange}
        />
      </TextWrap>
    </>
  );
};

const Wrapper = styled("div")(({ theme }) => ({
  marginTop: "30px",

  ".MuiPaper-root": {
    boxShadow: "none",
    borderRadius: 0,
    border: `1px solid ${theme.palette.brand.border}`,
    borderTop: "none",

    ".MuiAutocomplete-listbox": {
      maxHeight: "80vh",

      "li[aria-selected='true']": {
        backgroundColor: theme.palette.brand.hover,
      },
    },
  },
}));

const TextInput = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.brand.black,
    borderWidth: 1,
  },

  label: {
    color: `${theme.palette.brand.black} !important`,
  },

  fieldset: {
    border: `1px solid ${theme.palette.brand.border}`,
  },
}));

const TextWrap = styled("div")({
  marginTop: "20px",
});
