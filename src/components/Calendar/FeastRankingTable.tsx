"use client";
import { styled } from "@mui/material";

export const FeastRankingTable = () => (
  <Wrapper>
    <Table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Principal Feasts</td>
          <td>
            The highest-ranking feasts of the liturgical year, celebrating the
            central mysteries of the faith with the greatest liturgical dignity.
          </td>
        </tr>
        <tr>
          <td>Feasts</td>
          <td>
            Observances that celebrate key events in the life of Christ, the
            Blessed Virgin Mary, and the Apostles and Evangelists of the early
            church.
          </td>
        </tr>
        <tr>
          <td>Commemorations</td>
          <td>
            Memorials honoring Saints, Martyrs, Church Fathers, and other holy
            persons or events that bear witness to the faith through their lives
            and histories.
          </td>
        </tr>
        <tr>
          <td>Special Observances</td>
          <td>
            Penitential days and seasonal devotions that shape the liturgical
            year. They are observed with distinctive liturgical practices, but
            are not celebrated as feasts.
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
