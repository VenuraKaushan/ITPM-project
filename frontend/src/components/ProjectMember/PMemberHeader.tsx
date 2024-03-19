import cx from "clsx";
import { useState } from "react";
import {
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  Container,
  useMantineTheme,
  Center,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";
import classes from "../../Styles/HeaderTabs.module.css";
import logo from "../../assets/testlogo.png";
import ResearchManagement from "./ResearchManagement";
import MarkingRubrics from "./MarkingRubrics";

const user = {
  name: "Jane Spoonfighter",
  email: "janspoon@fighter.dev",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
};

const tabs = [
  "Research Management",
  "Marking Rubrics Section",
  "Assessment Management  ",
];

export function PMemberHeader() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <>
    
      <Container size="md">
        <Tabs
          defaultValue="Home"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>
            {items}
            <Tabs.Panel value="Research Management">
              {<ResearchManagement />}
            </Tabs.Panel>
            <Tabs.Panel value="Marking Rubrics Section">
              {<MarkingRubrics />}
            </Tabs.Panel>
          </Tabs.List>
        </Tabs>
      </Container>
    </>
  );
}

export default PMemberHeader;
