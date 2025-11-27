import EmptyView from "@/components/EmptyView";
import { Spinner } from "@/components/ui/spinner";
import { TypographyMuted } from "@/components/ui/typography";
import { useBookSearch } from "@/context/BookSearchContext";
import type { Volume } from "@/utils/types";
import { CircleQuestionMark } from "lucide-react";
import { useEffect, useState, type FC, type ReactElement } from "react";
import { useParams } from "react-router-dom";

const Book: FC = (): ReactElement => {
    const { id } = useParams();
    const { volumeFetchIsLoading, getBookByVolumeId } = useBookSearch();

    const [volume, setVolume] = useState<Volume | null>(null);

    useEffect(() => {
        if (id) {
            getBookByVolumeId(id).then((v) => {
                setVolume(v);
            });
        }
    }, [getBookByVolumeId, id]);

    if (volumeFetchIsLoading) {
        return (
            <EmptyView
                icon={<Spinner />}
                title="Loading the Book..."
                description="Please wait while we are loading the Book."
            />
        );
    }

    if (volume === null) {
        return (
            <EmptyView
                icon={<CircleQuestionMark />}
                title="No Book was found..."
                description="We couldn't find the book."
            />
        );
    }

    return (
        <>
            <img
                src={
                    volume.volumeInfo?.imageLinks?.smallThumbnail ??
                    "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop"
                }
                alt={volume.id + "img"}
                className="w-50 object-cover mb-2"
            />
            {(volume.volumeInfo?.authors?.length ?? 0) > 0 ?
                volume.volumeInfo?.authors?.map((a, i) => (
                    <TypographyMuted>
                        {a}
                        {i + 1 !== (volume.volumeInfo?.authors.length ?? 0) &&
                            ","}
                    </TypographyMuted>
                ))
            :   <TypographyMuted className="italic">
                    � Unknown author(s)
                </TypographyMuted>
            }
            <div className="mt-2">{volume.volumeInfo.title}</div>
        </>
    );
};

export default Book;
