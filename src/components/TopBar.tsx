import { useIsMobile } from "@/hooks/use-mobile";
import { LogoSize, Page } from "@/lib/types";
import { useMemo, type FC, type ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import SearchField from "./SearchField";
import { ThemeToggle } from "./ThemeToggle";

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
                        size={LogoSize.medium}
                        className="cursor-pointer"
                        iconOnly={isMobile}
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
