import { BookFinder } from "@/lib/Icons";
import { LogoSize } from "@/lib/types";
import { getLogoSize } from "@/lib/utils";
import type { FC, ReactElement } from "react";
import { TypographyH2, TypographyH3, TypographyH4 } from "./ui/typography";

const appName = "Book Finder";

type LogoProps = {
    /** Size of the logo. */
    size: LogoSize;
    /** ClassName for the logo. */
    className?: string;
    /** If true only show the icon. */
    iconOnly?: boolean;
    /** Optional on click method for the logo. */
    onClick?: () => void;
};
const Logo: FC<LogoProps> = ({
    size,
    className: classNameProp,
    iconOnly,
    onClick,
}): ReactElement | null => {
    const className = `flex items-center gap-1 ${classNameProp}`;

    const logo = <BookFinder size={getLogoSize(size)} />;

    if (iconOnly) {
        return (
            <div className={className} onClick={onClick}>
                {logo}
            </div>
        );
    }

    switch (size) {
        case LogoSize.large:
            return (
                <TypographyH2 className={className} onClick={onClick}>
                    {logo} {appName}
                </TypographyH2>
            );
        case LogoSize.medium:
            return (
                <TypographyH3 className={className} onClick={onClick}>
                    {logo} {appName}
                </TypographyH3>
            );
        case LogoSize.small:
            return (
                <TypographyH4 className={className} onClick={onClick}>
                    {logo} {appName}
                </TypographyH4>
            );
        default:
            return null;
    }
};

export default Logo;
