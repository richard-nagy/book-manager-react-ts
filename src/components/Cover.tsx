import { useIsMobile } from "@/hooks/use-mobile";
import { CircleQuestionMark } from "lucide-react";
import type { FC, ReactElement } from "react";

type CoverProps = {
    /** Alternate text for an image. */
    alt: string;
    /** Width in rem (1 will equal to 4 pixels). */
    width?: number;
    /** Height in rem (1 will equal to 4 pixels). */
    height?: number;
    /** Source of the image. */
    src?: string;
    /** ClassName for the Cover Container element. */
    className?: string;
};
const Cover: FC<CoverProps> = ({
    src,
    alt,
    className,
    height,
    width,
}): ReactElement => {
    const isMobile = useIsMobile();

    const calculatedWidth = width ?? (isMobile ? 20 : 50);
    const calculatedHeight = height ?? (isMobile ? 30 : 75);

    return (
        <div
            className={`bg-background max-w-${calculatedWidth} w-${calculatedWidth} max-h-${calculatedHeight} h-${calculatedHeight} flex justify-center items-center shrink-0 ${className ?? ""}`}
        >
            {src ?
                <img
                    src={src}
                    alt={alt}
                    className="object-contain w-full h-full"
                />
                : <CircleQuestionMark className="text-muted-foreground" />}
        </div>
    );
};

export default Cover;
