import StaffAPI from "../../API/staffAPI/staff.api";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

const staffLogout = async () => {
  // remove the local storage data in current user
  localStorage.removeItem("user-staff-session");

  // clear the accessToken
  StaffAPI.logout().then((res) => {
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

const StaffLogout = () => {
    staffLogout();

  return <div />;
};
export default StaffLogout;
