import { Tabs, rem } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import StaffPage from "../../components/StaffPage";
import ResearchManagement from "../../components/ProjectMember/ResearchManagement";

export function PMPage() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs
      color="lime"
      defaultValue="ResearchTable"
      style={{ paddingTop: "20px" }}
    >
      <Tabs.List grow>
        <Tabs.Tab
          value="TimeManagement"
          leftSection={<IconUser style={iconStyle} />}
        >
          Time Management
        </Tabs.Tab>
        <Tabs.Tab
          value="ResearchTable"
          leftSection={<IconUser style={iconStyle} />}
        >
          Research Table
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="TimeManagement">
        <StaffPage />
      </Tabs.Panel>

      <Tabs.Panel value="ResearchTable">
        <ResearchManagement />
      </Tabs.Panel>
    </Tabs>
  );
}
