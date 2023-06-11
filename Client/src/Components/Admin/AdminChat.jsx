import { useState, useEffect } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import classnames from "classnames";
import useChat from "../../Services/ChatService";
import { useChatRooms } from "../../Services/useChatRooms";
import { fetchUserById } from "../../Services/userService";

const AdminChat = ({ adminId }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { messages, sendMessage } = useChat(adminId, selectedRoom);
  const [chatRoomNames, setChatRoomNames] = useState([]);
  const allChatRooms = useChatRooms();

  useEffect(() => {
    const fetchChatRooms = async () => {
      const rooms = await allChatRooms;
      const roomNames = await Promise.all(
        rooms.map(async (room) => {
          const users = await Promise.all(room.users.map((userId) => fetchUserById(userId)));
          console.log(users)
          return users
            .map((user) => `${user.firstName} ${user.lastName}`)
            .join(", ");
        })
      );
      setChatRoomNames(roomNames);
    };
    fetchChatRooms();
  }, [allChatRooms]);
  console.log(chatRoomNames);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            My Chats
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            All Chats
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">{/* My Chats content goes here. */}</TabPane>
        <TabPane tabId="2">
          <ListGroup>
            {allChatRooms.map((room, index) => (
              <ListGroupItem
                key={room._id}
                onClick={() => setSelectedRoom(room._id)}
                action
              >
                {chatRoomNames[index]}
              </ListGroupItem>
            ))}
          </ListGroup>

          {selectedRoom && (
            <div>
              <h3>Chat History:</h3>
              {messages.map((message) => (
                <p key={message._id}>{message.content}</p>
              ))}
            </div>
          )}
        </TabPane>
      </TabContent>
    </div>
  );
};

export default AdminChat;
