"use client";
import { Fragment, useEffect, useState } from "react";
import { Initial } from "@/components/text/Initial";
import { styled } from "@mui/material";
import { Loader } from "@/components/Loader";
import { typography } from "@/assets/styles";
import Markdown from "react-markdown";
import remarkSmartypants from "remark-smartypants";
import { useLectionary } from "../hooks/useLectionary";

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
              isActive={activeTab === "today"}
              onClick={() => setActiveTab("today")}
            >
              Today
            </Tab>
            <Tab
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
              <Card>
                <CardHeader>Morning Prayer</CardHeader>
                <CardContent>
                  <ReadingSection>
                    <ReadingTitle>First Reading</ReadingTitle>
                    <Reading readings={activeDay.data.morning.first} />
                  </ReadingSection>

                  <ReadingSection>
                    <ReadingTitle>Second Reading</ReadingTitle>
                    <Reading readings={activeDay.data.morning.second} />
                  </ReadingSection>

                  {activeDay.data.morning.communion && (
                    <>
                      <Divider />
                      <CommunionSection>
                        <ReadingTitle>Holy Communion</ReadingTitle>
                        <CommunionReadings>
                          <CommunionReading>
                            <CommunionLabel>Epistle</CommunionLabel>
                            <Reading
                              readings={
                                activeDay.data.morning.communion.epistle
                              }
                            />
                          </CommunionReading>
                          <CommunionReading>
                            <CommunionLabel>Gospel</CommunionLabel>
                            <Reading
                              readings={activeDay.data.morning.communion.gospel}
                            />
                          </CommunionReading>
                        </CommunionReadings>
                      </CommunionSection>
                    </>
                  )}

                  <Divider />
                  {activeDay.data.morning.collects.map((collect) => (
                    <CollectSection key={collect.title}>
                      <ReadingTitle>{`Collect for ${collect.title}`}</ReadingTitle>
                      <CollectText>{collect.text}</CollectText>
                    </CollectSection>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>Evening Prayer</CardHeader>
                <CardContent>
                  <ReadingSection>
                    <ReadingTitle>First Reading</ReadingTitle>
                    <Reading readings={activeDay.data.evening.first} />
                  </ReadingSection>

                  <ReadingSection>
                    <ReadingTitle>Second Reading</ReadingTitle>
                    <Reading readings={activeDay.data.evening.second} />
                  </ReadingSection>

                  {activeDay.data.evening.communion && (
                    <>
                      <Divider />
                      <CommunionSection>
                        <ReadingTitle>Holy Communion</ReadingTitle>
                        <CommunionReadings>
                          <CommunionReading>
                            <CommunionLabel>Epistle</CommunionLabel>
                            <Reading
                              readings={
                                activeDay.data.evening.communion.epistle
                              }
                            />
                          </CommunionReading>
                          <CommunionReading>
                            <CommunionLabel>Gospel</CommunionLabel>
                            <Reading
                              readings={activeDay.data.evening.communion.gospel}
                            />
                          </CommunionReading>
                        </CommunionReadings>
                      </CommunionSection>
                    </>
                  )}

                  <Divider />
                  {activeDay.data.evening.collects.map((collect) => (
                    <CollectSection key={collect.title}>
                      <ReadingTitle>{`Collect for ${collect.title}`}</ReadingTitle>
                      <CollectText>{collect.text}</CollectText>
                    </CollectSection>
                  ))}
                </CardContent>
              </Card>
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
  borderRadius: "14px",
  padding: "3px",
  width: "100%",
  maxWidth: "400px",
}));

const Tab = styled("button", {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "14px",
  backgroundColor: isActive ? theme.palette.brand.white : "transparent",
  fontSize: "0.875rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  boxShadow: isActive ? "0 1px 2px rgba(0, 0, 0, 0.05)" : "none",
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

const CollectText = styled("p")({
  margin: 0,
  fontSize: "1rem",
  lineHeight: 1.6,
});
