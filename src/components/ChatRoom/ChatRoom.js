import React,{useEffect, useState} from "react";
import "./ChatRoom.css";
import getUserInfo from "../../GoogleLoginAPI/getUserInfo";
import charRoomApi from "../../service/charRoomApi";

const ChatRoom =()=>{
  const [user,setUser] =useState()
  const [conversations,setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  
  //채팅방 초기세팅 함수
  useEffect(()=>{
    const getAllChatRoom = async () => {
      try {
        const user = await getUserInfo();
        const chatRoomList = await charRoomApi.chatRoomList(user.user.id);
        setConversations(chatRoomList);
        setUser(user.user);
        if (chatRoomList.length > 0) {
          console.log(chatRoomList.findIndex((item)=>(item.id == localStorage.getItem("chatRoom"))))
          const chatRoom = chatRoomList.findIndex((item)=>(item.id == localStorage.getItem("chatRoom")))
          setSelectedConversation(chatRoomList[chatRoom]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading chat rooms:", error);
        setLoading(false);
      }
    };
    const timer = setInterval(() => {
      getAllChatRoom();
    }, 10000); // 1초마다 업데이트
    getAllChatRoom();
    return () => clearInterval(timer);
  },[]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      charRoomApi.sendMessage(selectedConversation.id,
        {
          "userId": user.id,
          "content": newMessage,
          "chatRoomId": selectedConversation.id
        }
      );
      setNewMessage("");
    }
  };

  const changeChatRoom = (conversation) =>{
    setSelectedConversation(conversation);
    localStorage.setItem("chatRoom",conversation.id);
  }

  //로딩페이지 표시
  if (loading) {
    return (
      <div className="loading-modal">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
    return(
      <div className="messages-container">
      {/* 좌측 사이드바 */}
      <div className="chat-sidebar">
        <h2>{selectedConversation.userId1.id === user.id ? selectedConversation.userId2.name:selectedConversation.userId1.name}</h2>
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className={conversation.id === selectedConversation.id ? "active" : ""}
              onClick={() => {changeChatRoom(conversation)}}
            >
              <img src={conversation.userId1.id === user.id ? conversation.userId2.profile : conversation.userId1.profile} className="avatar"/>
              <div className="details">
                <span className="name">{conversation.userId1.id === user.id ? conversation.userId2.name:conversation.userId1.name}</span>
                <span className="last-message">{conversation.lastMessage}</span>
              </div>
              <span className="time">{conversation.createdTime}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 우측 메시지 세부 화면 */}
      <div className="chat-window">
        <div className="chat-header">
          <img src={selectedConversation.userId1.id === user.id ? selectedConversation.userId2.profile : selectedConversation.userId1.profile}/>
          <h3>{selectedConversation.userId1.id === user.id ? selectedConversation.userId2.name:selectedConversation.userId1.name}</h3>
        </div>
        <div className="chat-body">
          {selectedConversation.message.map((message) => (
            <div
              key={message.id}
              className={`message ${message.userId === user.id ? "me" : "other"}`}
            >
              <p>{message.content}</p>
              <span className="time">{message.sentTime}</span>
            </div>
          ))}
        </div>

        {/* 메시지 입력창 */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="메시지 입력..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>보내기</button>
        </div>
      </div>
    </div>
    )
}
export default ChatRoom;