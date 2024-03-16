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

import classes from '../../Styles/login.module.css'
import { useForm } from '@mantine/form';
import StudentAPI from '../../API/studentAPI/student.api';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';


export function StudentLogin() {
  const navigate = useNavigate();

  const handleLogin = (values: {
    email: string;
    password: string;
  }) => {
    StudentAPI.studentLogin(values)
      .then((response: any) => {

        // save user details in the local storage
        localStorage.setItem("user-student-session", JSON.stringify(response.data));
        console.log(response.data.role)

        if (response.data.role === "STUDENT") {
          navigate("/student/dashboard");
        }

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