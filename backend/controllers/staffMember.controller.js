import User from "../model/users.model";

const generateStaffId = async () =>{
    //get last staff object, If there is a staff member, then return that user object, otherwise return empty array
    const lastStaffDetails = await User.find().sort({_id: -1,"isDeleted.count": 0 }).limit(1);

    //check if the result array is empty or not, If its empty then return first stock ID
    if(lastStaffDetails.length == 0){
        return "STF-1";
    }

    //if array is not null, last get last staff Id
    const memberId = lastStaffDetails.map((data) =>{
        return data.member_id;
    });

    //then we get the Integer value from the last part of the ID
    const oldMemberId = parseInt(memberId[0].split("-")[1]);

    const newMemberId = oldMemberId + 1; //then we add 1 to the past value

    return `STF-${newMemberId}`; //return new Member ID
};

export const memberLogin = async (req,res)=>{
    //get details from the request body
    const email = req.body.email;
    const password = req.body.password
}