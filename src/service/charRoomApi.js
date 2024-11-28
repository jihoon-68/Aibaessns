import api from "./api";

const charRoomApi ={

    chatRoomList: async (userId)=>{
        try{
            const res = await api.post(`/chatroom/${userId}`)
            return res.data;
        }catch (e) {
            console.log("chatRoomList: "+e);
            throw e;
        }
    },
    createChatRoom: async (chatRoomDTO)=>{
        try{
            await api.post("/chatroom/create",chatRoomDTO)
        }catch (e) {
            console.log("createChatRoom: "+e);
            throw e;
        }
    },
    sendMessage: async (chatRoomId,MessageDTO)=>{
        console.log(MessageDTO)
        try{
            await api.post(`/chatroom/${chatRoomId}/message`,MessageDTO);
        }catch (e) {
            console.log("createChatRoom: "+e);
            throw e;
        }
    },
    deleteChatRoom: async (chatRoomId)=>{
        try{
            await api.delete("/chatroom",{chatRoomId})
        }catch (e) {
            console.log("deleteChatRoom: "+e);
            throw e;
        }
    }
}
export default charRoomApi;