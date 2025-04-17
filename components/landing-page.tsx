import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, FileCheck, Share2, FolderPlus, Upload } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <section className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Custom Checklist Builder</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create, organize, and share customizable checklists with file attachments for any project or workflow.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button asChild size="lg">
            <Link href="/login">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<FolderPlus className="h-8 w-8" />}
          title="Organize with Categories"
          description="Create structured checklists with categories and items to keep everything organized."
        />
        <FeatureCard
          icon={<Upload className="h-8 w-8" />}
          title="File Attachments"
          description="Attach multiple files to any checklist item for comprehensive documentation."
        />
        <FeatureCard
          icon={<Share2 className="h-8 w-8" />}
          title="Collaborative Sharing"
          description="Share checklists with team members and allow them to upload files."
        />
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Create a Checklist</h3>
            <p className="text-muted-foreground">Design custom checklists with categories and items</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <FileCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Add Files & Details</h3>
            <p className="text-muted-foreground">Attach files and information to each checklist item</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Share & Collaborate</h3>
            <p className="text-muted-foreground">Share with others and track progress together</p>
          </div>
        </div>
      </section>

      <section className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get organized?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Join thousands of users who use our checklist builder to streamline their workflows.
        </p>
        <Button asChild size="lg">
          <Link href="/login">Sign Up for Free</Link>
        </Button>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="text-primary mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
