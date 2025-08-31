import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';
import { TopBanner } from '@/components/TopBanner';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <TopBanner />
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            <ChatArea />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}