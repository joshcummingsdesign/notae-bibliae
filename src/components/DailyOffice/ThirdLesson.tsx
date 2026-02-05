interface Props {
  lesson?: string;
  page: number;
  office: "morning" | "evening";
}

export const ThirdLesson: React.FC<Props> = ({ lesson, page, office }) => {
  return lesson ? (
    <>
      <h2>Third Lesson</h2>
      <p>
        [ <em>Sit</em> ]
      </p>
      <strong>{lesson}</strong>{" "}
      {`(LFF ${page}, ${office === "morning" ? "First" : "Second"} Half)`}
    </>
  ) : null;
};
