// Mock users
export const users = [
  {
    id: "current-user",
    name: "You",
    avatar: "https://avatar.iran.liara.run/public/41",
    online: true,
  },
  {
    id: "user-1",
    name: "Nika Jerrardo",
    avatar: "https://avatar.iran.liara.run/public/42",
    online: true,
  },
  {
    id: "user-2",
    name: "Jeff Bezos",
    avatar: "https://avatar.iran.liara.run/public/43",
    online: false,
  },
  {
    id: "user-3",
    name: "Elon Musk",
    avatar: "https://avatar.iran.liara.run/public/44",
    online: false,
  },
  {
    id: "user-4",
    name: "Tesla",
    avatar: "https://avatar.iran.liara.run/public/45",
    online: false,
  },
  {
    id: "user-5",
    name: "Space x",
    avatar: "https://avatar.iran.liara.run/public/46",
    online: false,
  },
  {
    id: "user-6",
    name: "Bruce lee",
    avatar: "https://avatar.iran.liara.run/public/47",
    online: false,
  },
]

// Mock attachments
export const attachments = [
  {
    id: "attachment-1",
    name: "Style",
    type: "file",
    size: "484 kb",
    url: "#",
  },
  {
    id: "attachment-2",
    name: "NEW_style.zip",
    type: "zip",
    size: "20.06 Mb",
    url: "#",
  },
]

// Mock messages
export const messages = {
  "conv-1": [
    {
      id: "msg-1",
      senderId: "user-1",
      text: "Hello! Finally found the time to write to you! I need your help in creating interactive animations for my mobile application.",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      read: true,
    },
    {
      id: "msg-2",
      senderId: "user-1",
      text: "Can I send you files?",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
    },
    {
      id: "msg-3",
      senderId: "current-user",
      text: "Hey! Okay, send out.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000), // 3 days ago + 1 hour
      read: true,
    },
    {
      id: "msg-4",
      senderId: "user-1",
      text: "",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 3 days ago + 2 hours
      attachments: [attachments[0]],
      read: true,
    },
    {
      id: "msg-5",
      senderId: "current-user",
      text: "Hello! I received everything you asked. I am sending the finished file.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      attachments: [attachments[1]],
      read: true,
    },
  ],
  "conv-2": [
    {
      id: "msg-6",
      senderId: "user-2",
      text: "Good idea! I like this...",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
    },
  ],
  "conv-3": [
    {
      id: "msg-7",
      senderId: "user-3",
      text: "I hate u!!! you stole my money!",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      read: true,
    },
  ],
  "conv-4": [
    {
      id: "msg-8",
      senderId: "user-4",
      text: "This is so good man.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: true,
    },
  ],
  "conv-5": [
    {
      id: "msg-9",
      senderId: "user-5",
      text: "How to make this &^%!?",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      read: true,
    },
  ],
  "conv-6": [
    {
      id: "msg-10",
      senderId: "current-user",
      text: "I like you",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: true,
    },
  ],
}

// Mock conversations
export const conversation = [
  {
    id: "conv-1",
    participants: [users[0], users[1]],
    messages: messages["conv-1"],
    lastMessageAt: messages["conv-1"][messages["conv-1"].length - 1].timestamp,
  },
  {
    id: "conv-2",
    participants: [users[0], users[2]],
    messages: messages["conv-2"],
    lastMessageAt: messages["conv-2"][messages["conv-2"].length - 1].timestamp,
  },
  {
    id: "conv-3",
    participants: [users[0], users[3]],
    messages: messages["conv-3"],
    lastMessageAt: messages["conv-3"][messages["conv-3"].length - 1].timestamp,
  },
  {
    id: "conv-4",
    participants: [users[0], users[4]],
    messages: messages["conv-4"],
    lastMessageAt: messages["conv-4"][messages["conv-4"].length - 1].timestamp,
  },
  {
    id: "conv-5",
    participants: [users[0], users[5]],
    messages: messages["conv-5"],
    lastMessageAt: messages["conv-5"][messages["conv-5"].length - 1].timestamp,
  },
  {
    id: "conv-6",
    participants: [users[0], users[6]],
    messages: messages["conv-6"],
    lastMessageAt: messages["conv-6"][messages["conv-6"].length - 1].timestamp,
  },
]