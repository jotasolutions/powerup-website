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
import { useMemo, useState } from "react"
import { Checkbox } from "./ui/checkbox"
import { Place } from "@/utils/types"
import { submitAdvisorLeadAction } from "@/app/actions/advisor"
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics"
import { useLocale } from "@/lib/locale"
import { advisorCopy, type AdvisorCopy } from "./advisor-copy"
import italianCountryNames from "react-phone-number-input/locale/it.json"

function makeStep1Schema(copy: AdvisorCopy) {
    return z.object({
        name: z
            .string()
            .min(2, copy.step1.nameTooShort)
            .max(32, copy.step1.nameTooLong),
    })
}

function makeStep2Schema(copy: AdvisorCopy) {
    return z.object({
        email: z.string().email(copy.step2.invalidEmail),
        phone: z.string().min(9, copy.step2.invalidPhone),
        role: z.enum(["owner", "manager", "other"]),
        acceptTerms: z.boolean().refine((value) => value, {
            message: copy.step2.termsRequired,
        }),
    })
}

type Step1Values = z.infer<ReturnType<typeof makeStep1Schema>>
type Step2Values = z.infer<ReturnType<typeof makeStep2Schema>>

export function AdvisorWidget() {
    const locale = useLocale();
    const copy = advisorCopy[locale];
    const step1Schema = useMemo(() => makeStep1Schema(copy), [copy]);
    const step2Schema = useMemo(() => makeStep2Schema(copy), [copy]);
    const [status, setStatus] = useState<"step1" | "step2" | "submitting" | "success">("step1");
    const [uploadedFiles, setUploadedFiles] = useState<S3UploadedFile[]>([]);
    const [isUploadingFiles, setIsUploadingFiles] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const importerS3Directory = `advisor`;

    const step1Form = useForm<Step1Values>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            name: "",
        },
    });

    const step2Form = useForm<Step2Values>({
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
            toast.error(copy.step1.noFiles);
            return;
        }
        if (!selectedPlace?.placeId || !selectedPlace.name) {
            toast.error(copy.step1.noPlace);
            return;
        }
        trackEvent(ANALYTICS_EVENTS.ADVISOR_STEP_1, {
            location: "advisor",
            restaurant_name: selectedPlace.name,
            files_count: uploadedFiles.length,
        });
        setStatus("step2");
    }



    async function onStep2Submit(values: Step2Values) {
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

            toast.success(copy.sentTitle, {
                description: copy.sentDescription(step1Form.getValues("name")),
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
                toast.error(copy.invalidWhatsapp);
            } else {
                toast.error(copy.sendFailed);
            }
            setStatus("step2");
        }
    }

    return (
        <div className="w-full max-w-[400px] p-6 bg-white rounded-xl border border-slate-200">


            {status === "step1" && (
                <div className="space-y-2">
                    <h3 className="text-xl font-base font-medium">{copy.step1.title}</h3>
                    <p className="text-sm text-slate-500">
                        {copy.step1.subtitle}
                    </p>

                    <FilesInput2
                        accept="image/png, image/jpeg, application/pdf"
                        s3BucketDirectory={importerS3Directory}
                        onUploadedFiles={setUploadedFiles}
                        onUploadingChange={setIsUploadingFiles}
                        labels={copy.upload}
                    />
                    <RegisterGoogleRestForm onCompleted={setSelectedPlace} copy={copy.restaurant} />
                    <form id="advisor-step1" onSubmit={step1Form.handleSubmit(onStep1Submit)}>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={step1Form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="advisor-step1-name">
                                            {copy.step1.nameLabel}
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="advisor-step1-name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder={copy.step1.namePlaceholder}
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
                        {copy.submit}
                    </Button>
                </div>
            )}

            {(status === "step2" || status === "submitting") && (
                <div className="space-y-2">
                    <h3 className="text-xl font-base font-medium">{copy.step2.title}</h3>


                    <form id="advisor-step2" onSubmit={step2Form.handleSubmit(onStep2Submit)}>
                        <FieldGroup>
                            <Controller
                                name="phone"
                                control={step2Form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="advisor-step2-phone">{copy.step2.phoneLabel}</FieldLabel>
                                        <PhoneInput
                                            defaultCountry={copy.step2.phoneCountry}
                                            placeholder={copy.step2.phonePlaceholder}
                                            labels={locale === "it" ? italianCountryNames : undefined}
                                            searchPlaceholder={copy.step2.countrySearch}
                                            emptyText={copy.step2.countryEmpty}
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
                                            placeholder={copy.step2.emailPlaceholder}
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
                                        <FieldLabel>{copy.step2.roleLabel}</FieldLabel>
                                        <AnimatedTabs
                                            className="w-full"
                                            fullWidth
                                            tabs={[
                                                { label: copy.step2.roles.owner, value: "owner" },
                                                { label: copy.step2.roles.manager, value: "manager" },
                                                { label: copy.step2.roles.other, value: "other" },
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
                                                {copy.step2.termsBefore}<Link className="underline"
                                                    href="/terms">{copy.step2.termsLink}</Link>{copy.step2.termsAfter}</span>
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
                            {status === "submitting" ? copy.submitting : copy.submit}
                        </Button>
                    </div>
                </div>
            )}

            {status === "success" && (
                <div className="p-4 text-sm text-emerald-900">
                    {copy.success}
                </div>
            )}
        </div>
    )
}
