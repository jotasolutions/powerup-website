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
import { Checkbox } from "./ui/checkbox"
import { validateWhatsappNumber } from "@/server/actions/WhatsappActions"

const step1Schema = z.object({
    name: z
        .string()
        .min(2, "Tu nombre debe tener al menos 2 caracteres.")
        .max(32, "Tu nombre debe tener menos de 32 caracteres."),
})

const step2Schema = z.object({
    email: z.email("Introduce un email válido."),
    phone: z.string().min(9, "Introduce un número de teléfono válido."),
    role: z.enum(["owner", "manager", "other"]),
    acceptTerms: z.boolean().refine((value) => value, {
        message: "Debes aceptar los términos y condiciones.",
    }),
})

export function AdvisorWidget() {
    const [status, setStatus] = useState<"step1" | "step2" | "submitting" | "success">("step2");
    const [uploadedFiles, setUploadedFiles] = useState<S3UploadedFile[]>([]);
    const [isUploadingFiles, setIsUploadingFiles] = useState(false);
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

    function onStep1Submit(_values: z.infer<typeof step1Schema>) {
        if (uploadedFiles.length === 0) {
            toast.error("Sube al menos un archivo antes de continuar.");
            return;
        }
        setStatus("step2");
    }



    async function onStep2Submit(values: z.infer<typeof step2Schema>) {
        setStatus("submitting");
        try {
            await validateWhatsappNumber(values.phone);
        } catch (error) {
            toast.error("El número ingresado no es un número válido de WhatsApp.");
            setStatus("step2");
            return;
        }
        toast.success("Formulario completado", {
            description: `Gracias ${step1Form.getValues("name")}, te contactaremos pronto.`,
        });
        console.log("AdvisorWidget payload", {
            name: step1Form.getValues("name"),
            email: values.email,
            phone: values.phone,
            role: values.role,
            uploadedFiles,
        });
        setStatus("success");
    }

    return (
        <div className="w-full max-w-[400px] p-6 bg-white rounded-xl border border-slate-200">


            {status === "step1" && (
                <div className="space-y-2">
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
                    <RegisterGoogleRestForm onCompleted={(values: unknown) => console.log(values)} />
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
                        className="w-full border-none bg-[#25946F] hover:bg-[#25946F]/90"
                    >
                        Enviar
                    </Button>
                </div>
            )}

            {(status === "step2" || status === "submitting") && (
                <div className="space-y-2">
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
                                                Acepto los <Link target="_blank" className="underline"
                                                    href="https://powerup.menu/terms">Términos y condiciones</Link> y quiero recibir información de como mejorar mi oferta gastronomica</span>
                                        </label>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                    <div className="flex gap-2">

                        <Button
                            type="submit"
                            form="advisor-step2"
                            className="flex-1 border-none bg-[#25946F] hover:bg-[#25946F]/90"
                            disabled={status === "submitting"}
                        >
                            {status === "submitting" ? "Enviando..." : "Enviar"}
                        </Button>
                    </div>
                </div>
            )}

            {status === "success" && (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                    Solicitud enviada correctamente. Te contactaremos en breve.
                </div>
            )}
        </div>
    )
}
