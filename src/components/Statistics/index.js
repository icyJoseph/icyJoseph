import React from "react";
import CountUp from "react-countup";
import { Group, Stat, Value, Label } from "./styled";

const languageIcons = {
  JavaScript: "js",
  HTML: "html5",
  CSS: "css3 alternate",
  Python: "python"
};

const LangIcon = ({ icon }) => <Icon name={icon} />;

export const Statistics = ({
  publicRepos = 0,
  publicGists = 0,
  commits = 0,
  languages = [],
  desktop
}) => (
  <div>
    <Group inverted widths={3} size={desktop ? "large" : "small"}>
      <Stat>
        <Value>
          <Icon name="github alternate" />
          <CountUp start={0} end={publicRepos} />
        </Value>
        <Label>Public Repos</Label>
      </Stat>
      <Stat>
        <Value>
          <CountUp start={0} end={commits} />
        </Value>
        <Label>Commits</Label>
      </Stat>
      <Stat>
        <Value>
          <CountUp start={0} end={publicGists} />
        </Value>
        <Label>Public Gists</Label>
      </Stat>
    </Group>
    <Group inverted widths={2} size={desktop ? "small" : "tiny"}>
      {languages.length === 0 ? (
        <Loader active inline="centered" />
      ) : (
        languages.map(({ lang, bytes }) => (
          <Stat key={lang}>
            <Value>
              <LangIcon icon={languageIcons[lang]} />
              <CountUp start={0} end={bytes} />
            </Value>
            <Label>bytes in {lang}</Label>
          </Stat>
        ))
      )}
    </Group>
  </div>
);

export default Statistics;
