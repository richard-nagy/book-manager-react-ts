import type { BookResponse, Volume } from "@/lib/types";
import { attemptFetch, isStringEmpty } from "@/lib/utils";
import { useCallback, useState, useTransition, type ReactNode } from "react";
import { toast } from "sonner";
import { BookSearchContext } from "./BookSearchContext";

/** This is the max number Google Books API allows by default. */
const maxResults = 40;
/** API key from the Google Cloud project */
const apiKey = import.meta.env.VITE_GOOGLE_BOOK_API_KEY;
/** Base url of the Google Books API */
const baseUrl = "https://www.googleapis.com/books/v1/volumes";
/** Max number of retries if the fetch failed. */
const maxRetries = 3;
/** Delay time in ms if the fetch failed. */
const delayMs = 1000;

const fetchBooksCore = async (
    searchQuery: string,
    startIndex: number,
    apiKey: string,
): Promise<BookResponse> => {
    const url = `${baseUrl}?q=${encodeURIComponent(
        searchQuery,
    )}&key=${apiKey}&maxResults=${maxResults}&startIndex=${
        (startIndex - 1) * maxResults
    }`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `HTTP error! Status: ${response.status} ${response.statusText}`,
        );
    }

    const data: BookResponse = await response.json();
    return data;
};

const getBookByVolumeIdCore = async (
    volumeId: string,
    apiKey: string,
): Promise<Volume> => {
    const url = `${baseUrl}/${volumeId}?key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Volume = await response.json();
    return data;
};

export type BookSearchContextType = {
    /**
     * List of books.
     * If null, there are no results.
     */
    booksByPage: Map<number, Volume[]> | null;
    /**
     * Number of available pages.
     * If null, there are no results.
     */
    maxNumberOfPages: number;
    /** If true, the fetching of the books is active. */
    bookFetchIsPending: boolean;
    /** If true, the fetching of a volume is active. */
    volumeFetchIsPending: boolean;
    /**
     * Fetches the books.
     * @param searchQuery The query filtering is based upon.
     * @param startIndex Starting index from where the books will be returned from the original list.
     */
    fetchBooks: (
        searchQuery: string | null,
        startIndex?: number,
    ) => Promise<void>;
    /**
     * Fetches a specific book.
     * @param volumeId
     * @returns Returns the the data of the book. Returns null if there were no result.
     */
    getBookByVolumeId: (volumeId: string) => Promise<Volume | null>;
    /** Clears books results and number of pages. */
    clearResults: () => void;
};

type BookSearchProviderProps = {
    children: ReactNode;
};

// todo: change this name to BookProvider
// done: of successful book fetch, stash the search query as well, if we step back from the book result instead of reloading the results just give us the results on an instant
// done: if the search query didn't changed and the user steps back in the pagination, don't re-fetch the results just give back the already existing one
// done: on search query change, remove the stashed results
// todo: save all the results with query and page number in the current session
// todo: add a clear stashed results button (somewhere)
export const BookSearchProvider = ({ children }: BookSearchProviderProps) => {
    const [currentSearchQuery, setCurrentSearchQuery] = useState<string | null>(
        null,
    );
    const [booksByPage, setBooksByPage] = useState<Map<
        number,
        Volume[]
    > | null>(null);
    const [maxNumberOfPages, setMaxNumberOfPages] = useState<number>(0);
    const [bookFetchIsPending, startBookFetch] = useTransition();
    const [volumeFetchIsPending, startVolumeFetch] = useTransition();

    const clearResults = useCallback(() => {
        setBooksByPage(null);
        setMaxNumberOfPages(0);
    }, []);

    const fetchBooks = useCallback(
        async (searchQuery: string | null, pageNumber = 0): Promise<void> => {
            const sameSearchQuery = currentSearchQuery !== searchQuery;

            try {
                if (!apiKey) {
                    throw new Error("Missing API Key");
                }

                if (!searchQuery || isStringEmpty(searchQuery)) {
                    clearResults();
                    return;
                }

                // If it's the same search query and we already got the books for the page, don't repeat the fetch.
                if (
                    currentSearchQuery?.toLocaleLowerCase() ===
                        searchQuery?.toLocaleLowerCase() &&
                    booksByPage?.has(pageNumber)
                ) {
                    return;
                }

                startBookFetch(async () => {
                    const data = await attemptFetch(
                        () => fetchBooksCore(searchQuery, pageNumber, apiKey),
                        maxRetries,
                        delayMs,
                    );

                    if (data.totalItems > 0) {
                        setMaxNumberOfPages(
                            Math.floor(data.totalItems / maxResults),
                        );
                    }

                    if (data.items && (data.items?.length ?? 0) > 0) {
                        setBooksByPage((ob) => {
                            const newBooks = new Map(
                                // If we have the same search query, we keep the previous results,
                                // otherwise we clear it out.
                                sameSearchQuery ? [...(ob ?? [])] : [],
                            );
                            newBooks.set(pageNumber, data.items ?? []);
                            return newBooks;
                        });
                    }
                });
            } catch (error) {
                let errorMessage = "An unknown error occurred.";
                if (error instanceof Error) {
                    errorMessage = error.message;
                }

                clearResults();
                console.error(error);
                toast.error("Search Failed", {
                    description: `Error details: ${errorMessage}`,
                });
            } finally {
                if (sameSearchQuery) {
                    setCurrentSearchQuery(searchQuery);
                }
            }
        },
        [booksByPage, clearResults, currentSearchQuery],
    );

    const getBookByVolumeId = useCallback(
        async (volumeId: string): Promise<Volume | null> => {
            let result: Volume | null = null;

            try {
                await startVolumeFetch(async () => {
                    if (!apiKey || !volumeId) {
                        throw new Error("Missing API Key or Volume ID");
                    }

                    result = await attemptFetch(
                        () => getBookByVolumeIdCore(volumeId, apiKey),
                        maxRetries,
                        delayMs,
                    );
                });
            } catch (error) {
                console.error("Error fetching book data:", error);
            }

            return result;
        },
        [],
    );

    const value = {
        booksByPage,
        maxNumberOfPages,
        bookFetchIsPending,
        volumeFetchIsPending,
        fetchBooks,
        getBookByVolumeId,
        clearResults,
    };

    return (
        <BookSearchContext.Provider value={value}>
            {children}
        </BookSearchContext.Provider>
    );
};
