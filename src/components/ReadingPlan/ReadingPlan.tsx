"use client";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Autocomplete, styled, TextField } from "@mui/material";
import readingPlan from "./reading-plan.json";
import psalmPlan from "./psalm-plan.json";
import collectPlan from "./collect-plan.json";
import { useEffect, useState } from "react";
import { getCalendarData } from "../Calendar/getCalendarData";
import { getFirstSundayOfAdvent, getLiturgicalYear } from "../Calendar/lib";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface Props {
  id: string;
  type?: "reading" | "psalm" | "collect";
  hour?: "matins" | "evensong";
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

export const ReadingPlan: React.FC<Props> = ({
  id,
  type = "reading",
  hour,
}) => {
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

    const today = dayjs();
    const calendarYear = today.year();
    const firstSundayOfAdvent = getFirstSundayOfAdvent(calendarYear);
    const liturgicalYear = getLiturgicalYear(
      today,
      calendarYear,
      firstSundayOfAdvent
    );
    const calendarData = getCalendarData(
      firstSundayOfAdvent,
      calendarYear,
      liturgicalYear
    );

    const days = Object.values(calendarData).reduce((acc, val) => {
      acc = [...acc, ...val];
      return acc;
    }, []);

    const planItems = Object.values(plan);

    let currentPlan = planItems[0];
    for (let i = 0; i < days.length; i++) {
      const item = days[i];
      const parts = item.split("—");
      const firstPart = parts[1];
      const secondPart = parts[2] || null;

      let date = dayjs(`${parts[0]}, ${liturgicalYear}`);
      if (
        date.isSameOrAfter(dayjs(firstSundayOfAdvent.add(1, "year"), "day"))
      ) {
        date = date.subtract(1, "year");
      }

      if (date.isSameOrBefore(today, "day")) {
        const p = planItems.filter((item) => {
          const re = new RegExp(`^${item.title}`);
          const cleanPart = firstPart
            .trim()
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
          return re.test(cleanPart);
        });
        if (p.length) {
          currentPlan = p[0];
        }

        if (hour === "evensong" && secondPart) {
          const p = planItems.filter((item) => {
            const re = new RegExp(`^${item.title}`);
            const cleanPart = secondPart
              .trim()
              .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
            return re.test(cleanPart);
          });
          if (p.length) {
            currentPlan = p[0];
          }
        }
      }
    }

    return <CollectViewer plan={currentPlan} />;
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
  type?: "reading" | "psalm";
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

export const CollectViewer = ({ plan }: { plan: PlanItem }) => {
  return (
    <>
      <p>
        <strong>Collect for {plan.title}</strong>
      </p>
      <p>{plan.notes}</p>
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
