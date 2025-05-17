import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex flex-col md:flex-row items-center justify-center pt-8 md:pt-20 px-2 md:px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl min-h-screen flex flex-col md:flex-row overflow-auto pb-8">
          <Sidebar />

          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
