import { Grid } from "@mantine/core";
import { Card, Image, Button } from "@mantine/core";
import user from "../../../assets/user-plus.png";

const AddUserPortal = () => {
  return (
    <div style={{  display: "flex",width:"100%" , justifyContent: "center"  }}>
      <div style={{ display: "flex",gap:'20px' }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={user} height={330} />
          </Card.Section>

          <hr></hr>

          <Button color="blue" fullWidth mt="md" radius="md">
            Add Student
          </Button>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={user} height={330} />
          </Card.Section>
          <hr></hr>

          <Button color="blue" fullWidth mt="md" radius="md">
            Add Staff Member
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AddUserPortal;
