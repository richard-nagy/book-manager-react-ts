import type { FC, ImgHTMLAttributes } from "react";
import blackTextLogo from "../svgs/black-text-logo.svg";
import whiteTextLogo from "../svgs/white-text-logo.svg";
import logo from "../svgs/logo.svg";
import { useTheme } from "@/context/ThemeContext.tsx";

interface IconProps extends ImgHTMLAttributes<HTMLImageElement> {
    height?: number;
    resolvedTheme?: "dark" | "light" | string;
    noText?: boolean;
}

const Logo: FC<IconProps> = ({ height = 24, noText, ...props }) => {
    const { resolvedTheme } = useTheme();

    const imgProps = props as ImgHTMLAttributes<HTMLImageElement>;

    if (noText) {
        return (
            <img
                src={logo}
                height={height}
                width={height}
                alt="Book Finder"
                {...imgProps}
            />
        );
    }

    if (resolvedTheme === "dark") {
        return (
            <img
                src={whiteTextLogo}
                height={height}
                width={2.5 * height}
                alt="Book Finder"
                {...imgProps}
            />
        );
    }

    return (
        <img
            src={blackTextLogo}
            height={height}
            width={2.5 * height}
            alt="Book Finder"
            {...imgProps}
        />
    );
};

export { Logo };
