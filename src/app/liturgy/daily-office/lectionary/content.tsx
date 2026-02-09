"use client";
import { Fragment, useEffect, useState } from "react";
import { Initial } from "@/components/text/Initial";
import { Button, styled } from "@mui/material";
import { Loader } from "@/components/Loader";
import { typography } from "@/assets/styles";
import Markdown from "react-markdown";
import DOMPurify from "isomorphic-dompurify";
import remarkSmartypants from "remark-smartypants";
import { useLectionary } from "../hooks/useLectionary";
import { Lessons } from "@/models/lectionary";

export const Content = () => {
  const { isLoading, today, tomorrow, refreshBibleGatewayLinks } =
    useLectionary();
  const [activeTab, setActiveTab] = useState<"today" | "tomorrow">("today");
  const activeDay = activeTab === "today" ? today : tomorrow;

  useEffect(() => {
    refreshBibleGatewayLinks();
  }, [activeTab, refreshBibleGatewayLinks]);

  return (
    <>
      {isLoading && <Loader />}
      <Wrapper isLoading={isLoading}>
        <Header>
          <Initial text="Daily Office: Lectionary" />
        </Header>
        <TabContainer>
          <TabList>
            <Tab
              variant="text"
              isActive={activeTab === "today"}
              onClick={() => setActiveTab("today")}
            >
              Today
            </Tab>
            <Tab
              variant="text"
              isActive={activeTab === "tomorrow"}
              onClick={() => setActiveTab("tomorrow")}
            >
              Tomorrow
            </Tab>
          </TabList>
        </TabContainer>

        {!isLoading && activeDay.data && (
          <div key={activeTab}>
            <DayHeader>
              <SeasonText>{activeDay.data.season}</SeasonText>
              <DateText>{activeDay.date}</DateText>
              <ObservanceText>
                <Markdown remarkPlugins={[remarkSmartypants]}>
                  {activeDay.data.primaryObservance}
                </Markdown>
              </ObservanceText>
              {activeDay.data.secondaryObservance && (
                <SmallText>
                  <Markdown remarkPlugins={[remarkSmartypants]}>
                    {`[ *${activeDay.data.secondaryObservance}* ]`}
                  </Markdown>
                </SmallText>
              )}
            </DayHeader>

            <ContentWrap>
              <PrayerCard
                title="Morning Prayer"
                lessons={activeDay.data.morning}
              />
              <PrayerCard
                title="Evening Prayer"
                lessons={activeDay.data.evening}
              />
            </ContentWrap>
          </div>
        )}
      </Wrapper>
    </>
  );
};

const Reading = ({ readings }: { readings: string[] }) => (
  <ReadingReference>
    {readings.map((reading, i) => (
      <Fragment key={reading}>
        {reading}
        {i < readings.length - 1 && <br />}
      </Fragment>
    ))}
  </ReadingReference>
);

const PrayerCard = ({
  title,
  lessons,
}: {
  title: string;
  lessons: Lessons;
}) => (
  <Card>
    <CardHeader>{title}</CardHeader>
    <CardContent>
      <ReadingSection>
        <ReadingTitle>First Lesson</ReadingTitle>
        <Reading readings={lessons.first} />
      </ReadingSection>

      <ReadingSection>
        <ReadingTitle>Second Lesson</ReadingTitle>
        <Reading readings={lessons.second} />
      </ReadingSection>

      {lessons.third && (
        <ReadingSection>
          <ReadingTitle>Third Lesson</ReadingTitle>
          <MarkdownText>
            <Markdown remarkPlugins={[remarkSmartypants]}>
              {`${lessons.third.title}${lessons.third.reading ? ` (${lessons.third.reading})` : ""}`}
            </Markdown>
          </MarkdownText>
        </ReadingSection>
      )}

      {lessons.communion && (
        <>
          <Divider />
          <CommunionSection>
            <ReadingTitle>Holy Communion</ReadingTitle>
            <CommunionReadings>
              <CommunionReading>
                <CommunionLabel>Epistle</CommunionLabel>
                <Reading readings={lessons.communion.epistle} />
              </CommunionReading>
              <CommunionReading>
                <CommunionLabel>Gospel</CommunionLabel>
                <Reading readings={lessons.communion.gospel} />
              </CommunionReading>
            </CommunionReadings>
          </CommunionSection>
        </>
      )}

      <Divider />
      {lessons.collects.map((collect) => (
        <CollectSection key={collect.title}>
          <ReadingTitle>{`Collect for ${collect.title}`}</ReadingTitle>
          <CollectText text={collect.text} />
        </CollectSection>
      ))}
    </CardContent>
  </Card>
);

const CollectText: React.FC<{ text: string }> = ({ text }) => (
  <StyledCollectText
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(
        text
          .replaceAll("·", '<span class="dot"></span>')
          .replace("Amen", "<em>Amen</em>"),
      ),
    }}
  />
);

const Wrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "isLoading",
})<{ isLoading: boolean }>(({ isLoading }) => ({
  opacity: isLoading ? 0 : 1,
  visibility: isLoading ? "hidden" : "visible",
  lineHeight: isLoading ? 0 : undefined,
  height: isLoading ? 0 : undefined,
  overflow: isLoading ? "hidden" : undefined,
  transition: "opacity 0.3s ease-in-out",
}));

const ContentWrap = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

const Header = styled("div")({
  textAlign: "center",
});

const TabContainer = styled("div")({
  marginTop: "2rem",
  display: "flex",
  justifyContent: "center",
});

const TabList = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  backgroundColor: theme.palette.brand.xLightGrey,
  borderRadius: "8px",
  padding: "3px",
  width: "100%",
  maxWidth: "400px",
}));

const Tab = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  borderRadius: "8px",
  backgroundColor: isActive ? theme.palette.brand.white : "transparent",
  color: theme.palette.brand.black,
  fontSize: "0.875rem",
  fontWeight: 500,
  textTransform: "none",
  boxShadow: isActive ? "0 1px 2px rgba(0, 0, 0, 0.05)" : "none",
  "&:hover": {
    backgroundColor: isActive
      ? theme.palette.brand.white
      : theme.palette.brand.hover,
  },
  "& .MuiTouchRipple-ripple": {
    color: theme.palette.brand.ripple,
  },
}));

const DayHeader = styled("div")({
  textAlign: "center",
  margin: "2rem 0",
});

const DateText = styled("h2")({
  ...typography.h2,
  margin: "0.2em",
  textAlign: "center",
  fontSize: "1.5rem",
});

const SeasonText = styled("p")({
  margin: "0.2em",
  fontSize: "1.125rem",
  textAlign: "center",
});

const ObservanceText = styled("div")({
  p: {
    margin: "0.2em",
    fontSize: "1.25rem",
    fontWeight: 600,
    textAlign: "center",
  },
});

const SmallText = styled("div")({
  p: {
    margin: "0.2em",
    fontSize: "0.9rem",
    lineHeight: "24px",
  },
});

const Card = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.brand.border}`,
  borderRadius: "14px",
  overflow: "hidden",
}));

const CardHeader = styled("h3")({
  margin: "0 0 0.4rem",
  padding: "1.5rem 1.5rem 0.5rem",
  fontSize: "1.375rem",
});

const CardContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "0 1.5rem 1.5rem",
});

const ReadingSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

const ReadingTitle = styled("h4")({
  margin: 0,
  fontSize: "1rem",
});

const ReadingReference = styled("p")({
  margin: 0,
  fontSize: "1rem",
});

const MarkdownText = styled("div")({
  p: {
    margin: 0,
    fontSize: "1rem",
  },
});

const Divider = styled("hr")(({ theme }) => ({
  margin: 0,
  border: "none",
  borderTop: `1px solid ${theme.palette.brand.border}`,
}));

const CommunionSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
});

const CommunionReadings = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
});

const CommunionReading = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.125rem",
});

const CommunionLabel = styled("p")({
  margin: 0,
  fontSize: "0.875rem",
});

const CollectSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

const StyledCollectText = styled("p")(({ theme }) => ({
  margin: 0,
  fontSize: "1rem",
  lineHeight: 1.6,
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
