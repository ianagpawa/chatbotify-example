import { useChatWindow } from "react-chatbotify";

export const MyNestedComponent = () => {
  const { toggleChatWindow } = useChatWindow();

  return (
    <button onClick={toggleChatWindow}>Here</button>
  )
};