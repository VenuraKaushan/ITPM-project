import { Tabs, rem } from '@mantine/core';
import { IconSchool } from '@tabler/icons-react';
import { Semester1Marks } from '../../components/Student/SemesterMarks/Semester1';
import { Semester2Marks } from '../../components/Student/SemesterMarks/Semester2';


export function StudentSemesterMarks() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (

    <Tabs color="lime" defaultValue="1st Semester" style={{ paddingTop: '20px' }}>
      <Tabs.List grow>
        <Tabs.Tab value="1st Semester" leftSection={<IconSchool style={iconStyle} />}>
          1st Semester
        </Tabs.Tab>
        <Tabs.Tab value="2nd Semester" leftSection={<IconSchool style={iconStyle} />}>
          2nd Semester
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="1st Semester">
        <Semester1Marks />
      </Tabs.Panel>

      <Tabs.Panel value="2nd Semester">
        <Semester2Marks />
      </Tabs.Panel>


    </Tabs>
  );
}