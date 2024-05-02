import {
    Container,
    Tabs,
} from '@mantine/core';
import classes from '../../Styles/HeaderTabs.module.css';
import { DashboardHeader } from '../dashboardHeader';
import { ManageMarks } from './addMarks/addMarking';
import { CompletedMarks } from './completedMarks/completedMarks';
import { useEffect, useState } from 'react';
import { useForm } from "@mantine/form";
import {
    Button,
    PasswordInput,
    Modal,
} from "@mantine/core";
import ExaminerAPI from '../../API/examinerAPI';
import { IconX, IconCheck } from '@tabler/icons-react';
import { showNotification, updateNotification } from "@mantine/notifications";
import { DownloadRubrics } from './downloadRubrics/downloadRubrics';

const tabs = [
    'Download Rubrics',
    'Marking',
    'Completed Mark',
];

export function ExaminerHeader() {
    const [openedPasswordModal, setOpenedPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState(true);

    useEffect(() => {
        // Retrieve user details from local storage
        const userExaminerSessionString = localStorage.getItem("user-staff-session");
        if (userExaminerSessionString) {
            const userExaminertSession = JSON.parse(userExaminerSessionString);
            if (userExaminertSession.isPasswordChanged == false) {
                setOpenedPasswordModal(true);
                changePasswordForm.setFieldValue("_id", userExaminertSession._id);
            }
        } else {
            console.log("User session data not found in local storage");
        }
    }, []);

    //validate confirm password
    const validatePassword = (confirmPassword: string) => {
        if (confirmPassword.length != 0) {
            if (newPassword === confirmPassword) {
                setError(false);
                const error = document.getElementById("confirmPasswordError");
                if (error) error.innerHTML = "Password is match!";
            } else {
                setError(true);
                const error = document.getElementById("confirmPasswordError");
                if (error) error.innerHTML = "Password is not match!";
            }
        }
    };

    // password changing modal
    const changePasswordForm = useForm({
        initialValues: {
            _id: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    //if the change password function
    const changePassword = (values: {
        _id: String,
        currentPassword: String,
        newPassword: String,
        confirmPassword: String
    }) => {
        showNotification({
            id: "update-password",
            title: "Changing password",
            message: "We are trying to update your password",
            loading: true,
        });

        ExaminerAPI.setNewPassword(values)
            .then((res: any) => {
                setOpenedPasswordModal(false);

                //store student details to local storage for further use
                localStorage.setItem("user-staff-session", JSON.stringify(res.data));

                updateNotification({
                    id: "update-password",
                    title: "Changed password",
                    message: "We are updated your password",
                    color: "teal",
                    icon: <IconX />,
                    autoClose: 3000,
                });

            })
            .catch((error) => {
                updateNotification({
                    id: "update-password",
                    title: "Error while changing password",
                    message: "Check your current password or network connection",
                    color: "red",
                    icon: <IconCheck />,
                });
            });
    }

    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab} key={tab}>
            {tab}
        </Tabs.Tab>
    ));

    return (
        <>
            {/* password chaging modal */}
            <Modal
                opened={openedPasswordModal}
                closeOnClickOutside={false}
                closeOnEscape={false}
                withCloseButton={false}
                onClose={() => {
                    setOpenedPasswordModal(false);
                }}
                title={"Change Password for First Time"}
                centered
            >
                <form
                    onSubmit={changePasswordForm.onSubmit((values) =>
                        changePassword(values)
                    )}
                >
                    <PasswordInput
                        label="Current Password"
                        withAsterisk
                        placeholder="current password"
                        {...changePasswordForm.getInputProps("currentPassword")}
                        required
                    />
                    <PasswordInput
                        label="New Password"
                        withAsterisk
                        placeholder="new password"
                        {...changePasswordForm.getInputProps("newPassword")}
                        onChange={(event) => {
                            setNewPassword(event.target.value);
                            changePasswordForm.setFieldValue(
                                "newPassword",
                                event.target.value
                            );
                        }}
                        required
                    />
                    <PasswordInput
                        label="Confirm Password"
                        withAsterisk
                        placeholder="confirm password"
                        onChange={(event) => {
                            changePasswordForm.setFieldValue(
                                "confirmPassword",
                                event.target.value
                            );
                            validatePassword(event.target.value);
                        }}
                        required
                    />
                    <p
                        id="confirmPasswordError"
                        style={{
                            color: error === false ? "green" : "red",
                            marginTop: "10px",
                        }}
                    ></p>

                    <Button
                        fullWidth
                        mt={20}
                        type="submit"
                        disabled={error ? true : false}
                    >
                        Change Password
                    </Button>
                </form>
            </Modal>

            <DashboardHeader />

            <Container>
                <Tabs
                    defaultValue="Download Rubrics"
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
                    <Tabs.Panel value="Download Rubrics">
                        <DownloadRubrics />
                    </Tabs.Panel>
                    <Tabs.Panel value="Completed Mark">
                        <CompletedMarks />
                    </Tabs.Panel>



                </Tabs>
            </Container>
        </>
    );
}