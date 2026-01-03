"use client";
import { useEffect, useState } from "react";
import { Autocomplete, styled, TextField } from "@mui/material";
import psalms from "./psalms.json";

interface Props {
  id: string;
}

interface PlanItem {
  title: string;
  description?: string;
  book?: string;
  attribution?: string;
  period?: string;
  collections?: string[];
  notes?: string;
}

type PlanItems = { [index: string]: PlanItem };

export const PsalmsOfTheDay: React.FC<Props> = ({ id }) => {
  const plan = psalms.reduce<PlanItems>((acc, val, i) => {
    acc[String(i)] = val;
    return acc;
  }, {});

  return <LessonPicker id={`${id}-psalm`} label="Current Psalm" plan={plan} />;
};

export const LessonPicker = ({
  id,
  label,
  plan,
}: {
  id: string;
  label: string;
  plan: PlanItems;
}) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const index = localStorage.getItem(`${id}-plan-index`);
    if (index) setIndex(Number(index));
  }, []);

  const handleChange = (value: string) => {
    setIndex(Number(value));
    localStorage.setItem(`${id}-plan-index`, value);
  };

  const getPsalmNotes = (): string => {
    let output = [];
    const p = plan[index];

    if (p.book) {
      output.push(p.book);
    }

    let t = p.title;

    if (p.attribution) {
      t += `— ${p.attribution}`;
    }

    if (p.description) {
      t += `— ${p.description}`;
    }

    output.push(t);

    if (p.collections && p.collections.length) {
      output.push("Included in " + p.collections.join(", "));
    }

    if (p.notes) {
      output.push(p.notes);
    }

    if (p.period) {
      output.push(`Collected in the time of ${p.period}`);
    }

    return output.join("\n");
  };

  return (
    <>
      <Wrapper>
        <Autocomplete<string, false, true>
          disablePortal
          value={String(index)}
          disableClearable={true}
          options={Object.keys(plan)}
          getOptionLabel={(option) => plan[option].title}
          onChange={(_, value) => handleChange(value)}
          renderInput={(params) => <TextInput {...params} label={label} />}
        />
      </Wrapper>
      <TextWrap>
        <TextInput
          value={getPsalmNotes()}
          label="Notes"
          multiline={true}
          minRows={4}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
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
