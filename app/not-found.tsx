import Link from "next/link"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          The meeting you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex gap-4">
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
          <Link href="/create">
            <Button variant="outline">Create a Meeting</Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

