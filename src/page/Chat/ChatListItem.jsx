/* eslint-disable react/prop-types */
import { FaUserCircle } from "react-icons/fa"
import { formatMessageTime, getOtherParticipant, getLastMessage } from "../../../utils/utils"

function ChatListItem({ conversation, currentUserId, isActive, onClick }) {
  const otherParticipant = getOtherParticipant(conversation.participants, currentUserId)
  const lastMessage = getLastMessage(conversation.messages)

  if (!otherParticipant || !lastMessage) return null

  const isLastMessageFromCurrentUser = lastMessage.senderId === currentUserId
  const messagePreview = lastMessage.attachments?.length ? lastMessage.attachments[0].name : lastMessage.text
  const displayMessage = isLastMessageFromCurrentUser ? `You: ${messagePreview}` : messagePreview

  return (
    <div
      className={`flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer ${
        isActive ? "bg-gray-100" : ""
      }`}
      onClick={onClick}
    >
      {otherParticipant.avatar ? (
        <img
          src={otherParticipant.avatar}
          alt={otherParticipant.name}
          className="w-12 h-12 rounded-full object-cover"
          width={50}
          height={50}
        />
      ) : (
        <FaUserCircle className="w-12 h-12 text-gray-400" />
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold">{otherParticipant.name}</h3>
        <p className="text-sm truncate">{displayMessage}</p>
      </div>
      <span className="text-xs text-gray-400">{formatMessageTime(lastMessage.timestamp)}</span>
    </div>
  )
}

export default ChatListItem
