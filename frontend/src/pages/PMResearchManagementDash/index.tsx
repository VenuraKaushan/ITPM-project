import { Tabs, rem } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import ResearchManagement from "../../components/ProjectMember/ResearchManagement";
import { StaffPage } from "../../components/ProjectMember/StaffPage";

export function PMRersearchDash() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs
      color="lime"
      defaultValue="Time Management"
      style={{ paddingTop: "20px" }}
    >
      <Tabs.List >
        <Tabs.Tab
          value="Time Management"
          leftSection={<IconUser style={iconStyle} />}
        >
          Time Management
        </Tabs.Tab>
        <Tabs.Tab
          value="Schedule Management"
          leftSection={<IconUser style={iconStyle} />}
        >
          Schedule Management{" "}
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Time Management">
        <StaffPage />
      </Tabs.Panel>

      <Tabs.Panel value="Schedule Management">
        <ResearchManagement />
      </Tabs.Panel>
    </Tabs>
  );
}
