import { useState } from 'react';
import {
  Container,
  Tabs,
 

  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../../Styles/HeaderTabs.module.css'

import Addassessment from './AddAssessment/AddAssessment';
import { CoodinatorPage } from '../../pages/CoodinatorPage';
import { DashboardHeader } from '../dashboardHeader';
import { ViewMarkSheet } from './ViewMarkSheet/ViewMarkSheet';
import { AssignProjectMember } from './AssignProjectMember/AssignProjectMember';
import { ResearchPapers } from './ResearchPapers/ResearchPapers';


const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

const tabs = [
  'Add User',
  'View Mark Sheet',
  'Assignment',
  'Assign Project Member',
  'Research Papers',
];

export function CoordinatorHeading() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = tabs.map((tab) => (
    <Tabs.Tab  value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    
        <>
        <DashboardHeader/>

        
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
          <Tabs.List grow>{items}</Tabs.List>

          {/* Here you can add your own Component to here */}
          <Tabs.Panel value="Add User">
            <CoodinatorPage/>
          </Tabs.Panel>

          <Tabs.Panel value='Assignment'>
            <Addassessment/>
          </Tabs.Panel>

          <Tabs.Panel value='View Mark Sheet'>
            <ViewMarkSheet/>
          </Tabs.Panel>

          <Tabs.Panel value='Assign Project Member'>
            <AssignProjectMember/>
          </Tabs.Panel>

          <Tabs.Panel value='Research Papers'>
            <ResearchPapers/>
          </Tabs.Panel>
        </Tabs>

        
      </Container>
      </>
    
  );
}