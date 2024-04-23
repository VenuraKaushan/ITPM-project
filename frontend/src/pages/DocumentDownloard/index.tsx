import { Tabs, rem } from '@mantine/core';
import { IconSchool } from '@tabler/icons-react';
import { FinalPresentation } from '../../components/Supervisors/Assesment/FinalPresentation';
import { Progress1 } from '../../components/Supervisors/Assesment/Progress1';
import { Progress2 } from '../../components/Supervisors/Assesment/Progress2';
import { Proposal } from '../../components/Supervisors/Assesment/Proposal';
export function Document() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (

    <Tabs color="lime" defaultValue="Proposal" style={{ paddingTop: '20px' }}>
      <Tabs.List grow>
        <Tabs.Tab value="Proposal" leftSection={<IconSchool style={iconStyle} />}>
          Proposal
        </Tabs.Tab>
        <Tabs.Tab value="Progress1" leftSection={<IconSchool style={iconStyle} />}>
          Progress 1
        </Tabs.Tab>
        <Tabs.Tab value="Progress2" leftSection={<IconSchool style={iconStyle} />}>
          Progress 2
        </Tabs.Tab>
        <Tabs.Tab value="FinalPresentation" leftSection={<IconSchool style={iconStyle} />}>
          Final Presentation
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Proposal">
        <Proposal />
      </Tabs.Panel>

      <Tabs.Panel value="Progress1">
        <Progress1 />
      </Tabs.Panel>

      <Tabs.Panel value="Progress2">
        <Progress2 />
      </Tabs.Panel>

      <Tabs.Panel value="FinalPresentation">
        <FinalPresentation />
      </Tabs.Panel>


    </Tabs>
  );
}