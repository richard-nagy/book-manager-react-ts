import { Search, SearchIcon } from "lucide-react";
import {
    useCallback,
    useState,
    type FC,
    type KeyboardEvent,
    type ReactElement,
} from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

type SearchFieldDialogProps = {
    inputValue: string;
    isInputEmpty: boolean;
    handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    navigateToSearchQuery: () => void;
    setInputValue: (value: string) => void;
};
const SearchFieldDialog: FC<SearchFieldDialogProps> = ({
    isInputEmpty,
    inputValue,
    navigateToSearchQuery,
    handleKeyDown,
    setInputValue,
}): ReactElement => {
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

    const onSearchClick = useCallback(() => {
        setDialogIsOpen(false);
        navigateToSearchQuery();
    }, [navigateToSearchQuery]);

    return (
        <Dialog open={dialogIsOpen}>
            <DialogTrigger>
                <Button onClick={() => setDialogIsOpen(true)}>
                    <SearchIcon /> Search
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="w-100">
                <DialogHeader>
                    <DialogTitle>Search for books</DialogTitle>
                </DialogHeader>
                <Input
                    type="text"
                    value={inputValue}
                    autoFocus
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setDialogIsOpen(false)}
                        >
                            Close
                        </Button>
                    </DialogClose>
                    <Button disabled={isInputEmpty} onClick={onSearchClick}>
                        <Search />
                        Search
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SearchFieldDialog;
