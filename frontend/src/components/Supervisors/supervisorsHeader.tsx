import {
    Container,
    Tabs,
} from '@mantine/core';
import classes from '../../Styles/HeaderTabs.module.css';
import { DashboardHeader } from '../dashboardHeader';
import { AddMark } from './AddMark/AddMark';
import { StudentDetails } from './StudentDetails/StudentDetails';
import { FeedBack } from './FeedBack/Feedback';
import { Assesment } from './Assesment/Assesment';
const tabs = [
    'Add Mark',
    'Student Details',
    'Feedback',
    'Assesment',
];

export function SupervisorsHeader() {

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
                    <Tabs.Panel value="Add Mark">
                        <AddMark />
                    </Tabs.Panel>

                    <Tabs.Panel value="Student Details">
                        <StudentDetails />
                    </Tabs.Panel>

                    <Tabs.Panel value="FeedBack">
                        <FeedBack />
                    </Tabs.Panel>

                    <Tabs.Panel value="Assesment">
                        <Assesment />
                    </Tabs.Panel>

                </Tabs>
            </Container>
        </>
    );
}