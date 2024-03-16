import { useScrollIntoView } from "@mantine/hooks";
import { Container, Button, Text, Group, Box } from "@mantine/core";
import { StudentLogin } from "../../components/AllLogin/StudentLogin";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  const navigate = useNavigate();

  const handleStaffMemberClick = () => {
    // Navigate to the StaffLogin component when the button is clicked
    navigate('/staff-login');
  };

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Group>
          <Button onClick={handleStaffMemberClick}>Are you a staff member?</Button>
        </Group>
      </div>

      <Group justify="center" style={{ textAlign: "center" }}>
        <Text fw={700}>ProjectEase - Modular Management System</Text>

        <Text size="md">
          The Project Module Management System is a user-friendly platform
          designed to simplify the coordination and assessment of year-long
          project modules across various specializations. With distinct roles
          for Project Coordinator, Project Members, Examiners, Supervisors,
          Co-supervisors, and Students, the system streamlines tasks such as
          creating presentation schedules, entering assessment marks, and
          managing research paper publications. The Project Module Management
          System is a user-friendly platform designed to simplify the
          coordination and assessment of year-long project modules across
          various specializations. With distinct roles for Project Coordinator,
          Project Members, Examiners, Supervisors, Co-supervisors, and Students,
          the system streamlines tasks such as creating presentation schedules,
          entering assessment marks, and managing research paper publications.
        </Text>

        <Button
          onClick={() =>
            scrollIntoView({
              alignment: "center",
            })
          }
        >
          Are you a student?
        </Button>

        <Box
          style={{
            width: "100%",
            height: "50vh",
            backgroundColor: "var(--mantine-color-blue-light)",
          }}
        />

        <Text ref={targetRef}> <StudentLogin/></Text>
       
      </Group>
    </Container>
  );
};

export default LandingPage;
