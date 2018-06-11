import React, { Fragment } from "react";
import CountUp from "react-countup";
import { Group, Stat, Value, Label, IconWrapper } from "./styled";
import Github from "../../logos/Github";

export const Statistics = ({ publicRepos = 0, commits = 0, languages }) => (
  <Fragment>
    <Group>
      <Stat>
        <Value>
          <IconWrapper>
            <Github width={52} height={50} />
          </IconWrapper>
          <CountUp start={0} end={publicRepos} />
        </Value>
        <Label margin={25}>Public Repos</Label>
      </Stat>
      <Stat>
        <Value>
          <CountUp start={0} end={commits} />
        </Value>
        <Label margin={25}>Commits</Label>
      </Stat>
    </Group>
    <Group>
      {languages.map(({ lang, bytes }) => (
        <Stat key={lang}>
          <Value>
            <CountUp start={0} end={bytes} />
          </Value>
          <Label margin={10}>bytes written</Label>
          <Label margin={10}>in {lang}</Label>
        </Stat>
      ))}
    </Group>
  </Fragment>
);

export default Statistics;
