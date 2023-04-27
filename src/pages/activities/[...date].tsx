import { useState, useEffect } from "react";

import type { GetServerSidePropsResult, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { ActivityLog } from "components/Fitbit/ActivityLog";
import { Box } from "design-system/Box";
import { Container } from "design-system/Container";
import { FullPage } from "design-system/Section";
import { Text } from "design-system/Text";
import { getDailyActivityLog } from "pages/api/fitbit/activities/list";

type ActivitiesProps = {
  activityLog: IcyJoseph.ActivityLog;
  year: string;
  month: string;
  day: string;
};

export const formatter = new Intl.DateTimeFormat("sv-SE", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

export function Activities({ activityLog, year, month, day }: ActivitiesProps) {
  const [date, setDate] = useState(() => new Date(`${year}/${month}/${day}`));

  const router = useRouter();

  useEffect(() => {
    const { query } = router;

    const { date } = query;

    if (!Array.isArray(date)) return;

    const [year, month, day] = date;

    try {
      const nextDate = new Date(`${year}/${month}/${day}`);
      setDate(() => nextDate);
    } catch (e) {
      return;
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Activities - icyJoseph</title>
      </Head>

      <Container>
        <FullPage>
          <header>
            <Text as="h2" $fontSize="3rem">
              {formatter.format(date)}
            </Text>
          </header>

          <Box className="mb-3">
            <ActivityLog activities={activityLog} />
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
    const dailyActivityLog = await getDailyActivityLog(
      `${year}-${month}-${day}`
    );

    const activityLog = dailyActivityLog.map(
      (data: Record<string, unknown>) => ({
        ...data,
        activityName: data?.activityParentName || "",
        activeDuration: data?.duration || "",
        startTime: data?.startDate || "",
      })
    );

    return {
      props: { activityLog, year, month, day },
    };
  } catch (e) {
    return { notFound: true };
  }
}

export default Activities;
