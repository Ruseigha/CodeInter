"use client"

import { useState } from "react"  
import ActionCard from "@/components/ActionCard"
import { QUICK_ACTIONS } from "@/constants"
import { useUserRole } from "@/hooks/useUserRole"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useRouter } from "next/navigation"
import MeetingModal from "@/components/MeetingModel"
import LoaderUI from "@/components/LoaderUI"

const HomePage = () => {
  const {isInterviewer, isCandidate, isLoading} = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const router = useRouter();
  const [showModel, setShowModel] = useState(false);
  const [modelType, setModelType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch(title) {
      case "New Call":
        setModelType("start");
        setShowModel(true);
        break;
      case "Join Interview":
        setModelType("join");
        setShowModel(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
        break;
    }
  };

  if (isLoading) return <LoaderUI/>

  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* WELCOME SECTION */}
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Welcome back!
        </h1>
        <p className="text-muted-foreground mt-2">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
      </div>

      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModel}
            onClose={() => setShowModel(false)}
            title={modelType === "start" ? "Start Meeting" : "Join Meeting"}
            isJoinMeeting={modelType === "join"}
          />
        </>) : (
          <div>he</div>
        )}
    </div>
  )
}

export default HomePage