import { Text, NativeSelect, TextInput, Button, Center, Box } from '@mantine/core';
import { useState } from 'react';
import StudentAPI from '../../../API/studentAPI/student.api';
import { IconX, IconCheck } from '@tabler/icons-react';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useQuery } from "@tanstack/react-query";

export const GroupRegistration = () => {
    const [registrationNumberErrors, setRegistrationNumberErrors] = useState(['', '', '']);
    const [leaderRegistrationNumberError, setLeaderRegistrationNumberError] = useState('');

    const [formData, setFormData] = useState({
        batch: '',
        memberDetails: [] as {
            name: string;
            registrationNumber: string;
            contactNumber: string;
            email: string;
            specialization: string;
        }[],
        leaderDetails: {
            name: '',
            registrationNumber: '',
            contactNumber: '',
            email: '',
            specialization: '',
        },
        projectDetails: {
            title: '',
            researchArea: '',
            projectCategory: '',
            supervisorName: '',
            coSupervisorName: '',
        },
    });

    // Use react query and fetch supervisors data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["supervisorsData"],
        queryFn: () => StudentAPI.getSupervisors().then((res) => res.data),
    });

   // Extract names from supervisors data
   const supervisorNames = data.map((supervisor: { name: any; }) => supervisor.name);

   console.log(supervisorNames);
   
    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Collect input data from form fields
        const batch = event.target.batch.value;
        const memberDetails = [
            {
                name: event.target.memberName1.value,
                registrationNumber: event.target.registrationNumber1.value,
                contactNumber: event.target.contactNumber1.value,
                email: event.target.email1.value,
                specialization: event.target.specialization1.value,
            },
            {
                name: event.target.memberName2.value,
                registrationNumber: event.target.registrationNumber2.value,
                contactNumber: event.target.contactNumber2.value,
                email: event.target.email2.value,
                specialization: event.target.specialization2.value,
            },
            {
                name: event.target.memberName3.value,
                registrationNumber: event.target.registrationNumber3.value,
                contactNumber: event.target.contactNumber3.value,
                email: event.target.email3.value,
                specialization: event.target.specialization3.value,
            },
        ];
        const leaderDetails = {
            name: event.target.leaderName.value,
            registrationNumber: event.target.leaderRegistrationNumber.value,
            contactNumber: event.target.leaderContactNumber.value,
            email: event.target.leaderEmail.value,
            specialization: event.target.leaderSpecialization.value,
        };
        const projectDetails = {
            title: event.target.title.value,
            researchArea: event.target.researchArea.value,
            projectCategory: event.target.projectCategory.value,
            supervisorName: event.target.supervisorName.value,
            coSupervisorName: event.target.coSupervisorName.value,
        };

        // Set the form data state
        setFormData((prevFormData) => ({
            ...prevFormData,
            batch,
            memberDetails,
            leaderDetails,
            projectDetails,
        }));

        // Call handleRegistration function with form data
        handleRegistration({
            ...formData,
            batch,
            memberDetails,
            leaderDetails,
            projectDetails,
        });
    };


    // Function to handle group registration
    const handleRegistration = (formData: any) => {
        StudentAPI.groupReg(formData)
            .then((res) => {
                showNotification({
                    id: "Register-Group",
                    color: "teal",
                    title: "Group Registered successfully",
                    message: "Group Registered successfully.",
                    icon: <IconCheck size={16} />,
                    autoClose: 5000,
                });

                // Clear text inputs
                Array.from(document.querySelectorAll("input")).forEach(
                    (input) => (input.value = "")
                );

                // Clear form data state
                setFormData({
                    batch: "",
                    memberDetails: [],
                    leaderDetails: {
                        name: "",
                        registrationNumber: "",
                        contactNumber: "",
                        email: "",
                        specialization: "",
                    },
                    projectDetails: {
                        title: "",
                        researchArea: "",
                        projectCategory: "",
                        supervisorName: "",
                        coSupervisorName: "",
                    },
                });
                refetch();

            })
            .catch((error) => {
                showNotification({
                    title: 'Something went wrong!!',
                    message: `An error occurred: ${error.response.data.message}`,
                    color: "red",
                    autoClose: 5500,
                    icon: <IconX size={16} />
                })
            });
    };

    // Function to handle registration number validation
    const handleRegistrationNumberChange = (event: any, index: any) => {
        const value = event.target.value;

        // Check if registration number starts with 'IT' and has a total of 10 characters
        if (!value.startsWith('IT') || value.length !== 10) {
            setRegistrationNumberErrors((prevErrors) => {
                const newErrors = [...prevErrors];
                newErrors[index] = 'Must start with "IT" and 8 digits';
                return newErrors;
            });
        } else {
            setRegistrationNumberErrors((prevErrors) => {
                const newErrors = [...prevErrors];
                newErrors[index] = '';
                return newErrors;
            });
        }
    };

    // Function to handle leader registration number validation
    const handleLeaderRegistrationNumberChange = (event: any) => {
        const value = event.target.value;

        // Check if registration number starts with 'IT' and has a total of 8 characters
        if (!value.startsWith('IT') || value.length !== 10) {
            setLeaderRegistrationNumberError('Must start with "IT" and 8 digits');
        } else {
            setLeaderRegistrationNumberError('');
        }
    };

    return (
        <Box>
            <Center style={{ marginTop: "20px" }}>
                <Text
                    size="lg"
                    fw={700}
                >
                    Group Details
                </Text>
            </Center>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <NativeSelect
                            name="batch"
                            style={{ position: "relative", top: 60, right: -900, width: 250 }}
                            label="Batch"
                            data={['Regular', 'June']}
                            required
                        />
                    </div>
                    {/* Member's Details */}
                    <Text style={{ position: "relative", top: 40, left: -100 }} fw={500}>
                        Member's Details
                    </Text>
                    <div style={{ display: "flex", flexDirection: "row", gap: 250, position: "relative", top: 60 }}>
                        {[1, 2, 3].map((index) => (
                            <div key={index}>
                                <TextInput name={`memberName${index}`} label="Member name" placeholder="Member name" required />
                                <TextInput
                                    name={`registrationNumber${index}`}
                                    label="Registration Number"
                                    placeholder="ITxxxxxx"
                                    required
                                    onChange={(event) => handleRegistrationNumberChange(event, index)}
                                    error={registrationNumberErrors[index]}
                                />
                                <TextInput name={`contactNumber${index}`} label="Contact Number" placeholder="+94" required />
                                <TextInput name={`email${index}`} label="Email Address" placeholder="abc@domain.domain" type="email" required />
                                <TextInput name={`specialization${index}`} label="Specialization" placeholder="IT" required />
                            </div>
                        ))}
                    </div>

                    {/* Leader's Details */}
                    <Text style={{ position: "relative", top: 120, left: -100 }} fw={500}>
                        Leader's Details
                    </Text>
                    <div style={{ display: "flex", flexDirection: "row", gap: 30, position: "relative", top: 140 }}>
                        <TextInput name="leaderName" label="Leader name" placeholder="Leader name" required />
                        <TextInput
                            name="leaderRegistrationNumber"
                            label="Registration Number"
                            placeholder="ITxxxxxx"
                            required
                            onChange={handleLeaderRegistrationNumberChange}
                            error={leaderRegistrationNumberError}
                        />
                        <TextInput name="leaderContactNumber" label="Contact Number" placeholder="+94" required />
                        <TextInput name="leaderEmail" label="Email Address" placeholder="abc@domain.domain" type="email" required />
                        <TextInput name="leaderSpecialization" label="Specialization" placeholder="IT" required />
                    </div>

                    {/* Project Details */}
                    <Text style={{ position: "relative", top: 260, left: -100 }} fw={500}>
                        Project Details
                    </Text>
                    <div style={{ display: "flex", flexDirection: "row", gap: 30, position: "relative", top: 280 }}>
                        <TextInput name="title" label="Title" placeholder="Title" required />
                        <TextInput name="researchArea" label="Research Area" placeholder="ML" required />
                        <TextInput name="projectCategory" label="Project Category" placeholder="Fashion" required />
                        <NativeSelect name="supervisorName" w="180px" label="Supervisor Name" data={supervisorNames} required />
                        <NativeSelect name="coSupervisorName" w="180px" label="Co-Supervisor Name" data={supervisorNames} required />
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
                        style={{ position: "relative", top: 360, right: -840, marginBottom: 20 }}>
                        Submit
                    </Button>
                </div>
            </form>
        </Box>
    );
};
