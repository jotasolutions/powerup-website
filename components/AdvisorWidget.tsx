"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { AnimatedTabs } from "@/components/ui/animated-tabs"
import { PhoneInput } from "@/components/ui/phone-input"

import RegisterGoogleRestForm from "./forms/RegisterGoogleRestForm"
import FilesInput2, { S3UploadedFile } from "./files-input2"
import { useState } from "react"
import { CircleCheck } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { Checkbox } from "./ui/checkbox"
import { Place } from "@/utils/types"
import { submitAdvisorLeadAction } from "@/app/actions/advisor"
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics"

const step1Schema = z.object({
    name: z
        .string()
        .min(2, "Tu nombre debe tener al menos 2 caracteres.")
        .max(32, "Tu nombre debe tener menos de 32 caracteres."),
})

const step2Schema = z.object({
    email: z.string().email("Introduce un email válido."),
    phone: z.string().min(9, "Introduce un número de teléfono válido."),
    role: z.enum(["owner", "manager", "other"]),
    acceptTerms: z.boolean().refine((value) => value, {
        message: "Debes aceptar los términos y condiciones.",
    }),
})

// Darker than the brand green so the button stands out on the light green section.
const submitButtonClass = "h-10 w-full border-none bg-[#1E7F5F] font-semibold shadow-md shadow-[#1E7F5F]/25 hover:bg-[#186A4F]"

function StepProgress({ step }: { step: 1 | 2 }) {
    return (
        <div className="mb-3 space-y-1.5" aria-label={`Paso ${step} de 2`}>
            <div className="text-xs font-medium text-slate-500">Paso {step} de 2</div>
            <div className="flex gap-1.5">
                <div className="h-1 flex-1 rounded-full bg-[#25946F]" />
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <motion.div
                        className="h-full rounded-full bg-[#25946F]"
                        initial={{ width: 0 }}
                        animate={{ width: step === 2 ? "100%" : 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                </div>
            </div>
        </div>
    )
}

export function AdvisorWidget() {
    const prefersReducedMotion = useReducedMotion()
    // Each step slides in when it appears; the first one is already on screen.
    const stepEnter = prefersReducedMotion
        ? {}
        : { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.3, ease: "easeOut" as const } }
    const [status, setStatus] = useState<"step1" | "step2" | "submitting" | "success">("step1");
    const [uploadedFiles, setUploadedFiles] = useState<S3UploadedFile[]>([]);
    const [isUploadingFiles, setIsUploadingFiles] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const importerS3Directory = `advisor`;

    const step1Form = useForm<z.infer<typeof step1Schema>>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            name: "",
        },
    });

    const step2Form = useForm<z.infer<typeof step2Schema>>({
        resolver: zodResolver(step2Schema),
        defaultValues: {
            email: "",
            phone: "",
            role: "other",
            acceptTerms: false,
        },
    });

    function onStep1Submit() {
        if (uploadedFiles.length === 0) {
            toast.error("Sube al menos un archivo antes de continuar.");
            return;
        }
        if (!selectedPlace?.placeId || !selectedPlace.name) {
            toast.error("Selecciona un restaurante válido antes de continuar.");
            return;
        }
        trackEvent(ANALYTICS_EVENTS.ADVISOR_STEP_1, {
            location: "advisor",
            restaurant_name: selectedPlace.name,
            files_count: uploadedFiles.length,
        });
        setStatus("step2");
    }



    async function onStep2Submit(values: z.infer<typeof step2Schema>) {
        setStatus("submitting");
        try {
            const actionResult = await submitAdvisorLeadAction({
                name: step1Form.getValues("name"),
                email: values.email,
                phone: values.phone,
                restaurantName: selectedPlace?.name ?? "",
                role: values.role,
                files: uploadedFiles,
                placeId: selectedPlace?.placeId,
                imageUrl: selectedPlace?.photoUrl,
            });

            if (!actionResult.success) {
                throw new Error(actionResult.error || "advisor_submit_failed");
            }

            toast.success("Formulario completado", {
                description: `Gracias ${step1Form.getValues("name")}, te contactaremos pronto.`,
            });
            trackEvent(ANALYTICS_EVENTS.GENERATE_LEAD, {
                location: "advisor",
                form_name: "advisor",
                restaurant_name: selectedPlace?.name ?? "",
                role: values.role,
            });
            setStatus("success");
        } catch (error) {
            console.log(error);
            if (error instanceof Error && error.message === "invalid_whatsapp_number") {
                toast.error("El número ingresado no es un número válido de WhatsApp.");
            } else {
                toast.error("No hemos podido enviar tu solicitud. Inténtalo de nuevo.");
            }
            setStatus("step2");
        }
    }

    return (
        <div className="w-full max-w-[400px] p-6 bg-white rounded-xl border border-slate-200">


            {status === "step1" && (
                <div className="space-y-2">
                    <StepProgress step={1} />
                    <h3 className="text-xl font-base font-medium">Calcula tu nota ahora</h3>
                    <p className="text-sm text-slate-500">
                        Descubre cómo mejorar tu carta para aumentar tus ventas
                    </p>

                    <FilesInput2
                        accept="image/png, image/jpeg, application/pdf"
                        s3BucketDirectory={importerS3Directory}
                        onUploadedFiles={setUploadedFiles}
                        onUploadingChange={setIsUploadingFiles}
                    />
                    <RegisterGoogleRestForm onCompleted={setSelectedPlace} />
                    <form id="advisor-step1" onSubmit={step1Form.handleSubmit(onStep1Submit)}>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={step1Form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="advisor-step1-name">
                                            Tu nombre
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="advisor-step1-name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Juan Pérez"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                    <Button
                        type="submit"
                        form="advisor-step1"
                        disabled={isUploadingFiles}
                        className={submitButtonClass}
                    >
                        Calcular mi nota
                    </Button>
                </div>
            )}

            {(status === "step2" || status === "submitting") && (
                <motion.div className="space-y-2" {...stepEnter}>
                    <StepProgress step={2} />
                    <h3 className="text-xl font-base font-medium">Recibe tu informe</h3>


                    <form id="advisor-step2" onSubmit={step2Form.handleSubmit(onStep2Submit)}>
                        <FieldGroup>
                            <Controller
                                name="phone"
                                control={step2Form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="advisor-step2-phone">Teléfono</FieldLabel>
                                        <PhoneInput
                                            defaultCountry="ES"
                                            placeholder="646 87 63 91"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="email"
                                control={step2Form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="advisor-step2-email">Email</FieldLabel>
                                        <Input
                                            {...field}
                                            id="advisor-step2-email"
                                            type="email"
                                            placeholder="juan@email.com"
                                            autoComplete="email"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="role"
                                control={step2Form.control}
                                render={({ field }) => (
                                    <Field>
                                        <FieldLabel>Qué rol te define mejor</FieldLabel>
                                        <AnimatedTabs
                                            className="w-full"
                                            fullWidth
                                            tabs={[
                                                { label: "Propietario", value: "owner" },
                                                { label: "Gerente", value: "manager" },
                                                { label: "Otro", value: "other" },
                                            ]}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        />
                                    </Field>
                                )}
                            />
                            <Controller
                                name="acceptTerms"
                                control={step2Form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <label className="flex items-start gap-3 text-sm">
                                            <Checkbox id="advisor-step2-accept-terms" checked={field.value}
                                                onCheckedChange={field.onChange} />
                                            <span className="leading-relaxed inline-block text-xs">
                                                Acepto los <Link className="underline"
                                                    href="/terms">Términos y condiciones</Link> y quiero recibir información de cómo mejorar mi oferta gastronómica</span>
                                        </label>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                    <Button
                        type="submit"
                        form="advisor-step2"
                        className={submitButtonClass}
                        disabled={status === "submitting"}
                    >
                        {status === "submitting" ? "Enviando..." : "Recibir mi informe"}
                    </Button>
                </motion.div>
            )}

            {status === "success" && (
                <motion.div className="flex flex-col items-center gap-3 p-4 text-center text-sm text-emerald-900" {...stepEnter}>
                    <motion.div
                        initial={prefersReducedMotion ? false : { scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                    >
                        <CircleCheck className="size-12 text-[#25946F]" strokeWidth={1.75} />
                    </motion.div>
                    Solicitud enviada correctamente. Te contactaremos en breve.
                </motion.div>
            )}
        </div>
    )
}
