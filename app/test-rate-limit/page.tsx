"use client"

import { useState } from "react"
import { createMeeting, getMeeting, addParticipant, updateAvailability } from "@/app/actions"
import { showRateLimitToast } from "@/components/ui/toast"
import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function TestRateLimitPage() {
  return (
    <Layout>
      <div className="container py-12 space-y-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Rate Limit Testing Dashboard</h1>
          <p className="text-muted-foreground">
            Use this page to test the various rate limiting mechanisms implemented in the application.
          </p>
        </div>
        
        <APIRateLimitTest />
        <Separator />
        
        <CreateMeetingTest />
        <Separator />
        
        <GetMeetingTest />
        <Separator />
        
        <AddParticipantTest />
        <Separator />
        
        <UpdateAvailabilityTest />
      </div>
    </Layout>
  )
}

function APIRateLimitTest() {
  const [results, setResults] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

  async function runTest() {
    setIsRunning(true)
    setResults(["Starting API rate limit test..."])
    
    // Run more requests than our limit allows (60/min)
    for (let i = 1; i <= 65; i++) {
      try {
        const response = await fetch('/api/test-rate-limit')
        const status = response.status
        const remaining = response.headers.get('X-RateLimit-Remaining') || 'N/A'
        
        if (status === 429) {
          const retryAfter = response.headers.get('Retry-After') || 'unknown'
          setResults(prev => [...prev, 
            `Request ${i}: RATE LIMITED (429) - Retry after: ${retryAfter}s`
          ])
          showRateLimitToast()
        } else {
          setResults(prev => [...prev, 
            `Request ${i}: Success (${status}) - Remaining: ${remaining}`
          ])
        }
      } catch (error) {
        setResults(prev => [...prev, 
          `Request ${i}: ERROR - ${error instanceof Error ? error.message : String(error)}`
        ])
      }
      
      // Small delay to make the UI more responsive
      await new Promise(r => setTimeout(r, 50))
    }
    
    setIsRunning(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Rate Limit Test</CardTitle>
        <CardDescription>
          Tests the rate limit of 60 requests per minute for API endpoints.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={runTest}
          disabled={isRunning}
          className="mb-4"
        >
          {isRunning ? "Testing..." : "Run API Test"}
        </Button>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Results:</h3>
          <pre className="bg-muted p-4 rounded h-[200px] overflow-y-auto text-xs">
            {results.join('\n')}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}

function CreateMeetingTest() {
  const [results, setResults] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

  async function runTest() {
    setIsRunning(true)
    setResults(["Starting createMeeting rate limit test..."])
    
    // Run more requests than our limit allows (10/min)
    for (let i = 1; i <= 15; i++) {
      try {
        const result = await createMeeting({
          title: `Test Meeting ${i}`,
          description: "Rate limit test",
          dateRange: ["2023-06-01"],
          timeRange: { start: "09:00", end: "17:00" }
        })
        
        setResults(prev => [...prev, 
          `Request ${i}: ${result.success ? "Success" : "Failed"} - ${result.meetingId || result.error}`
        ])
      } catch (error) {
        setResults(prev => [...prev, 
          `Request ${i}: RATE LIMITED - ${error instanceof Error ? error.message : String(error)}`
        ])
        showRateLimitToast()
      }
      
      // Small delay to make the UI more responsive
      await new Promise(r => setTimeout(r, 50))
    }
    
    setIsRunning(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Meeting Rate Limit Test</CardTitle>
        <CardDescription>
          Tests the rate limit of 10 meeting creations per minute.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={runTest}
          disabled={isRunning}
          className="mb-4"
        >
          {isRunning ? "Testing..." : "Run Create Meeting Test"}
        </Button>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Results:</h3>
          <pre className="bg-muted p-4 rounded h-[200px] overflow-y-auto text-xs">
            {results.join('\n')}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}

function GetMeetingTest() {
  const [results, setResults] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [meetingId, setMeetingId] = useState<string | null>(null)

  async function setupTest() {
    setResults(["Setting up test by creating a test meeting..."])
    try {
      const result = await createMeeting({
        title: "Test Meeting for GetMeeting",
        description: "Rate limit test",
        dateRange: ["2023-06-01"],
        timeRange: { start: "09:00", end: "17:00" }
      })
      
      if (result.success) {
        setMeetingId(result.meetingId ?? null)
        setResults(prev => [...prev, `Test meeting created with ID: ${result.meetingId}`])
      } else {
        setResults(prev => [...prev, `Failed to create test meeting: ${result.error}`])
      }
    } catch (error) {
      setResults(prev => [...prev, `Error creating test meeting: ${error instanceof Error ? error.message : String(error)}`])
    }
  }

  async function runTest() {
    if (!meetingId) {
      await setupTest()
      return
    }
    
    setIsRunning(true)
    setResults(["Starting getMeeting rate limit test..."])
    
    // Run more requests than our limit allows (60/min)
    for (let i = 1; i <= 65; i++) {
      try {
        const result = await getMeeting(meetingId)
        
        setResults(prev => [...prev, 
          `Request ${i}: ${result ? "Success" : "Failed"}`
        ])
      } catch (error) {
        setResults(prev => [...prev, 
          `Request ${i}: RATE LIMITED - ${error instanceof Error ? error.message : String(error)}`
        ])
        showRateLimitToast()
      }
      
      // Small delay to make the UI more responsive
      await new Promise(r => setTimeout(r, 50))
    }
    
    setIsRunning(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Meeting Rate Limit Test</CardTitle>
        <CardDescription>
          Tests the rate limit of 60 meeting retrievals per minute.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={runTest}
          disabled={isRunning}
          className="mb-4"
        >
          {isRunning ? "Testing..." : meetingId ? "Run Get Meeting Test" : "Setup and Run Test"}
        </Button>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Results:</h3>
          <pre className="bg-muted p-4 rounded h-[200px] overflow-y-auto text-xs">
            {results.join('\n')}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}

function AddParticipantTest() {
  const [results, setResults] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [meetingId, setMeetingId] = useState<string | null>(null)

  async function setupTest() {
    setResults(["Setting up test by creating a test meeting..."])
    try {
      const result = await createMeeting({
        title: "Test Meeting for AddParticipant",
        description: "Rate limit test",
        dateRange: ["2023-06-01"],
        timeRange: { start: "09:00", end: "17:00" }
      })
      
      if (result.success) {
        setMeetingId(result.meetingId ?? null)
        setResults(prev => [...prev, `Test meeting created with ID: ${result.meetingId}`])
      } else {
        setResults(prev => [...prev, `Failed to create test meeting: ${result.error}`])
      }
    } catch (error) {
      setResults(prev => [...prev, `Error creating test meeting: ${error instanceof Error ? error.message : String(error)}`])
    }
  }

  async function runTest() {
    if (!meetingId) {
      await setupTest()
      return
    }
    
    setIsRunning(true)
    setResults(["Starting addParticipant rate limit test..."])
    
    // Run more requests than our limit allows (20/min)
    for (let i = 1; i <= 25; i++) {
      try {
        const result = await addParticipant({
          meetingId,
          name: `Test Participant ${i}`,
          availability: {}
        })
        
        setResults(prev => [...prev, 
          `Request ${i}: ${result.success ? "Success" : "Failed"} - ${result.participantId || result.error}`
        ])
      } catch (error) {
        setResults(prev => [...prev, 
          `Request ${i}: RATE LIMITED - ${error instanceof Error ? error.message : String(error)}`
        ])
        showRateLimitToast()
      }
      
      // Small delay to make the UI more responsive
      await new Promise(r => setTimeout(r, 50))
    }
    
    setIsRunning(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Participant Rate Limit Test</CardTitle>
        <CardDescription>
          Tests the rate limit of 20 participant additions per minute.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={runTest}
          disabled={isRunning}
          className="mb-4"
        >
          {isRunning ? "Testing..." : meetingId ? "Run Add Participant Test" : "Setup and Run Test"}
        </Button>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Results:</h3>
          <pre className="bg-muted p-4 rounded h-[200px] overflow-y-auto text-xs">
            {results.join('\n')}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}

function UpdateAvailabilityTest() {
  const [results, setResults] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [testDetails, setTestDetails] = useState<{
    meetingId: string;
    participantId: string;
  } | null>(null)

  async function setupTest() {
    setResults(["Setting up test by creating a test meeting and participant..."])
    try {
      // Create a meeting
      const meetingResult = await createMeeting({
        title: "Test Meeting for UpdateAvailability",
        description: "Rate limit test",
        dateRange: ["2023-06-01"],
        timeRange: { start: "09:00", end: "17:00" }
      })
      
      if (!meetingResult.success || !meetingResult.meetingId) {
        setResults(prev => [...prev, `Failed to create test meeting: ${meetingResult.error || "Missing meeting ID"}`])
        return
      }
      
      setResults(prev => [...prev, `Test meeting created with ID: ${meetingResult.meetingId}`])
      
      // Add a participant
      const participantResult = await addParticipant({
        meetingId: meetingResult.meetingId,
        name: "Test Participant",
        availability: {}
      })
      
      if (!participantResult.success) {
        setResults(prev => [...prev, `Failed to create test participant: ${participantResult.error}`])
        return
      }
      
      setResults(prev => [...prev, `Test participant created with ID: ${participantResult.participantId}`])
      
      if (!participantResult.participantId) {
        setResults(prev => [...prev, `Error: Participant ID is undefined`])
        return
      }
      
      setTestDetails({
        meetingId: meetingResult.meetingId,
        participantId: participantResult.participantId
      })
    } catch (error) {
      setResults(prev => [...prev, `Error during setup: ${error instanceof Error ? error.message : String(error)}`])
    }
  }

  async function runTest() {
    if (!testDetails) {
      await setupTest()
      return
    }
    
    setIsRunning(true)
    setResults(["Starting updateAvailability rate limit test..."])
    
    // Run more requests than our limit allows (30/min)
    for (let i = 1; i <= 35; i++) {
      try {
        const result = await updateAvailability({
          meetingId: testDetails.meetingId,
          participantId: testDetails.participantId,
          availability: { [`slot-${i}`]: true }
        })
        
        setResults(prev => [...prev, 
          `Request ${i}: ${result.success ? "Success" : "Failed"}${result.error ? ` - ${result.error}` : ''}`
        ])
      } catch (error) {
        setResults(prev => [...prev, 
          `Request ${i}: RATE LIMITED - ${error instanceof Error ? error.message : String(error)}`
        ])
        showRateLimitToast()
      }
      
      // Small delay to make the UI more responsive
      await new Promise(r => setTimeout(r, 50))
    }
    
    setIsRunning(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Availability Rate Limit Test</CardTitle>
        <CardDescription>
          Tests the rate limit of 30 availability updates per minute.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={runTest}
          disabled={isRunning}
          className="mb-4"
        >
          {isRunning ? "Testing..." : testDetails ? "Run Update Availability Test" : "Setup and Run Test"}
        </Button>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Results:</h3>
          <pre className="bg-muted p-4 rounded h-[200px] overflow-y-auto text-xs">
            {results.join('\n')}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}
