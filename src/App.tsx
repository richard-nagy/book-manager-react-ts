import { debounce } from "lodash";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ChangeEvent,
    type FC,
} from "react";

interface BookDoc {
    title: string;
    author_name: string[];
    key: string;
}

interface OpenLibraryResponse {
    docs: BookDoc[];
}

const App: FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [books, setBooks] = useState<BookDoc[]>([]);

    const fetchBooks = useCallback(async (searchQuery: string) => {
        try {
            const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`;
            const response = await fetch(url);
            const data: OpenLibraryResponse = await response.json();
            setBooks(data.docs);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const debouncedTransition = useMemo(
        () =>
            debounce((value: string) => {
                fetchBooks(value);
            }, 500),
        [fetchBooks],
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        debouncedTransition(newValue);
    };

    useEffect(() => {
        return () => {
            debouncedTransition.cancel();
        };
    }, [debouncedTransition]);

    return (
        <div>
            <input type="text" value={inputValue} onChange={handleChange} />
            <ul>
                {books.map((b) => (
                    <li key={b.key}>{b.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
