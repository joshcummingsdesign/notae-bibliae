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
          <td>Principal Sundays (1)</td>
          <td>
            Sundays of the highest rank, which take precedence over all other
            feasts, observances, and commemorations.
          </td>
        </tr>
        <tr>
          <td>Principal Feasts (2)</td>
          <td>
            The highest-ranking feasts of the liturgical year, celebrating the
            central mysteries of the faith with the greatest liturgical dignity.
          </td>
        </tr>
        <tr>
          <td>Greater Observances (3)</td>
          <td>
            Penitential days and seasonal devotions, which take precedence over
            feasts but are not themselves celebrated as feasts.
          </td>
        </tr>
        <tr>
          <td>Feasts (4)</td>
          <td>
            Celebrations of key events in the life of Christ, the Blessed Virgin
            Mary, and the Apostles, Evangelists, and Martyrs of the early
            church.
          </td>
        </tr>
        <tr>
          <td>Lesser Observances (5)</td>
          <td>
            Penitential days and seasonal devotions, which rank below feasts.
          </td>
        </tr>
        <tr>
          <td>Commemorations (6)</td>
          <td>
            Memorials honoring Saints, Martyrs, Church Fathers, and other holy
            persons or events that bear witness to the faith through their lives
            and histories.
          </td>
        </tr>
        <tr>
          <td>Ordinary Sundays (7)</td>
          <td>All other Sundays of the liturgical year.</td>
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
