import { useState } from 'react';
import {
    Container,
    Tabs,
    useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../../Styles/HeaderTabs.module.css';
import { GroupRegistration } from './GroupRegistration';
import { PublishResearch } from './publishResearch';
import { Assessment } from './AssessmentUpload';
import { SemesterMarks } from './SemesterMarks';
import { DashboardHeader } from '../dashboardHeader';


const tabs = [
    'Group Registration',
    'Publish Research',
    'Assessment',
    'Semester marks',
];

export function StudentHeader() {

    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab} key={tab}>
            {tab}
        </Tabs.Tab>
    ));

    return (
        <>
            <DashboardHeader/>

            <Container>
                <Tabs
                    defaultValue="Group Registration"
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
                    <Tabs.Panel value="Group Registration">
                        <GroupRegistration />
                    </Tabs.Panel>
                    <Tabs.Panel value="Publish Research">
                        <PublishResearch />
                    </Tabs.Panel>
                    <Tabs.Panel value="Assessment">
                        <Assessment />
                    </Tabs.Panel>
                    <Tabs.Panel value="Semester marks">
                        <SemesterMarks />
                    </Tabs.Panel>
                </Tabs>
            </Container>
        </>
    );
}