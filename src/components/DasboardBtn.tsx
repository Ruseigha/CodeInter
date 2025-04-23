import Link from "next/link"
import { Button } from "./ui/button"
import { SparklesIcon } from "lucide-react"

const DasboardBtn = () => {
  const isCandidate = true // Replace with actual logic to check if the user is a candidate

  if (isCandidate) return null;

  return (
    <Link href={"/dashboard"}>
    <Button className="gap-2 font-medium" size={"sm"}>
      <SparklesIcon className="size-4" />
      Dashboard
    </Button>
  </Link>
  )
}

export default DasboardBtn
