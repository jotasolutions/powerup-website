import React, { useEffect, useRef, useState } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadScript } from "@react-google-maps/api";
import { Place } from '@/utils/types';
import { toast } from "sonner"
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import SelectedPlaceCard from '../SelectedPlaceCard';

function RegisterGoogleRestForm({ onCompleted }: { onCompleted: any }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: ["places"]
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState({});
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

    useEffect(() => {
        if (!isLoaded || loadError) return;
        const options = {
            componentRestrictions: { country: "es" },
            fields: ["address_components", "geometry", "name", "photos", "business_status", "type", "place_id"]
        };
        if (inputRef.current) {
            const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
            autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));
        }

    }, [isLoaded, loadError]);

    const handleChange = (newAddress: string) => {
        console.log(newAddress);
        setInput((values) => ({ ...values, streetAddress: newAddress }));
    };

    const handlePlaceChanged = async (address: any) => {
        if (!isLoaded) return;

        const place = address.getPlace();
        const allowedTypes = ["restaurant", "pub", "night_club", "restaurant", "food", "meal_delivery", "meal_takeaway", "point_of_interest", "establishment", "bakery", "bar", "cafe"];

        if (!place || !place.geometry || !allowedTypes.includes(place.types[0])) {
            setInput({});
            toast.error('No se encontró un lugar válido');
            return;
        }
        if (place) {
            const componentMap: Record<string, string> = {
                subPremise: "",
                premise: "",
                street_number: "",
                route: "",
                country: "",
                postal_code: "",
                administrative_area_level_2: "",
                administrative_area_level_1: "",
            };
            for (const component of place.address_components) {
                const componentType = component.types[0];
                if (componentType in componentMap) {
                    componentMap[componentType] = component.long_name;
                }
            }

            setSelectedPlace({
                address: componentMap.route,
                city: componentMap.administrative_area_level_2,
                name: place.name,
                postalCode: componentMap.postal_code,
                photoUrl: place.photos[0].getUrl(),
                state: componentMap.administrative_area_level_1,
                placeId: place.place_id,
                streetNumber: componentMap.street_number,
                photos: place.photos.map((photo: any) => {
                    return {
                        url: photo.getUrl(),
                        name: "rest image",
                        id: undefined
                    }
                })
            })
        }
        formData(place);
    };

    const formData = (data: any) => {
        const addressComponents = data?.address_components;

        const componentMap: Record<string, string> = {
            subPremise: "",
            premise: "",
            street_number: "",
            route: "",
            country: "",
            postal_code: "",
            administrative_area_level_2: "",
            administrative_area_level_1: "",
        };

        for (const component of addressComponents) {
            const componentType = component.types[0];
            if (componentType in componentMap) {
                componentMap[componentType] = component.long_name;
            }
        }

        const formattedAddress =
            `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}`.trim();
        const latitude = data?.geometry?.location?.lat();
        const longitude = data?.geometry?.location?.lng();

        setInput((values) => ({
            ...values,
            streetAddress: formattedAddress,
            country: componentMap.country,
            zipCode: componentMap.postal_code,
            city: componentMap.administrative_area_level_1,
            state: componentMap.administrative_area_level_2,
            latitude: latitude,
            longitude: longitude,
        }));
    };

    const formSchema = z.object({
        name: z.string().min(2, {
            message: 'El nombre es requerido',
        })


    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: {
            name: ""
        }
    })


    function onFormSubmit(values: any) {
        console.log(values);
        console.log(selectedPlace);
        if (!selectedPlace) {
            toast.error('No se encontró un lugar válido');
            return;
        };

        onCompleted({
            place: {
                ...selectedPlace
            },
            type: values.type,
        })
    }


    return (
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onFormSubmit)}>
                <div className="flex flex-col gap-4 mt-4">

                    <FieldGroup>





                        {selectedPlace ? (
                            <SelectedPlaceCard place={selectedPlace} onRemove={() => setSelectedPlace(null)} />
                        ) : (
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            Restaurante
                                        </FieldLabel>
                                        <Input
                                            onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                                            placeholder="La Taberna de las brasas"
                                            {...field}
                                            ref={inputRef}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        )}
                    </FieldGroup>

                </div>
              
            </form>
        </form>
    )
}

export default RegisterGoogleRestForm;
