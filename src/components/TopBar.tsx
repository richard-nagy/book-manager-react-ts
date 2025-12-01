import { useBookSearch } from "@/context/BookSearchContext";
import { SearchQuery } from "@/lib/types";
import { isStringEmpty } from "@/lib/utils";
import { ArrowLeft, HomeIcon, Search } from "lucide-react";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type FC,
    type KeyboardEvent,
    type ReactElement
} from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SettingsDropDown } from "./SettingsDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const firstPageNumber = "1";

const TopBar: FC = (): ReactElement => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { fetchBooks } = useBookSearch();
    const navigate = useNavigate();

    const searchQuery = searchParams.get(SearchQuery.q) ?? "";

    const [inputValue, setInputValue] = useState<string>(searchQuery);

    const canGoBack = (history.state?.idx ?? 0) > 0;

    const currentPageNumber = useMemo(
        () => parseInt(searchParams.get(SearchQuery.page) ?? firstPageNumber),
        [searchParams],
    );

    const isInputEmpty = useMemo(() => isStringEmpty(inputValue), [inputValue]);

    const navigateToSearchQuery = useCallback(() => {
        setSearchParams({
            [SearchQuery.q]: inputValue ?? "",
            [SearchQuery.page]: firstPageNumber,
        });
    }, [inputValue, setSearchParams]);

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

    useEffect(() => {
        fetchBooks(searchQuery, currentPageNumber);
    }, [currentPageNumber, fetchBooks, searchQuery]);

    return (
        <div className="flex justify-between w-full sticky top-0 p-3">
            <Button
                className="mr-21"
                size="icon"
                disabled={!canGoBack}
                onClick={() => navigate(-1)}
            >
                <ArrowLeft />
            </Button>
            <div className="flex flex-row gap-2 justify-center align-middle">
                <Button asChild size="icon">
                    <Link to="/">
                        <HomeIcon />
                    </Link>
                </Button>
                <Input
                    className="w-75"
                    type="text"
                    value={inputValue}
                    autoFocus
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button disabled={isInputEmpty} onClick={navigateToSearchQuery}>
                    <Search /> Search
                </Button>
            </div>
            <div className="flex gap-2">
                <ThemeToggle />
                <SettingsDropDown />
            </div>
        </div>
    );
};

export default TopBar;
