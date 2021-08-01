import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import type { GetServerSidePropsResult, GetServerSidePropsContext } from "next";

import { Box } from "components/Box";
import { Container } from "components/Container";
import { FullPage } from "components/Section";
import { Text } from "components/Text";
import { ActivityLog } from "components/Fitbit/ActivityLog";

import { getActivityLog } from "pages/api/fitbit/activities/list";

import { isoStringWithoutMs } from "helpers";

type ActivitiesProps = {
  activityLog: IcyJoseph.ActivityLog;
  year: string;
  month: string;
  day: string;
};

export const formatter = new Intl.DateTimeFormat("sv-SE", {
  year: "numeric",
  month: "numeric",
  day: "numeric"
});

const withLeadingZero = (num: number) => (num > 9 ? num : `0${num}`);

export function Activities({ activityLog, year, month, day }: ActivitiesProps) {
  const [date, setDate] = useState(() => new Date(`${year}/${month}/${day}`));
  const router = useRouter();

  const handleDateChange = useCallback(
    (str: string) => {
      const nextDate = new Date(str);

      setDate(nextDate);

      const nextYear = nextDate.getFullYear();
      const nextMonth = nextDate.getMonth() + 1;
      const nextDay = nextDate.getDate();

      router.push(
        "/activities/[...date]",
        `${nextYear}/${withLeadingZero(nextMonth)}/${withLeadingZero(nextDay)}`,
        { shallow: true }
      );
    },
    [router]
  );

  return (
    <>
      <Head>
        <title>Contact - icyJoseph</title>
      </Head>
      <Container>
        <FullPage>
          <header>
            <Text as="h2" color="--blue" fontSize="3rem">
              Activities for: {formatter.format(date)}
            </Text>
          </header>

          <Box as="main" mb={2}>
            <ActivityLog
              initial={activityLog}
              onDateChange={handleDateChange}
            />
          </Box>
        </FullPage>
      </Container>
    </>
  );
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ActivitiesProps>> {
  const { query } = ctx;

  const { date } = query;

  if (!Array.isArray(date)) return { notFound: true };

  const [year, month, day] = date;

  try {
    const dateObj = new Date(`${year}/${month}/${day}`);

    dateObj.setHours(23);
    dateObj.setMinutes(59);

    const activityLog = await getActivityLog({
      beforeDate: isoStringWithoutMs(dateObj.toISOString())
    });

    return {
      props: { activityLog, year, month, day }
    };
  } catch (e) {
    return { notFound: true };
  }
}

export default Activities;
