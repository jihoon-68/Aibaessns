import api from "./api";
const postApi={

    // 모든 게시글 조회
    getAllPosts: async ()=>{
        try{
            const res = await api.get('/post');
            return res.data;
        }catch(e){
            throw e; 
        }
    },
    // 특정 유저 모든 게시글 조회
    userGetAllPosts: async (id)=>{
        try{
            const res = await api.get(`/post/${id}`);
            return res.data;
        }catch(e){
            throw e;
        }
    },
    // 게시글 추가
    createBoard:(postDTO)=>{
        try{
            api.post('/post',postDTO);
        }catch(e){
            throw e;
        }
    },
    // 게시글 수정
    updateBoard: (id, postDTO)=>{
        try{
            api.put(`/post/${id}`,postDTO);
        }catch(e){
            throw e;
        }
    },
    // 게시글 삭제
    deletePost: async(id)=>{
        try{
            await api.delete(`/post/${id}`); 
        }catch(e){
            throw e;
        }
    }
}
export default postApi;