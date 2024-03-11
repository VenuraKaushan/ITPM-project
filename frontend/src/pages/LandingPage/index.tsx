import { useScrollIntoView } from '@mantine/hooks';
import { Container, ActionIcon, Button, Text, Group, Box } from '@mantine/core';

const LandingPage = () => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  return (
    <Container>
      <Group align="right">
        <Button>Are you a staff member?</Button>
      </Group>

      <Group justify="center" style={{ textAlign: 'center' }}>
        <Text fw={700}>ProjectEase - Modular Management System</Text>

        <Text size="md">
        The Project Module Management System is a user-friendly platform designed to simplify
          the coordination and assessment of year-long project
          modules across various specializations. With distinct roles for
          Project Coordinator, Project Members, Examiners, Supervisors, Co-supervisors,
          and Students, the system streamlines tasks such as creating presentation schedules,
          entering assessment marks, and managing research paper publications.
          The Project Module Management System is a user-friendly platform designed to simplify
          the coordination and assessment of year-long project
          modules across various specializations. With distinct roles for
          Project Coordinator, Project Members, Examiners, Supervisors, Co-supervisors,
          and Students, the system streamlines tasks such as creating presentation schedules,
          entering assessment marks, and managing research paper publications.
        </Text>

        <Button
          onClick={() =>
            scrollIntoView({
              alignment: 'center',
            })
          }
        >
          Are you a student?
        </Button>

        <Box
          style={{
            width: '100%',
            height: '50vh',
            backgroundColor: 'var(--mantine-color-blue-light)',
          }}
        />

        <Text ref={targetRef}>Student Login portal</Text>
      </Group>
    </Container>
  );
};

export default LandingPage;
