import { Tabs, rem } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import ReportsMarks from '../../components/Coordinator/ViewMarkSheet/ReportsMarks';
import AssessmentMark from '../../components/Coordinator/ViewMarkSheet/AssessmentMarks';


export function ViewMarkSheetPage({ assessmentMarksData }: { assessmentMarksData: any }) {
  const iconStyle = { width: rem(12), height: rem(12) };
  // console.log(assessmentMarksData)

  return (
    <>
      <Tabs color="lime" defaultValue="AssessmentMark" style={{ paddingTop: '20px' }}>
        <Tabs.List>

          <Tabs.Tab value="AssessmentMark" leftSection={<IconUser style={iconStyle} />}>
            Assessment Mark
          </Tabs.Tab>
          <Tabs.Tab value="ReportsMark" leftSection={<IconUser style={iconStyle} />}>
            Reports Marks
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="AssessmentMark">
          <AssessmentMark assessmentMarksData={assessmentMarksData} />
        </Tabs.Panel>

        <Tabs.Panel value="ReportsMark">
          <ReportsMarks />
        </Tabs.Panel>


      </Tabs>
    </>
  );
}