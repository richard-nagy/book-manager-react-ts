import { useIsMobile } from "@/hooks/use-mobile";
import { Page } from "@/lib/types";
import { type FC, type ReactElement, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchField from "./SearchField";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "@/components/Logo.tsx";

const TopBar: FC = (): ReactElement => {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useIsMobile();

    const isHomePage = useMemo(
        () => location.pathname === `/${Page.homepage}`,
        [location.pathname],
    );

    return (
        <div className="flex justify-between items-center w-full sticky top-0 p-3">
            {!isHomePage ?
                <>
                    <Logo
                        className="cursor-pointer"
                        noText={isMobile}
                        height={36}
                        onClick={() => navigate(Page.homepage)}
                    />
                    <SearchField showBackButton isDialogViewAllowed />
                </>
            :   <span />}
            <div className={"flex justify-end w-auto md:w-38"}>
                <ThemeToggle />
            </div>
        </div>
    );
};

export default TopBar;
