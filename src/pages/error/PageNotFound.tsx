import { Button } from "@/components/ui/button";
import { useBookSearch } from "@/context/BookSearchContext";
import { HomeIcon } from "lucide-react";
import { type FC, type ReactElement } from "react";

const PageNotFound: FC = (): ReactElement => {
    const { clearResults } = useBookSearch();

    clearResults();

    // todo: navigate to home on click here
    return (
        <div className="text-center p-12">
            <h2 className="text-6xl font-bold mb-4">404</h2>
            <p className="text-2xl mb-6">Page Not Found</p>
            <Button asChild>
                <HomeIcon /> Go Home
            </Button>
        </div>
    );
};

export default PageNotFound;
