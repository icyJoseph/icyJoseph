import React, { Fragment } from "react";
import CountUp from "react-countup";
import { Loader } from "semantic-ui-react";
import { Group, Stat, Value, Label, IconWrapper } from "./styled";
import Github from "../../logos/Github";

export const Statistics = ({
  publicRepos = 0,
  publicGists = 0,
  commits = 0,
  languages = []
}) => (
  <Fragment>
    <Group compact>
      <Stat>
        <Value>
          <IconWrapper>
            <Github width={52} height={50} />
          </IconWrapper>
          <CountUp start={0} end={publicRepos} />
        </Value>
        <Label margin={10}>Public Repos</Label>
      </Stat>
      <Stat>
        <Value>
          <CountUp start={0} end={publicGists} />
        </Value>
        <Label margin={10}>Public Gists</Label>
      </Stat>
      <Stat>
        <Value>
          <CountUp start={0} end={commits} />
        </Value>
        <Label margin={10}>Commits</Label>
      </Stat>
    </Group>
    <Group>
      {languages.length === 0 ? (
        <Loader active inline="centered" />
      ) : (
        languages.map(({ lang, bytes }) => (
          <Stat key={lang} fontSize="14pt" direction="column">
            <Value>
              <CountUp start={0} end={bytes} />
            </Value>
            <Label margin={10}>bytes written in {lang}</Label>
          </Stat>
        ))
      )}
    </Group>
  </Fragment>
);

export default Statistics;
