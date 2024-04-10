import cx from 'clsx';
import { useState } from 'react';
import {
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Tabs,
    Burger,
    rem,
    useMantineTheme,
    Center,
    Image,

} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconLogout,
    IconSettings,
    IconSwitchHorizontal,
    IconChevronDown,
} from '@tabler/icons-react';
import classes from '../Styles/HeaderTabs.module.css';
import logo from "../assets/testlogo.png"


export const DashboardHeader = () => {
    const theme = useMantineTheme();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    //check whether user is student or staff member and give details to header 
    const studentUserData = JSON.parse(localStorage.getItem("user-student-session") || "{}");
    const staffUserData = JSON.parse(localStorage.getItem("user-staff-session") || "{}");

    console.log("Student User Data:", studentUserData);
    console.log("Staff User Data:", staffUserData);

    let user;

    const isStudent = !!studentUserData.regNo;
    const isStaff = !!staffUserData.email;

    if (isStudent) {
        user = studentUserData;
    } else if (isStaff) {
        user = staffUserData;
    }

    console.log("User:", user);

    const logoutUrl = isStudent ? "/student/logout" : "/staff/logout";

    return (
        <div className={classes.header}>

            <Container className={classes.mainSection} size="lg">
                <Group justify="space-between">
                    <Image width={300} height={60} src={logo} mt={5} />

                    <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

                    <Menu
                        width={260}
                        position="bottom-end"
                        transitionProps={{ transition: 'pop-top-right' }}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        withinPortal
                    >
                        <Menu.Target>
                            <UnstyledButton
                                style={{ marginRight: "-100px" }}
                                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                            >
                                <Group gap={7}>
                                    <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                                    <Text fw={500} size="sm" lh={1} mr={3}>
                                        {user.name}
                                    </Text>
                                    <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>



                            <Menu.Label>Settings</Menu.Label>
                            <Menu.Item
                                leftSection={
                                    <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                            >
                                Account settings
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                            >
                                Change account
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                                component="a"
                                href={logoutUrl}
                            >
                                Logout
                            </Menu.Item>

                            <Menu.Divider />
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Container>
        </div>

    )
}