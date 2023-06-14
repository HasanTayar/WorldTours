import ChatPage from "../../Pages/Chat/chat";
const AdminChat = ({user}) => {
  console.log(user);
return(
  <ChatPage user={user}/>
)

};

export default AdminChat;
