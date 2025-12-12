"use client";
import { styled } from "@mui/material";

export const PsalmAttributionTable = () => (
  <Wrapper>
    <Table>
      <thead>
        <tr>
          <th>Book</th>
          <th>Psalm</th>
          <th>Attributed to</th>
          <th>Collected for use in the temple in the time of</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>I</td>
          <td>1 – 41</td>
          <td>David</td>
          <td>David</td>
        </tr>
        <tr>
          <td rowSpan={3}>II</td>
          <td>42 – 50</td>
          <td>The Levites</td>
          <td rowSpan={3}>Hezekiah</td>
        </tr>
        <tr>
          <td>51 – 71</td>
          <td>David</td>
        </tr>
        <tr>
          <td>72</td>
          <td>Solomon</td>
        </tr>
        <tr>
          <td rowSpan={3}>III</td>
          <td>73 – 85</td>
          <td>The Levites</td>
          <td rowSpan={3}>Josiah</td>
        </tr>
        <tr>
          <td>86</td>
          <td>David</td>
        </tr>
        <tr>
          <td>87 – 89</td>
          <td>The Levites</td>
        </tr>
        <tr>
          <td>IV</td>
          <td>90 – 106</td>
          <td rowSpan={2}>
            Various writers including Moses, the Prophets, David, and Solomon
          </td>
          <td rowSpan={2}>Ezra–Nehemiah</td>
        </tr>
        <tr>
          <td>V</td>
          <td>107 – 150</td>
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
    padding: "0 2px",

    "&:first-child": {
      fontWeight: "normal",
    },

    '&[colSpan="4"]': {
      border: "none",
    },
  },
});
