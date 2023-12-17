"use client";

import { unsplash } from "@/lib/unsplash";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link"
import Image from "next/image";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
};

export const FormPicker = ({ id, errors }:
    FormPickerProps) => {

    const { pending } = useFormStatus();

    const [images, setImages] = useState<Array<Record<string, any>>>([])
    const [isLoading, setLoading] = useState<boolean>(true);
    const [selectedImageId, setImageID] = useState(null)

    useEffect(() => {

        const fetchImages = async () => {
            try {
                const resp = await unsplash.photos.getRandom({
                    collectionIds: ["317099"],
                    count: 9
                })

                if (resp && resp.response) {
                    const resImages = resp.response as Array<Record<string, any>>
                    setImages(resImages)
                    toast.success("Fetched Successfull")

                }

                else {
                    toast.error("Fetch Images")
                }


            }
            catch (err: any) {
                console.log({ err })
                setImages([])
                toast.error("Fetch Images")
            }
            finally {
                setLoading(false);
            }
        }

        fetchImages();
    }, [])

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 mb-2">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={cn(
                            "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                            pending && "opacity-50 hover:opacity-50 cursor-auto"
                        )}
                        onClick={() => {
                            if (pending) return;
                            setImageID(image.id);
                        }}
                    >
                        <input
                            type="radio"
                            id={id}
                            name={id}
                            className="hidden"
                            checked={selectedImageId === image.id}
                            disabled={pending}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                        />
                        <Image
                            src={image.urls.thumb}
                            alt="Unsplash image"
                            className="object-cover rounded-sm"
                            fill
                        />
                        {selectedImageId === image.id && (
                            <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" />
                            </div>
                        )}
                        <Link
                            href={image.links.html}
                            target="_blank"
                            className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}