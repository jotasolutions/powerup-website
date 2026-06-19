'use client'

import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"

export function CTAButton() {
  return (
    <Button className="w-full sm:w-auto h-13 sm:h-10" >
      <QrCode className="size-4" />
      Crear carta gratis
    </Button>
  )
}