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
import { useForm } from "@mantine/form";
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import classes from '../../Styles/login.module.css'
import StaffAPI from '../../API/staffAPI/staff.api';

const StaffLogin = () => {

  const navigate = useNavigate();


  const handleLogin = (values: {
    email: string;
    password: string;
  }) => {
    StaffAPI.staffLogin(values)
      .then((response: any) => {

        // save user details in the local storage
        localStorage.setItem("user-staff-session", JSON.stringify(response.data));

        console.log(response.data.role)

        if (response.data.role === "EXAMINER") {
          navigate("/examiner/dashboard");
        }
        else if (response.data.role === "PROJECTMEMBER") {
          navigate("/pMember/dashboard");
        }
        else if (response.data.role === "COORDINATOR") {
          navigate("/coordinator/dashboard");
        }
        else if (response.data.role === "SUPERVISOR") {
          navigate("/supervisors/dashboard");

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
      <form
        onSubmit={form.onSubmit((values) => handleLogin(values))}
      >
        <Title ta="center" className={classes.title} >
          Staff Login
        </Title>
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
  )
}

export default StaffLogin
