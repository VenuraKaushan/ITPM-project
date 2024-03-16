import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from '@mantine/core';

import classes from '../../../Styles/login.module.css'
import { useForm } from '@mantine/form';
import StudentAPI from '../../../API/studentAPI/student.api';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';


export function StudentLogin() {

  const handleLogin = (values: {
    email: string;
    password: string;
  }) => {
    StudentAPI.studentLogin(values)
      .then((response: any) => {

        // save user details in the local storage
        localStorage.setItem("user-coordinator-session", JSON.stringify(response.data));

        console.log(response.data.role)
        //methanta enwa response ekak userDetails kiyla array ekka eke example ekak widiyata 
        //if(response.data.role === "COORDINATOR"){
        //   href = "/coordinator/dashboard"
        // } kiyala balala condition eka true nam ublage href ekak dpn

      })
      .catch((error) => {
        showNotification({
          title: 'User credentials are wrong',
          message: "check your user credentials again",
          color: "red",
          autoClose: 1500,
          icon: <IconX size={16} />
        })
      });
  }

  //from Structure
  const form = useForm({
    validateInputOnChange: true,

    initialValues: {
      email: "",
      password: "",
      // rememberMe: false,
    },
    validate: {
      email: (value) =>
        /\S+@\S+\.\S+/.test(
          value
        )
          ? null
          : "Invalid Email",
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title} >
        Welcome back Student!
      </Title>
      <form
        onSubmit={form.onSubmit((values) => handleLogin(values))}
      >
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="pmms@domain.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required mt="md"
            {...form.getInputProps("password")}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              label="Remember me"
            // {...form.getInputProps("rememberMe")}
            />
            <Anchor size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
}