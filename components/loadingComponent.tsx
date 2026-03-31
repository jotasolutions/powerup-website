'use client'

import { Infinity } from 'ldrs/react'
import 'ldrs/react/Infinity.css'



interface LoadingProps {
    text?: string
}

const LoadingComponent = (props: LoadingProps) => {
    return (
        <div className="w-full flex items-center flex-col">

            <Infinity
                size="55"
                stroke="4"
                strokeLength="0.15"
                bgOpacity="0.1"
                speed="1.3"
                color="black"
            />
            {props.text && <div className="mt-4 text-sm text-muted-foreground">{props.text}</div>}

        </div>
    )
}
export default LoadingComponent;
