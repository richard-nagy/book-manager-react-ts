import { Button } from "@/components/ui/button";
import { useBook } from "@/context/BookContext";
import { Page } from "@/lib/types";
import { HomeIcon } from "lucide-react";
import { type FC, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound: FC = (): ReactElement => {
    const { clearResults } = useBook();

    const navigate = useNavigate();

    clearResults();

    return (
        <div className="text-center p-12">
            <h2 className="text-6xl font-bold mb-4">404</h2>
            <p className="text-2xl mb-6">Page Not Found</p>
            <Button asChild onClick={() => navigate(Page.homepage)}>
                <HomeIcon /> Go Home
            </Button>
        </div>
    );
};

export default PageNotFound;
