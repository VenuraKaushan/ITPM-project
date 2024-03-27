import { useScrollIntoView } from "@mantine/hooks";
import { Container, Button, Text, Group, Box } from "@mantine/core";
import { StudentLogin } from "../../components/AllLogin/StudentLogin";
import { useNavigate } from "react-router-dom";
import bImage from "../../assets/Background.png";

const LandingPage = () => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  const navigate = useNavigate();

  const handleStaffMemberClick = () => {
    // Navigate to the StaffLogin component when the button is clicked
    navigate("/staff-login");
  };

  return (
    <div style={{ backgroundColor: "var(--mantine-color-blue-light)" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "40px"}}>
        <Group>
          <Button
            onClick={handleStaffMemberClick}
            style={{ marginTop: "15px" }}
          >
            Are you a staff member?
          </Button>
        </Group>
      </div>

    <div style={{ margin: '0 auto', maxWidth: '1200px' }}>
      <Group justify="center" style={{ textAlign: "center" }}>
        <Text size="xl"  style={{ fontFamily: 'serif', color: 'black' }}>ProjectEase - Modular Management System</Text>
        <div >
          <Text size="md" style={{ fontFamily: 'cursive' }}>
            The Project Module Management System is a user-friendly platform
            designed to simplify the coordination and assessment of year-long
            project modules across various specializations. With distinct roles
            for Project Coordinator, Project Members, Examiners, Supervisors,
            Co-supervisors, and Students, the system streamlines tasks such as
            creating presentation schedules, entering assessment marks, and
            managing research paper publications. The Project Module Management
            System is a user-friendly platform designed to simplify the
            coordination and assessment of year-long project modules across
            various specializations. With distinct roles for Project
            Coordinator, Project Members, Examiners, Supervisors,
            Co-supervisors, and Students, the system streamlines tasks such as
            creating presentation schedules, entering assessment marks, and
            managing research paper publications.
          </Text>
          </div>
        

        <Button
          onClick={() =>
            scrollIntoView({
              alignment: "center",
            })
          }
          style={{ marginTop: "20px" }}
        >
          Are you a student?
        </Button>

        <Box
          style={{
            width: "150%",
            height: "60vh",
            backgroundImage: `url(${bImage})`,
            marginTop: "10px",
            backgroundPosition: 'center',
            backgroundSize: 'cover'

          }}
        />

        <Text ref={targetRef}>
          {" "}
          <StudentLogin />
        </Text>
      </Group>
      </div>
    </div>
  );
};

export default LandingPage;
