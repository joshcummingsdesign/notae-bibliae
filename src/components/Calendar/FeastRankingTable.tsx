"use client";
import { styled } from "@mui/material";

export const FeastRankingTable = () => (
  <Wrapper>
    <Table>
      <thead>
        <tr>
          <th>Dignity</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Principal Double</td>
          <td>
            The highest-ranking feasts of the liturgical year, celebrating the
            central mysteries of salvation with the greatest liturgical dignity.
          </td>
        </tr>
        <tr>
          <td>Greater Double</td>
          <td>
            Major feasts with a full, elaborate liturgy and high liturgical
            prominence, celebrating important events in Christ’s life or
            principal Marian feasts.
          </td>
        </tr>
        <tr>
          <td>Lesser Double</td>
          <td>
            Feasts with a full liturgy, generally commemorating important saints
            or significant events, but with less liturgical dignity than the
            major celebrations.
          </td>
        </tr>
        <tr>
          <td>Inferior Double</td>
          <td>
            Feasts of notable saints celebrated with a full liturgy, but with
            simpler ceremonial elements and lower liturgical dignity.
          </td>
        </tr>
        <tr>
          <td>Simple</td>
          <td>
            Commemorations with a shorter, simpler liturgy, often for saints or
            lesser festivals.
          </td>
        </tr>
        <tr>
          <td>Greater Feria</td>
          <td>
            Special weekdays with prescribed liturgical observances and seasonal
            importance.
          </td>
        </tr>
        <tr>
          <td>Feria</td>
          <td>
            Ordinary weekdays without special liturgical rank or prescribed
            feast observance.
          </td>
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
    textAlign: "left",
  },

  td: {
    border: "1px solid black",
    textAlign: "left",
    minWidth: "80px",
    padding: "5px 10px",
    verticalAlign: "top",

    "&:first-child": {
      fontWeight: "bold",
      whiteSpace: "nowrap",
    },
  },
});
