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

const user = {
    name: 'Jane Spoonfighter',
    email: 'janspoon@fighter.dev',
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};


export const DashboardHeader = () => {
    const theme = useMantineTheme();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

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
                             style={{marginRight:"-100px"}}
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