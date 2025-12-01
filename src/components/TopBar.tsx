import { LogoSize, Page } from "@/lib/types";
import { useMemo, type FC, type ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import SearchField from "./SearchField";
import { SettingsDropDown } from "./SettingsDropdown";
import { ThemeToggle } from "./ThemeToggle";

const TopBar: FC = (): ReactElement => {
    const navigate = useNavigate();

    const location = useLocation();

    const isHomePage = useMemo(
        () => location.pathname === `/${Page.homepage}`,
        [location.pathname],
    );

    return (
        <div className="flex justify-between w-full sticky top-0 p-3">
            {!isHomePage
                ? <>
                    <Logo
                        size={LogoSize.medium}
                        className="cursor-pointer"
                        onClick={() => navigate(Page.homepage)}
                    />
                    <SearchField showBackButton />
                </>
                : <span />
            }
            <div className="flex gap-2">
                <ThemeToggle />
                <SettingsDropDown />
            </div>
        </div>
    );
};

export default TopBar;
