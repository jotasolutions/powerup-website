"use client"

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { SectionContainer } from "./SectionContainer";
import { useNearViewport } from "./use-near-viewport";
import { AdvisorScoreCard } from "./AdvisorScoreCard";
import { AdvisorChecklist } from "./AdvisorChecklist";
import { BorderBeam } from "./BorderBeam";
import { AdvisorMenuScan } from "./AdvisorMenuScan";
import { AdvisorProcessSteps } from "./AdvisorProcessSteps";
import { AdvisorClaims, AdvisorPressSeal } from "./AdvisorProof";

// The form and the Google Maps it loads on mount come in when the section gets within a screen
// of the viewport, so they don't weigh on the page's first load (the blog's AdvisorDialog does the same).
// If its code can't be downloaded (a network cut, or a deploy since the page opened), the
// placeholder stays: a failed import here would otherwise take the whole page down.
const AdvisorWidget = dynamic(
    () =>
        import("../AdvisorWidget")
            .then((module) => module.AdvisorWidget)
            .catch(() => AdvisorWidgetPlaceholder),
    {
        ssr: false,
        loading: () => <AdvisorWidgetPlaceholder />,
    }
);

// Same box and height as the form's first step, measured from 360 to 1440 px wide: its upload
// box is one line shorter from about 453 px. Keeps the page from moving when the form arrives.
function AdvisorWidgetPlaceholder() {
    return (
        <div className="h-[530.5px] w-full max-w-[400px] rounded-xl border border-slate-200 bg-white min-[453px]:h-[510.5px]" />
    );
}

// The left visual tells what the Advisor does, in three beats: the menu is scanned (1), it turns
// into its score (2), and the suggestions tick themselves off (3). It plays once, when the
// section is well in view; people who ask for reduced motion get the last beat straight away.
const STORY_VIEWPORT = { once: true, amount: 0.45, margin: "0px 0px -22% 0px" } as const
const PHASE_STARTS_MS = [0, 1700, 3400]
const pop = { duration: 0.5, ease: [0.7, -0.6, 0.32, 1.6] as const }

export function AdvisorSection() {
    const widgetRef = useRef<HTMLDivElement>(null);
    const isWidgetNear = useNearViewport(widgetRef);
    const storyRef = useRef<HTMLDivElement>(null);
    const isStoryInView = useInView(storyRef, STORY_VIEWPORT);
    const prefersReducedMotion = useReducedMotion();
    const [storyPhase, setStoryPhase] = useState(0);
    const phase = prefersReducedMotion ? 3 : storyPhase;

    useEffect(() => {
        if (!isStoryInView || prefersReducedMotion) return
        const timers = PHASE_STARTS_MS.map((ms, i) => window.setTimeout(() => setStoryPhase(i + 1), ms))
        return () => timers.forEach((id) => window.clearTimeout(id))
    }, [isStoryInView, prefersReducedMotion])

    return (
        <SectionContainer
            id="advisor"
        >
            <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-[#D0F6EA] bg-gradient-to-b from-[#F0FEE2] to-[#E2FEE2] p-5 sm:p-8 md:p-10 lg:flex-row lg:items-center lg:gap-12 lg:p-12">

                <div className="flex-1 space-y-6 lg:space-y-7">
                    <div className="space-y-4">
                        <div ref={storyRef} className="relative h-[200px] w-full sm:h-[270px]">
                            <AnimatePresence>
                                {phase === 1 && (
                                    <motion.div
                                        key="menu"
                                        className="absolute bottom-[6px] left-[8px] z-30 w-[150px] origin-bottom-left sm:w-[214px]"
                                        initial={{ rotate: 0, y: 56, opacity: 0, scale: 0.8 }}
                                        animate={{ rotate: -10, y: 0, opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.92, filter: "blur(4px)", transition: { duration: 0.3 } }}
                                        transition={pop}
                                    >
                                        <div className="overflow-hidden rounded-3xl border border-6 shadow-xl border-white/60">
                                            <AdvisorMenuScan />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <motion.div
                                className="absolute bottom-[6px] left-[8px] z-20 w-[150px] origin-bottom-left sm:w-[214px]"
                                initial={prefersReducedMotion ? false : { rotate: -10, opacity: 0, scale: 0.9 }}
                                animate={phase >= 2 ? { rotate: -10, opacity: 1, scale: 1 } : undefined}
                                transition={pop}
                            >
                                <div className="overflow-hidden rounded-3xl border border-6 shadow-xl border-white/60">
                                    <AdvisorScoreCard play={phase >= 2} />
                                </div>
                            </motion.div>
                            <motion.div
                                className="absolute bottom-[-2px] right-[4px] z-10 w-[134px] origin-bottom-right sm:w-[188px]"
                                initial={prefersReducedMotion ? false : { rotate: 0, opacity: 0, x: -64, scale: 0.8 }}
                                animate={phase >= 3 ? { rotate: 6, opacity: 1, x: 0, scale: 1 } : undefined}
                                transition={pop}
                            >
                                <AdvisorChecklist play={phase >= 3} />
                            </motion.div>
                        </div>
                        <AdvisorProcessSteps phase={phase} />
                    </div>
                    <div className=" space-y-3">
                        <h3 className="plus-darker font-heading text-2xl font-medium opacity-65 sm:text-3xl">Evalúa tu carta GRATIS</h3>
                        <p className="plus-darker opacity-65">Recibe un análisis completo con sugerencias prácticas y <strong className="font-semibold">recomendaciones a medida para aumentar tus ventas hasta un 30%.</strong> Como lo haría un experto.</p>
                    </div>
                    <AdvisorClaims />
                </div>
                <div ref={widgetRef} className="w-full lg:flex-1 flex justify-center lg:justify-end">
                    <div className="w-full max-w-[404px] space-y-4">
                        <BorderBeam>
                            {isWidgetNear ? <AdvisorWidget /> : <AdvisorWidgetPlaceholder />}
                        </BorderBeam>
                        <AdvisorPressSeal />
                    </div>
                </div>

            </div>
        </SectionContainer>
    )
}