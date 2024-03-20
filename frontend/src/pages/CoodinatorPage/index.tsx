import { Tabs, rem } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import StudentDetails from "../../components/Coordinator/AddStudent/StudentTable";
import AddStaffMember from "../../components/Coordinator/AddStaffMember/AddStaffMember";

export function CoodinatorPage() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs color="lime" defaultValue="Student" style={{ paddingTop: "20px" }}>
      <Tabs.List>
        <Tabs.Tab value="Student" leftSection={<IconUser style={iconStyle} />}>
          Student
        </Tabs.Tab>
        <Tabs.Tab
          value="Staff Member"
          leftSection={<IconUser style={iconStyle} />}
        >
          Staff Member
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Student">
        <StudentDetails />
      </Tabs.Panel>

      <Tabs.Panel value="Staff Member">
        <AddStaffMember />
      </Tabs.Panel>
    </Tabs>
  );
}
