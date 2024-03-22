import { Tabs, rem } from '@mantine/core';
import { IconUser} from '@tabler/icons-react';
import AddStaffMember from '../../components/Coordinator/AddStaffMember/AddStaffMember';

import AssessmentMark from '../../components/Coordinator/ViewMarkSheet/AssessmentMarks';


export function ViewMarkSheetPage() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <>
    <Tabs color="lime" defaultValue="Student" style={{paddingTop:'20px'}}>
      <Tabs.List>
        <Tabs.Tab value="ViewMarkSheet" leftSection={<IconUser style={iconStyle} />}>
          View Mark Sheet
        </Tabs.Tab>
        <Tabs.Tab value="AssessmentMark" leftSection={<IconUser style={iconStyle} />}>
          Assessment Mark
        </Tabs.Tab>
        <Tabs.Tab value="ReportsMark" leftSection={<IconUser style={iconStyle} />}>
          Reports Marks
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="AssessmentMark">
        <AssessmentMark/>
      </Tabs.Panel>

      <Tabs.Panel value="Staff Member">
       <AddStaffMember/>
      </Tabs.Panel>

    
    </Tabs>
    </>
  );
}