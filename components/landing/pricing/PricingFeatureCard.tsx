"use client"

import type {
  PricingFeatureIcon,
  PricingPlanFeatureItem,
  PricingProIconVariant,
} from "@/components/landing/pricing-section-data"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  BookOpen,
  Box,
  Calendar,
  CalendarCheck,
  Clock,
  FileText,
  Globe,
  Headphones,
  Languages,
  Layout,
  Link2,
  Mail,
  MapPin,
  Pencil,
  Plus,
  QrCode,
  Smartphone,
  Tag,
  Upload,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react"

const featureIcons: Record<PricingFeatureIcon, LucideIcon> = {
  calendar: Calendar,
  link: Link2,
  "book-open": BookOpen,
  plus: Plus,
  tag: Tag,
  languages: Languages,
  layout: Layout,
  video: Video,
  "calendar-check": CalendarCheck,
  box: Box,
  users: Users,
  globe: Globe,
  "bar-chart": BarChart3,
  "file-text": FileText,
  "map-pin": MapPin,
  headphones: Headphones,
  pencil: Pencil,
  upload: Upload,
  "qr-code": QrCode,
  smartphone: Smartphone,
  clock: Clock,
  mail: Mail,
}

const iconVariantStyles: Record<
  PricingProIconVariant | "free",
  { box: string; icon: string }
> = {
  sell: {
    box: "border-amber-200/60 bg-zinc-600",
    icon: "text-amber-300",
  },
  professional: {
    box: "border-emerald-200/40 bg-zinc-600",
    icon: "text-emerald-300",
  },
  analytics: {
    box: "border-purple-200/40 bg-zinc-600",
    icon: "text-purple-300",
  },
  free: {
    box: "border-emerald-200/60 bg-emerald-50",
    icon: "text-emerald-600",
  },
}

type PricingFeatureCardProps = {
  item: PricingPlanFeatureItem
  iconVariant: PricingProIconVariant | "free"
}

export function PricingFeatureCard({ item, iconVariant }: PricingFeatureCardProps) {
  const Icon = featureIcons[item.icon]
  const styles = iconVariantStyles[iconVariant]

  return (
    <article className="flex items-start gap-4 rounded-2xl p-4">
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-lg border-2",
          styles.box
        )}
      >
        <Icon className={cn("size-6", styles.icon)} strokeWidth={1.75} aria-hidden />
      </div>
      <div className="min-w-0 space-y-1">
        <h4 className="text-base font-medium text-slate-900">{item.title}</h4>
        <p className="text-sm leading-relaxed text-slate-500">{item.description}</p>
      </div>
    </article>
  )
}
