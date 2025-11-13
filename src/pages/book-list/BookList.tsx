import DebouncedInput from "@/pages/book-list/DebouncedInput";
import { useCallback, useState } from "react";
import type { BookDoc, OpenLibraryResponse } from "./types";

const BookList = () => {
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

    return (
        <div>
            <DebouncedInput onChange={fetchBooks} debounceMs={250} />
            <ul>
                {books.map((b) => (
                    <li key={b.key}>
                        {b.author_name} - {b.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
