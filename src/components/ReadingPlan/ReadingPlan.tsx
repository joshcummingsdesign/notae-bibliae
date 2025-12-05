"use client";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Autocomplete, styled, TextField } from "@mui/material";
import readingPlan from "./reading-plan.json";
import psalmPlan from "./psalm-plan.json";
import collectPlan from "./collect-plan.json";
import { Fragment, useEffect, useState } from "react";
import { getCalendarData } from "../Calendar/getCalendarData";
import { CalendarItem } from "../Calendar/interfaces";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

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

    const today = dayjs();
    const { groupedCalendarData } = getCalendarData(today);

    const planItems = Object.values(plan);

    const mapCalendarItemsToPlanItems = (
      items: CalendarItem[],
      type: "primary" | "secondary" = "primary"
    ): PlanItem[] => {
      let filterFn = (a: CalendarItem) => a.rank < 4;
      if (type === "secondary") {
        filterFn = (a: CalendarItem) => a.rank >= 4;
      }

      let highestRanked = items
        .filter(filterFn)
        .sort((a, b) => a.rank - b.rank);

      if (highestRanked.length) {
        const p = planItems.filter((pi) => {
          const re = new RegExp(
            `^${pi.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
          );
          const t = highestRanked.map((hr) => ({
            ...hr,
            title: hr.title.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
          }));
          return t.some((r) => re.test(r.title));
        });

        return p;
      }

      return [];
    };

    let currentPlan: PlanItem = planItems[0];
    let secondaryPlans: PlanItem[] = [];
    Object.entries(groupedCalendarData).forEach(([date, items]) => {
      if (dayjs(date).isSameOrBefore(today)) {
        const p = mapCalendarItemsToPlanItems(items);
        if (p.length) currentPlan = p[0];
      }
      if (dayjs(date).isSame(today)) {
        const p = mapCalendarItemsToPlanItems(items, "secondary");
        secondaryPlans = p;
      }
    });

    return (
      <CollectViewer
        currentPlan={currentPlan}
        secondaryPlans={secondaryPlans}
      />
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

export const CollectViewer = ({
  currentPlan,
  secondaryPlans,
}: {
  currentPlan: PlanItem;
  secondaryPlans: PlanItem[];
}) => {
  return (
    <>
      <p>
        <strong>Collect for {currentPlan.title}</strong>
      </p>
      <CollectText
        dangerouslySetInnerHTML={{ __html: currentPlan.notes || "" }}
      />
      {secondaryPlans.map((secondaryPlan) => (
        <Fragment key={secondaryPlan.title}>
          <p>
            <strong>Collect for {secondaryPlan.title}</strong>
          </p>
          <CollectText
            dangerouslySetInnerHTML={{ __html: secondaryPlan.notes || "" }}
          />
        </Fragment>
      ))}
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

const CollectText = styled("p")(({ theme }) => ({
  ".dot": {
    color: theme.palette.brand.red,
    position: "relative",
    top: "2px",

    "&:before": {
      content: "'·'",
      lineHeight: "1.5rem",
      fontSize: "1.75rem",
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
