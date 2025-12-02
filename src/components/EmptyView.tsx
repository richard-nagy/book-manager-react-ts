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
const EmptyView: FC<EmptyViewProps> = ({ icon, title, description }): ReactElement => {
    return (
        <Empty className="w-full mt-10">
            <EmptyHeader>
                {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>
                    {description}
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
};

export default EmptyView;
