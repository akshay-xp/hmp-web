import { SigninForm } from "@/components/signin-form"
import { createFileRoute, Link } from "@tanstack/react-router"
import { GalleryVerticalEnd } from "lucide-react"

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-black">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Reverse Int.
        </Link>
        <SigninForm />
      </div>
    </div>
  )
}
