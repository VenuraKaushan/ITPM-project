import ResearchGroups from "../model/group.model.js"


export const getResearchGroupByExaminer = async (req,res)=>{
    try{
        const allResearch = await ResearchGroups.find();

        res.status(200).json(allResearch)

    }catch(err){
        res.status(500).json({message:"Failed to get Research groups",err});
    }

}