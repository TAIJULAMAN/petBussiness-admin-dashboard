/* eslint-disable react/prop-types */
import { FiFileText } from "react-icons/fi"
import { formatMessageTime } from "../../../utils/utils"

function MessageBubble({ message, sender, isCurrentUser }) {
  return (
    <div className={`flex items-end gap-2 ${isCurrentUser ? "justify-end" : ""}`}>
      {!isCurrentUser && (
        <img
          src={sender.avatar || "/placeholder.svg"}
          alt={sender.name}
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
      )}

      {isCurrentUser && <span className="text-xs text-gray-400">{formatMessageTime(message.timestamp)}</span>}

      <div
        className={`max-w-[70%] p-3 ${
          isCurrentUser
            ? "bg-white border border-gray-200 rounded-t-2xl rounded-bl-2xl"
            : "bg-pink-400 text-white rounded-t-2xl rounded-br-2xl"
        }`}
      >
        {message.text && (
          <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2">
            <p className="whitespace-pre-wrap">{message.text}</p>
          </div>
        )}

        {message.attachments &&
          message.attachments.map((attachment) => (
            <div key={attachment.id} className="mt-2 max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {isCurrentUser ? (
                <>
                  <p className="text-pink-500">({attachment.size})</p>
                  <p className="text-pink-500 font-semibold">{attachment.name}</p>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="bg-pink-300 p-2 rounded-lg">
                    <FiFileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm">{attachment.name}</p>
                    <p className="text-xs">{attachment.size}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>

      {!isCurrentUser && <span className="text-xs text-gray-400">{formatMessageTime(message.timestamp)}</span>}
    </div>
  )
}

export default MessageBubble
