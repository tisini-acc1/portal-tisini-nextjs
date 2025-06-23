import React from "react";
import { format } from "date-fns";
import { Table, TD, TR, TH } from "@ag-media/react-pdf-table";

import { useStore } from "@/store/store";
import { BallWon, GkRestart } from "../teams/team-stats/football-team-stats";
import {
  Document,
  Image,
  Page,
  View,
  Text,
  StyleSheet,
  // Font,
} from "@react-pdf/renderer";

// Register fonts (you'll need to provide these font files)
// Font.register({
//   family: "Open Sans",
//   fonts: [
//     { src: "/fonts/OpenSans-Regular.ttf" },
//     { src: "/fonts/OpenSans-Bold.ttf", fontWeight: "bold" },
//     { src: "/fonts/OpenSans-SemiBold.ttf", fontWeight: "semibold" },
//   ],
// });

const brandBlue = "#1a73e8";
const lightBlue = "#e8f0fe";
const darkBlue = "#0d47a1";

type SimpleProps = {
  restarts: GkRestart;
  recovery: BallWon;
  sequences: Sequence[];
  data: FootballData;
};

const calcPerc = (value: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

const calcTotl = (value: number, total: number) => {
  return value + total;
};

const SimpleBallPDF = ({
  restarts,
  recovery,
  sequences,
  data,
}: SimpleProps) => {
  const teamId = useStore((state) => state.store.team.id);
  const team =
    teamId === data.details.homeId ? data.details.home : data.details.away;

  const today = new Date().toLocaleDateString();
  const formatDate = format(today, "dd MMM, yyyy");

  const sequencesOver10 = sequences.filter(
    (item) => item.Pass_Count >= 10
  ).length;
  const sequences7to9 = sequences.filter(
    (item) => item.Pass_Count >= 7 && item.Pass_Count <= 9
  ).length;
  const sequences4to6 = sequences.filter(
    (item) => item.Pass_Count >= 4 && item.Pass_Count <= 6
  ).length;
  const sequencesBelow3 = sequences.filter(
    (item) => item.Pass_Count < 4
  ).length;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {/* Brand Logo at the top */}
          <Image src="/Tisini.png" style={styles.brandLogo} />

          {/* Match info row */}
          <View style={styles.matchInfoRow}>
            {/* Left: Home team */}
            <View style={styles.teamContainer}>
              <Image src={"/homeLogo.png"} style={styles.teamLogo} />
              <Text style={styles.teamName}>{data.details.home}</Text>
            </View>

            {/* Center: Scores */}
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{data.details.homeScore}</Text>
              <Text style={styles.scoreSeparator}>-</Text>
              <Text style={styles.scoreText}>{data.details.awayScore}</Text>
            </View>

            {/* Right: Away team */}
            <View style={styles.teamContainer}>
              <Image src={"/awayLogo.png"} style={styles.teamLogo} />
              <Text style={styles.teamName}>{data.details.away}</Text>
            </View>
          </View>

          {/* Match report text below */}
          <Text style={styles.matchReportText}>{team} Match report</Text>
        </View>

        {/* Body (Pass Sequence Analysis) */}
        <View style={styles.body}>
          <Text style={{ fontSize: 14, marginBottom: 10 }}>
            Pass Sequence Analysis
          </Text>
          <View style={styles.grid}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Over 10+ Pass Sequence</Text>
              <Text style={styles.cardValue}>{sequencesOver10}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Between 7 - 9 Pass Sequence</Text>
              <Text style={styles.cardValue}>{sequences7to9}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Between 4 - 6 Pass Sequence</Text>
              <Text style={styles.cardValue}>{sequences4to6}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Below 3 Pass Sequence</Text>
              <Text style={styles.cardValue}>{sequencesBelow3}</Text>
            </View>
          </View>

          <Table>
            <TH>
              <TD style={styles.tableHeader}>{data.details.home}</TD>
              <TD style={styles.tableHeader}>{"    "}</TD>
              <TD style={styles.tableHeader}>{data.details.away}</TD>
            </TH>
            <TR>
              <TD style={styles.tableCell}>
                {data.attack.shotInBox.home.value} /{" "}
                {data.attack.shotInBox.home.total}{" "}
                {calcPerc(
                  data.attack.shotInBox.home.value,
                  data.attack.shotInBox.home.total
                )}
                %
              </TD>
              <TD style={styles.tableCellMetric}>Attempts Inside Box</TD>
              <TD style={styles.tableCell}>
                {data.attack.shotInBox.away.value} /{" "}
                {data.attack.shotInBox.away.total}{" "}
                {calcPerc(
                  data.attack.shotInBox.away.value,
                  data.attack.shotInBox.away.total
                )}
                %
              </TD>
            </TR>
            <TR>
              <TD style={styles.tableCell}>
                {data.attack.shotOutBox.home.value} /{" "}
                {data.attack.shotOutBox.home.total}{" "}
                {calcPerc(
                  data.attack.shotInBox.away.value,
                  data.attack.shotInBox.away.total
                )}
                %
              </TD>
              <TD style={styles.tableCellMetric}>Attempts Outside Box</TD>
              <TD style={styles.tableCell}>
                {data.attack.shotOutBox.away.value} /{" "}
                {data.attack.shotOutBox.away.total}{" "}
                {calcPerc(
                  data.attack.shotOutBox.away.value,
                  data.attack.shotOutBox.away.total
                )}
                %
              </TD>
            </TR>

            <TR>
              <TD style={styles.tableCell}> </TD>
              <TD style={styles.tableCell}> </TD>
              <TD style={styles.tableCell}> </TD>
            </TR>

            <TR>
              <TD style={styles.tableCell}>
                {calcTotl(recovery.oppHalf.home, recovery.ownHalf.home)}
              </TD>
              <TD style={styles.tableCellMetric}>Total Recoveries</TD>
              <TD style={styles.tableCell}>
                {calcTotl(recovery.oppHalf.away, recovery.ownHalf.away)}
              </TD>
            </TR>

            <TR>
              <TD style={styles.tableCell}>{recovery.oppHalf.home}</TD>
              <TD style={styles.tableCellMetric}>Opponent&apos;s half</TD>
              <TD style={styles.tableCell}>{recovery.oppHalf.away}</TD>
            </TR>

            <TR>
              <TD style={styles.tableCell}>{recovery.ownHalf.home}</TD>
              <TD style={styles.tableCellMetric}>Own half</TD>
              <TD style={styles.tableCell}>{recovery.ownHalf.away}</TD>
            </TR>

            <TR>
              <TD style={styles.tableCell}> </TD>
              <TD style={styles.tableCellMetric}> </TD>
              <TD style={styles.tableCell}> </TD>
            </TR>

            <TR>
              <TD style={styles.tableCell}>{data.gk.saves.home}</TD>
              <TD style={styles.tableCellMetric}>Saves</TD>
              <TD style={styles.tableCell}>{data.gk.saves.away}</TD>
            </TR>

            <TR>
              <TD style={styles.tableCell}>
                {restarts.comp.home} / {restarts.total.home}{" "}
                {calcPerc(restarts.comp.home, restarts.total.home)}%
              </TD>
              <TD style={styles.tableCellMetric}>Successful Goalkicks</TD>
              <TD style={styles.tableCell}>
                {restarts.comp.away} / {restarts.total.away}{" "}
                {calcPerc(restarts.comp.away, restarts.total.away)}%
              </TD>
            </TR>

            <TR>
              <TD style={styles.tableCell}> </TD>
              <TD style={styles.tableCellMetric}> </TD>
              <TD style={styles.tableCell}> </TD>
            </TR>

            <TR>
              <TD style={styles.tableCell}>{data.discipline.fouls.home}</TD>
              <TD style={styles.tableCellMetric}>Fouls committed</TD>
              <TD style={styles.tableCell}>{data.discipline.fouls.away}</TD>
            </TR>

            <TR>
              <TD style={styles.tableCell}>
                {data.discipline.cards.Homeyellow}
              </TD>
              <TD style={styles.tableCellMetric}>Yellow cards</TD>
              <TD style={styles.tableCell}>
                {data.discipline.cards.Awayyellow}
              </TD>
            </TR>

            <TR>
              <TD style={styles.tableCell}>{data.discipline.cards.Homered}</TD>
              <TD style={styles.tableCellMetric}>Red cards</TD>
              <TD style={styles.tableCell}>{data.discipline.cards.Awayred}</TD>
            </TR>
          </Table>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text>{formatDate}</Text>
          <Text>Improving African Lives Using Numbers</Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    color: "#333",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  brandLogo: {
    width: 120,
    height: 60,
    marginBottom: 15,
  },
  matchInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  teamContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  teamName: {
    fontSize: 12,
    fontWeight: "bold",
    color: brandBlue,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
    color: brandBlue,
  },
  scoreSeparator: {
    fontSize: 18,
    marginHorizontal: 2,
  },
  matchReportText: {
    fontSize: 8,
    color: "#666",
    marginTop: 5,
  },
  body: {
    flexGrow: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: darkBlue,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    flexWrap: "wrap",
  },
  card: {
    width: "23%",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    border: "1pt solid #ccc",
    shadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  cardPrimary: {
    backgroundColor: lightBlue,
    borderTopWidth: 4,
    borderTopColor: brandBlue,
  },
  cardSecondary: {
    backgroundColor: "#f5f5f5",
    borderTopWidth: 4,
    borderTopColor: "#666",
  },
  cardTertiary: {
    backgroundColor: "#f5f5f5",
    borderTopWidth: 4,
    borderTopColor: "#999",
  },
  cardQuaternary: {
    backgroundColor: "#f5f5f5",
    borderTopWidth: 4,
    borderTopColor: "#ccc",
  },
  cardTitle: {
    fontSize: 10,
    color: "#555",
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "semibold",
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: darkBlue,
  },
  tableContainer: {
    marginTop: 15,
  },
  tableHeader: {
    backgroundColor: lightBlue,
    color: brandBlue,
    fontSize: 11,
    fontWeight: "bold",
    padding: 8,
    textAlign: "center",
    textTransform: "uppercase",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: lightBlue,
  },
  team1Header: {
    backgroundColor: lightBlue,
    borderTopLeftRadius: 4,
  },
  team2Header: {
    backgroundColor: lightBlue,
    borderTopRightRadius: 4,
  },
  tableCell: {
    fontSize: 10,
    padding: 8,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: lightBlue,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tableCellMetric: {
    fontSize: 12,
    padding: 8,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: lightBlue,
    color: brandBlue,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: brandBlue,
    paddingTop: 10,
    fontSize: 10,
    color: "#666",
    fontStyle: "italic",
  },
  footerDate: {
    fontWeight: "bold",
    color: brandBlue,
  },
  footerTagline: {
    fontStyle: "italic",
  },
});

export default SimpleBallPDF;
