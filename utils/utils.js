import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatMessageTime(date) {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  if (diffInHours > 0) {
    return `${diffInHours}h`;
  }

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  if (diffInMinutes > 0) {
    return `${diffInMinutes}m`;
  }

  return "Just now";
}

export function getOtherParticipant(participants, currentUserId) {
  return participants.find((p) => p.id !== currentUserId);
}

export function getLastMessage(messages) {
  if (messages.length === 0) return null;
  return messages[messages.length - 1];
}
