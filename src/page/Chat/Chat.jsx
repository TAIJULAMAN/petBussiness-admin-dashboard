import { useState, useEffect, useRef } from "react";
import { FiArrowLeft, FiSearch, FiSend, FiMoreVertical } from "react-icons/fi";
import { conversation, users } from ".././../../utils/data";
import { getOtherParticipant } from ".././../../utils/utils";
import ChatListItem from "./ChatListItem";
import MessageBubble from "./MessageBubble";
import PageHeading from "../../shared/PageHeading";

export default function Chat() {
  const [activeConversation, setActiveConversation] = useState(null);
  const [allConversations, setAllConversations] = useState(conversation);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);
  const messagesEndRef = useRef(null);

  const currentUserId = "current-user";
  const currentUser = users.find((user) => user.id === currentUserId);

  const filteredConversations = allConversations.filter((conv) => {
    const otherParticipant = getOtherParticipant(
      conv.participants,
      currentUserId
    );
    return otherParticipant?.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    if (allConversations.length > 0 && !activeConversation) {
      setActiveConversation(allConversations[0]);
    }
  }, [allConversations, activeConversation]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      text: newMessage,
      timestamp: new Date(),
      read: false,
    };

    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, newMsg],
      lastMessageAt: new Date(),
    };

    const updatedConversations = allConversations.map((conv) =>
      conv.id === activeConversation.id ? updatedConversation : conv
    );

    setActiveConversation(updatedConversation);
    setAllConversations(updatedConversations);
    setNewMessage("");
  };

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    if (isMobileView) {
      setShowConversationList(false);
    }
  };

  const handleBackToList = () => {
    setShowConversationList(true);
  };

  return (
    <div className="flex bg-gray-50 overflow-hidden max-h-screen">
      {/* Left sidebar - Conversations */}
      {(!isMobileView || showConversationList) && (
        <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
           <PageHeading title="Chat" />

          <div className="p-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search messenger..."
                className="w-full bg-gray-200 rounded-full py-2 pl-10 pr-4 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <ChatListItem
                key={conversation.id}
                conversation={conversation}
                currentUserId={currentUserId}
                isActive={activeConversation?.id === conversation.id}
                onClick={() => handleSelectConversation(conversation)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Right side - Active conversation */}
      {(!isMobileView || !showConversationList) && activeConversation && (
        <div className="flex flex-col w-full md:w-2/3 overflow-hidden h-[calc(100vh-12rem)]">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMobileView && (
                <button onClick={handleBackToList} className="text-pink-500">
                  <FiArrowLeft className="h-5 w-5" />
                </button>
              )}

              {activeConversation && (
                <>
                  <img
                    src={
                      getOtherParticipant(
                        activeConversation.participants,
                        currentUserId
                      )?.avatar || "/placeholder.svg"
                    }
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold">
                      {
                        getOtherParticipant(
                          activeConversation.participants,
                          currentUserId
                        )?.name
                      }
                    </h2>
                    <p className="text-xs text-pink-500">
                      {getOtherParticipant(
                        activeConversation.participants,
                        currentUserId
                      )?.online
                        ? "online"
                        : "offline"}
                    </p>
                  </div>
                </>
              )}
            </div>
            <button className="text-gray-400">
              <FiMoreVertical className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 p-4 h-[calc(100vh-12rem)] overflow-y-auto">
            <div className="space-y-4">
              {activeConversation.messages.map((message) => {
                const isCurrentUser = message.senderId === currentUserId;
                const sender = isCurrentUser
                  ? currentUser
                  : getOtherParticipant(
                      activeConversation.participants,
                      currentUserId
                    );

                return (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    sender={sender}
                    isCurrentUser={isCurrentUser}
                  />
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Type a message here"
                className="w-full bg-gray-100 rounded-full py-3 px-4 pr-12"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full"
                onClick={handleSendMessage}
              >
                <FiSend className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
