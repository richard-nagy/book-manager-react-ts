import type { FC, JSX, ReactElement } from "react";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "./ui/empty";

type EmptyViewProps = {
    title: string;
    description: string;
    icon?: JSX.Element;
};
const EmptyView: FC<EmptyViewProps> = ({ icon }): ReactElement => {
    return (
        <Empty className="w-full mt-10">
            <EmptyHeader>
                {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
                <EmptyTitle>Loading Book</EmptyTitle>
                <EmptyDescription>
                    Please wait while we are loading the Book.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
};

export default EmptyView;
