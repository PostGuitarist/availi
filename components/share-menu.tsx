"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Share2, Mail, Copy, Facebook, Twitter, Linkedin, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/lib/toast"

interface ShareMenuProps {
  title: string
  url: string
}

export function ShareMenu({ title, url }: ShareMenuProps) {
  const [copied, setCopied] = useState(false)

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Join my meeting: ${title}`)
    const body = encodeURIComponent(
      `I'd like to invite you to join my meeting. Please mark your availability here: ${url}`,
    )
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const shareViaTwitter = () => {
    const text = encodeURIComponent(`Join my meeting: ${title}`)
    const encodedUrl = encodeURIComponent(url)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`, "_blank")
  }

  const shareViaFacebook = () => {
    const encodedUrl = encodeURIComponent(url)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank")
  }

  const shareViaLinkedin = () => {
    const encodedUrl = encodeURIComponent(url)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, "_blank")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="group">
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Share2 className="mr-2 h-4 w-4 text-indigo-500 transition-transform group-hover:rotate-12" />
            Share
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={shareViaEmail} className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-purple-500" />
            <span>Email</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareViaTwitter} className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Twitter className="h-4 w-4 text-sky-500" />
            <span>Twitter</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareViaFacebook} className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Facebook className="h-4 w-4 text-blue-600" />
            <span>Facebook</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareViaLinkedin} className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Linkedin className="h-4 w-4 text-blue-700" />
            <span>LinkedIn</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

