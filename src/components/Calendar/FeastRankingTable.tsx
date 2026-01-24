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
            Feasts that celebrate key events in the life of Christ, the Blessed
            Virgin Mary, and the apostles and evangelists of the early Church.
            They are observed with a full liturgy and hold a prominent place in
            the liturgical year.
          </td>
        </tr>
        <tr>
          <td>Commemorations</td>
          <td>
            Commemorations honor saints, martyrs, and other holy persons whose
            lives witness to the faith. They are observed with a shorter,
            simpler liturgy.
          </td>
        </tr>
        <tr>
          <td>Special Observances</td>
          <td>
            Special Observances include penitential days, days of remembrance,
            and seasonal devotions that shape the liturgical year. They are
            observed with distinctive liturgical practices but are not
            celebrated as feasts.
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
