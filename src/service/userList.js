import api from "./api";

const userList={
    // 모든 유저 조회
    getAllUser: async ()=>{
        try{
            const res = await api.get('/user');
            return res.data;
        }catch(e){
            throw e; 
        }
    },
}
export default userList;