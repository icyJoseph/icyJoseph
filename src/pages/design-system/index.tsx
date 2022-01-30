import Head from "next/head";

import styled from "styled-components";
import { space } from "@styled-system/space";

import { Box } from "design-system/Box";
import { Button } from "design-system/Button";
import { CircularProgress } from "design-system/CircularProgress";
import { Container } from "design-system/Container";
import { Flex } from "design-system/Flex";
import { Section } from "design-system/Section";
import { Text } from "design-system/Text";
import { BackToTop } from "design-system/BackToTop";
import { Table, Th, Tr, Td } from "design-system/Table";
import { Measurement } from "design-system/Measurement";

const StyledCircularProgress = styled(CircularProgress)`
  .progress-track {
    stroke: var(--smokeyWhite);
  }

  .progress-thumb {
    stroke: var(--lightBlue);
  }
`;

const DesignSystemContainer = styled(Container)`
  & > section {
    ${space({ mb: 5 })};
  }
`;

export const DesignSystem = () => {
  return (
    <>
      <Head>
        <title>icyJoseph - Design System</title>
      </Head>

      <DesignSystemContainer>
        <Section>
          <Text renderAs="h1" fontSize="3rem">
            Design System
          </Text>

          <Text>
            A collection of design system elements used on this website.
          </Text>
        </Section>

        <Section>
          <Text renderAs="h2" fontSize="2.5rem">
            Button
          </Text>

          <Flex gap="2rem" mt={3}>
            <Button variant="primary">Hello world</Button>

            <Button variant="outlined">Hello world</Button>
          </Flex>
        </Section>

        <Section>
          <Text renderAs="h2" fontSize="2.5rem">
            Circular Progress
          </Text>

          <Flex gap="2rem" mt={3}>
            {[0, 25, 50, 75].map((percentage) => (
              <StyledCircularProgress key={percentage} percentage={percentage}>
                <Text>{percentage} %</Text>
              </StyledCircularProgress>
            ))}
          </Flex>
        </Section>

        <Section>
          <Text renderAs="h2" fontSize="2.5rem">
            Back to top
          </Text>

          <Box mt={3}>
            <BackToTop />
          </Box>
        </Section>

        <Section>
          <Text renderAs="h2" fontSize="2.5rem">
            Table
          </Text>

          <Box mt={3}>
            <Table>
              <thead>
                <Tr>
                  <Th />
                  <Th colSpan={2}>
                    <Text fontSize="2rem" fontWeight={100}>
                      Activities
                    </Text>
                  </Th>
                </Tr>
              </thead>

              <tbody>
                {[
                  {
                    name: "Sleep",
                    data: [
                      { id: 0, value: 2, unit: "hours" },
                      { id: 1, value: 20, unit: "min" }
                    ]
                  },
                  {
                    name: "Running",
                    data: [
                      { id: 0, value: 1234, unit: "steps" },
                      { id: 1, value: 20, unit: "min" },
                      { id: 2, value: 120, unit: "bpm" }
                    ]
                  }
                ].map((entry) => (
                  <Tr key={entry.name}>
                    <Td />

                    <Td>
                      <Text fontSize="2rem" fontWeight={300}>
                        {entry.name}
                      </Text>
                    </Td>
                    <Td>
                      {entry.data.map(({ value, unit, id }) => {
                        return (
                          <Measurement key={id} value={value} unit={unit} />
                        );
                      })}
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </Section>
      </DesignSystemContainer>
    </>
  );
};

export default DesignSystem;
