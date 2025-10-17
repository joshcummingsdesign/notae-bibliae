"use client";
import { styled } from "@mui/material";

export const PsalmTable = () => (
  <Wrapper>
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>Matins</th>
          <th>Prime</th>
          <th>Terce</th>
          <th>Sext</th>
          <th>None</th>
          <th>Vespers</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sunday</td>
          <td colSpan={2}>1 – 26</td>
          <td></td>
          <td></td>
          <td></td>
          <td>110 – 115</td>
        </tr>
        <tr>
          <td>Monday</td>
          <td>27 – 38</td>
          <td colSpan={4} style={{ textAlign: "left", padding: 10 }}>
            On Ferial days the 119th Psalm is divided among these four hours,
            and at None, the 120th and 121st are added to the portion appointed
            for that hour.
          </td>
          <td>116 – 118</td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td>39 – 52</td>
          <td colSpan={4}></td>
          <td>122 – 126</td>
        </tr>
        <tr>
          <td>Wednesday</td>
          <td>53 – 68</td>
          <td colSpan={4}></td>
          <td>127 – 131</td>
        </tr>
        <tr>
          <td>Thursday</td>
          <td>69 – 80</td>
          <td colSpan={4}></td>
          <td>132 – 137</td>
        </tr>
        <tr>
          <td>Friday</td>
          <td>81 – 97</td>
          <td colSpan={4}></td>
          <td>138 – 143</td>
        </tr>
        <tr>
          <td>Saturday</td>
          <td>98 – 109</td>
          <td colSpan={4}></td>
          <td>144 – 150</td>
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
      textAlign: "left",
      fontStyle: "italic",
      fontWeight: "normal",
    },

    '&[colSpan="4"]': {
      border: "none",
    },
  },
});
