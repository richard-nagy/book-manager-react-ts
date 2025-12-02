import { useBookSearch } from "@/context/BookSearchContext";
import { Page, SearchQuery } from "@/lib/types";
import { isStringEmpty } from "@/lib/utils";
import { ArrowLeft, Search } from "lucide-react";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type FC,
    type KeyboardEvent,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const firstPageNumber = "1";

type SearchInputProps = {
    showBackButton: boolean;
};
const SearchField: FC<SearchInputProps> = ({ showBackButton }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { fetchBooks } = useBookSearch();

    const searchQuery = searchParams.get(SearchQuery.q) ?? "";

    const [inputValue, setInputValue] = useState<string>(searchQuery);

    const canGoBack = (history.state?.idx ?? 0) > 0;

    const currentPageNumber = useMemo(
        () => parseInt(searchParams.get(SearchQuery.page) ?? firstPageNumber),
        [searchParams],
    );

    useEffect(() => {
        if (
            location.pathname === `/${Page.homepage}` ||
            location.pathname === `/${Page.search}`
        ) {
            fetchBooks(searchQuery, currentPageNumber);
        }
    }, [currentPageNumber, fetchBooks, searchQuery]);

    const isInputEmpty = useMemo(() => isStringEmpty(inputValue), [inputValue]);

    const navigateToSearchQuery = useCallback(() => {
        navigate(`/search?q=${inputValue ?? ""}&page=${firstPageNumber}`, {
            relative: "path",
        });
    }, [inputValue, navigate]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && inputValue && !isInputEmpty) {
                navigateToSearchQuery();
            }
        },
        [inputValue, isInputEmpty, navigateToSearchQuery],
    );

    useEffect(() => {
        setInputValue(searchQuery);
    }, [searchQuery]);

    return (
        <div className="flex flex-row gap-2 justify-center align-middle">
            {showBackButton && (
                <Button
                    size="icon"
                    disabled={!canGoBack}
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft />
                </Button>
            )}
            <Input
                className="w-75"
                type="text"
                value={inputValue}
                autoFocus
                onKeyDown={handleKeyDown}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
                size="icon"
                disabled={isInputEmpty}
                onClick={navigateToSearchQuery}
            >
                <Search />
            </Button>
        </div>
    );
};

export default SearchField;
