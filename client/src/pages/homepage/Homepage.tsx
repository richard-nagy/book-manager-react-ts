import SearchField from "@/components/SearchField";
import { Typography } from "@/components/ui/typography";
import type { FC, ReactElement } from "react";
import { Logo } from "@/components/Logo.tsx";

const Homepage: FC = (): ReactElement => {
    return (
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
            <Logo height={70} />
            <Typography variant="muted" disableMobileView className="mb-4">
                Find books and explore their summaries...
            </Typography>
            <SearchField className="" />
        </div>
    );
};

export default Homepage;
