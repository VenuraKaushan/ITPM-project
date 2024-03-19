import { Tabs, rem } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import StudentDetails from '../../components/Coordinator/AddStudent/StudentTable';
import AddStaffMember from '../../components/Coordinator/AddStaffMember/AddStaffMember';

export function CoodinatorPage() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs color="lime" defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<IconPhoto style={iconStyle} />}>
          Gallery
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<IconMessageCircle style={iconStyle} />}>
          Messages
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
          Settings
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">
        <StudentDetails/>
      </Tabs.Panel>

      <Tabs.Panel value="messages">
       
       <AddStaffMember/>
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
}