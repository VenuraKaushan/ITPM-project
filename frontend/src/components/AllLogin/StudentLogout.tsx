import StudentAPI from "../../API/studentAPI/student.api";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

const studentLogout = async () => {
  // remove the local storage data in current user
  localStorage.removeItem("user-student-session");

  // clear the accessToken
  StudentAPI.logout().then((res) => {
    // navigate to the landing page
    window.location.href = 'http://localhost:5173/';
    
  }).catch((error)=>{
    showNotification({
        title : "Logout error",
        message : "Error while logouting",
        icon : <IconX/>,
        color : "red",
        autoClose:1500
    });
  });

  
};

const StudentLogout = () => {
    studentLogout();

  return <div />;
};
export default StudentLogout;
