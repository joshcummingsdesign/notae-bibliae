"use client";
import { styled } from "@mui/material";

export const PsalmCollectionsTable = () => (
  <Wrapper>
    <Table>
      <thead>
        <tr>
          <th>Collection</th>
          <th>Psalms</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>The Seven Penitential Psalms</td>
          <td>6, 32, 38, 51, 102, 130, 143</td>
        </tr>
        <tr>
          <td>The Six Passion Psalms</td>
          <td>2, 22, 38, 59, 69, 88</td>
        </tr>
        <tr>
          <td>The Five Messianic Psalms</td>
          <td>2, 16, 22, 45, 110</td>
        </tr>
        <tr>
          <td>
            The Fifteen Songs of Degrees
            <br />
            "Songs of Ascents"
            <br />
            "Gradual Psalms"
          </td>
          <td>120–134</td>
        </tr>
        <tr>
          <td>
            The Egyptian Hallel Psalms
            <br />
            "The Great Hallelujah"
          </td>
          <td>113–118</td>
        </tr>
        <tr>
          <td>The Laudate Psalms</td>
          <td>148, 149, 150</td>
        </tr>
      </tbody>
    </Table>
  </Wrapper>
);

const Wrapper = styled("div")({
  overflow: "auto",
});

const Table = styled("table")({
  border: "1px solid black",
  borderCollapse: "collapse",
  width: "100%",

  th: {
    border: "1px solid black",
    padding: "5px 10px",
    fontStyle: "italic",
    fontWeight: "normal",
  },

  td: {
    border: "1px solid black",
    textAlign: "center",
    minWidth: "80px",
    padding: "4px",

    "&:first-child": {
      fontWeight: "normal",
    },
  },
});
