import { useRouter } from "next/navigation";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";


const useMeetingActions = () => {
  const router = useRouter();
  const client = useStreamVideoClient();

  const createInstantMeeting = async () => {
    if (!client) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: "Instant meeting",
          }
        }
      })

      router.push(`/meeting/${id}`);
      toast.success("Meeting created successfully");
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast.error("Failed to create meeting. Please try again.");
    }
  };

  const joinMeeting = (meetingId: string) => {
    if (!client) return toast.error("Failed to join meeting. Please try again.");
    router.push(`/meeting/${meetingId}`);
    toast.success("Joining meeting...");
  }
  
  return {
    createInstantMeeting,
    joinMeeting,
  };
};

export default useMeetingActions;