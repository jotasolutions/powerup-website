import * as React from "react"
import {Media} from "@/utils/types";
import {useState} from "react";
import {Upload} from "antd";
import { FolderUpIcon } from "lucide-react";

const {Dragger} = Upload;

export interface InputProps {
    onChange: Function
    className?: string
    name: string
    initialMedia?: Media,
    beforeUpload?: any,
    accept?: string

}

const FilesInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({onChange, accept, beforeUpload, name, className, initialMedia, ...props}, ref) => {
        const [files, setFiles] = useState([]);
        const dummyRequest = ({file, onSuccess}: any) => {
            setTimeout(() => {
                onSuccess("ok");
            }, 0);
        };
        return (
            <div >
                <Dragger {...props}
                         accept={accept}
                         name={name}
                         customRequest={dummyRequest}
                         multiple={true}
                         onChange={(file: any) => {
                             onChange(file.fileList);
                         }}>
                    <div className="flex flex-col justify-center items-center px-5 py-4">
                        <FolderUpIcon className="text-gray-400 size-6" strokeWidth={1.5}/>
                        <div className="body-medium mt-2 text-gray-500">Subir archivo</div>

                    </div>
                </Dragger>


            </div>
        )
    }
)
FilesInput.displayName = "FilesInput"

export {FilesInput}
