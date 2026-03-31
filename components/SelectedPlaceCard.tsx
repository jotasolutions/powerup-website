'use client'
import React from 'react';
import LoadingComponent from './loadingComponent';
import { Place } from '@/utils/types';
import { Button } from './ui/button';
import { TrashIcon } from 'lucide-react';

function SelectedPlaceCard({place, onRemove}: { place: Place, onRemove?: any }) {
    if(!place){
        return <LoadingComponent/>
    }
    return (
        <div
            className="flex gap-10 justify-between items-start p-2  w-full rounded-xl bg-slate-50 dark:bg-slate-700">
            <div className="flex gap-4 flex-row">
                <img loading="lazy" src={place.photoUrl} alt={`${place.name} restaurant`}
                     className="object-cover self-stretch rounded-lg aspect-square w-[70px] h-[70px] bg-slate-200"/>
                <div className="flex flex-col">
                    <div className="font-medium text-sm text-slate-900 dark:text-slate-100">{place.name}</div>
                    <p className="hidden sm:block mt-1 text-slate-700 dark:text-slate-300  text-xs">{place.address} {place.streetNumber}, {place.city}</p>
                </div>
            </div>
            {onRemove && <Button variant="ghost" className=" border-none" onClick={onRemove} >
                <TrashIcon className="w-4 h-4 text-red-500 hover:text-red-600" />
            </Button>}
        </div>
    )
}

export default SelectedPlaceCard;
