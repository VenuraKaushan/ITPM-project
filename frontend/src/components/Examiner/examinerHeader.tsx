import {
    Container,
    Tabs,
} from '@mantine/core';
import classes from '../../Styles/HeaderTabs.module.css';
import { DashboardHeader } from '../dashboardHeader';
import { ManageMarks } from './addMarks/addMarking';
import { CompletedMarks } from './completedMarks/completedMarks';

const tabs = [
    'Marking',
    'Completed Mark',
];

export function ExaminerHeader() {

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
                    defaultValue="Marking"
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
                    <Tabs.Panel value="Marking">
                        <ManageMarks />
                    </Tabs.Panel>

                    <Tabs.Panel value="Completed Mark">
                        <CompletedMarks />
                    </Tabs.Panel>

                </Tabs>
            </Container>
        </>
    );
}