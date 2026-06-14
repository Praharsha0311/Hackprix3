import { JitsiMeeting } from "@jitsi/react-sdk";

export default function VideoCall({
  roomName,
}: {
  roomName: string;
}) {
  return (
    <div className="h-screen w-full">
      <JitsiMeeting
        roomName={roomName}
        getIFrameRef={(iframe) => {
          iframe.style.height = "100vh";
          iframe.style.width = "100%";
        }}
      />
    </div>
  );
}