"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock, Users } from "lucide-react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <Layout>
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Find the perfect time to meet with everyone
                </motion.h1>
                <motion.p
                  className="max-w-[600px] text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Create a meeting, share a link, and let participants mark their availability. Availi automatically
                  finds the best time for everyone.
                </motion.p>
              </div>
              <motion.div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/create">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="group">
                      Create a Meeting
                      <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/how-it-works">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative h-[350px] w-full overflow-hidden rounded-xl border bg-background p-4 shadow-xl sm:h-[400px] lg:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50" />
                <div className="relative z-10 grid h-full grid-cols-7 gap-2">
                  <div className="flex flex-col items-center justify-start pt-8">
                    <div className="text-sm font-medium text-muted-foreground">Mon</div>
                    <div className="mt-2 grid gap-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 w-12 rounded-md ${i % 3 === 0 ? "bg-primary/80" : i % 3 === 1 ? "bg-primary/40" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start pt-8">
                    <div className="text-sm font-medium text-muted-foreground">Tue</div>
                    <div className="mt-2 grid gap-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 w-12 rounded-md ${i % 3 === 1 ? "bg-primary/80" : i % 3 === 2 ? "bg-primary/40" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start pt-8">
                    <div className="text-sm font-medium text-muted-foreground">Wed</div>
                    <div className="mt-2 grid gap-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 w-12 rounded-md ${i % 3 === 2 ? "bg-primary/80" : i % 3 === 0 ? "bg-primary/40" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start pt-8">
                    <div className="text-sm font-medium text-muted-foreground">Thu</div>
                    <div className="mt-2 grid gap-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 w-12 rounded-md ${i % 3 === 0 ? "bg-primary/80" : i % 3 === 2 ? "bg-primary/40" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start pt-8">
                    <div className="text-sm font-medium text-muted-foreground">Fri</div>
                    <div className="mt-2 grid gap-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 w-12 rounded-md ${i % 3 === 1 ? "bg-primary/80" : i % 3 === 0 ? "bg-primary/40" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start pt-8">
                    <div className="text-sm font-medium text-muted-foreground">Sat</div>
                    <div className="mt-2 grid gap-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 w-12 rounded-md ${i === 2 || i === 3 ? "bg-primary/80" : i === 4 ? "bg-primary/40" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start pt-8">
                    <div className="text-sm font-medium text-muted-foreground">Sun</div>
                    <div className="mt-2 grid gap-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 w-12 rounded-md ${i === 5 || i === 6 ? "bg-primary/80" : i === 4 ? "bg-primary/40" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                How It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Fast, Effective</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find the perfect meeting time in just a few steps
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <motion.div
              className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Create a Meeting</h3>
              <p className="text-center text-muted-foreground">
                Set up your meeting with multiple time slots and get a unique link to share.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Share with Participants</h3>
              <p className="text-center text-muted-foreground">
                Invite participants to mark their availability using the secure link.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Find the Best Time</h3>
              <p className="text-center text-muted-foreground">
                The app automatically identifies the best times when everyone is available.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

