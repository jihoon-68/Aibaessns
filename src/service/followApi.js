import api from "./api";
const followApi ={
    followList: async (userId)=>{
        try{
            const res = await api.post(`/follow/${userId}`)
            return res.data;
        }catch (e) {
            console.log("followList: "+e);
            throw e;
        }
    }, CreateFollower: async (FollowerDTO)=>{
        console.log(FollowerDTO);
        try{
            await api.post("/follow/follower",FollowerDTO)
        }catch (e) {
            console.log("CreateFollower: "+e);
            throw e;
        }
    }, deleteFollower: async (FollowerDTO)=>{
        try{
            await api.delete("/follow",{
                data:FollowerDTO,
            });
        }catch (e) {
            console.log("deleteFollower: "+e);
            throw e;
        }
    },
}
export default followApi;