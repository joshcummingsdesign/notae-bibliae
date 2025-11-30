"use client";
import { Autocomplete, styled, TextField } from "@mui/material";
import readingPlan from "./reading-plan.json";
import psalmPlan from "./psalm-plan.json";
import collectPlan from "./collect-plan.json";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  type?: "reading" | "psalm" | "collect";
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

export const ReadingPlan: React.FC<Props> = ({ id, type = "reading" }) => {
  if (type === "psalm") {
    const plan = psalmPlan.reduce<PlanItems>((acc, val, i) => {
      acc[String(i)] = val;
      return acc;
    }, {});

    return (
      <PlanPicker
        id={`${id}-psalm`}
        label="Current Psalm"
        type={type}
        plan={plan}
      />
    );
  }

  if (type === "collect") {
    const plan = collectPlan.reduce<PlanItems>((acc, val, i) => {
      acc[String(i)] = val;
      return acc;
    }, {});

    return (
      <PlanPicker id={`${id}-collect`} label="Day" type={type} plan={plan} />
    );
  }

  const plan = readingPlan.reduce<PlanItems>((acc, val, i) => {
    acc[String(i)] = val;
    return acc;
  }, {});

  return (
    <PlanPicker
      id={`${id}-reading`}
      label="Current Reading"
      type={type}
      plan={plan}
    />
  );
};

export const PlanPicker = ({
  id,
  label,
  type,
  plan,
}: {
  id: string;
  label: string;
  type?: "reading" | "psalm" | "collect";
  plan: PlanItems;
  books?: PlanItems;
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
        <Autocomplete<string, false, true> // string == index
          disablePortal
          value={String(index)}
          disableClearable={true}
          options={Object.keys(plan)}
          getOptionLabel={(option) => plan[option].title}
          onChange={(_, value) => handleChange(value)}
          renderInput={(params) => <TextInput {...params} label={label} />}
        />
      </Wrapper>
      {type === "psalm" && (
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
      )}
      {type === "collect" && <p>{plan[index].notes}</p>}
      {type === "reading" && (
        <TextWrap>
          <TextInput
            value={notes}
            label="Notes"
            multiline={true}
            minRows={4}
            onChange={handleNotesChange}
          />
        </TextWrap>
      )}
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
