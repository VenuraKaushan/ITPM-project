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
import { DashboardHeader } from "../dashboardHeader";
import { PMRersearchDash } from "../../pages/PMResearchManagementDash";
import PMAddAssestment from "./PMAddAssestment";



const user = {
  name: "Jane Spoonfighter",
  email: "janspoon@fighter.dev",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
};

const tabs = [
  "Research Management",
  "Marking Rubrics Section",
  "Assessment Management",
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
      <DashboardHeader />
      
      <Container>
        <Tabs
          defaultValue="Research Management"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List grow>
            {items}
            <Tabs.Panel value="Research Management">
              < PMRersearchDash/>
            </Tabs.Panel>
            <Tabs.Panel value="Marking Rubrics Section">
              <MarkingRubrics />
            </Tabs.Panel>
            <Tabs.Panel value="Assessment Management">
              <PMAddAssestment />
            </Tabs.Panel>
           
          </Tabs.List>
        </Tabs>
      </Container>
    </>
  );
}

export default PMemberHeader;
