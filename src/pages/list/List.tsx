import EmptyView from "@/components/EmptyView";
import { Spinner } from "@/components/ui/spinner";
import { useBookSearch } from "@/context/BookSearchContext";
import { SearchQuery } from "@/lib/types";
import Book from "@/pages/list/Book";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ListPagination from "./ListPagination";

const List = () => {
    const { booksByPage, maxNumberOfPages, bookFetchIsPending } = useBookSearch();

    const [searchParams] = useSearchParams();

    const currentPageNumber = useMemo(
        () => parseInt(searchParams.get(SearchQuery.page) ?? "0"),
        [searchParams],
    );

    const booksOfCurrentPage = useMemo(
        () => booksByPage?.get(currentPageNumber),
        [booksByPage, currentPageNumber],
    );

    return (
        <div className="flex flex-col gap-10">
            {bookFetchIsPending ?
                <EmptyView
                    description="Please wait while we are searching for books."
                    title="Searching for Books..."
                    icon={<Spinner />}
                />
            :   <div className="flex flex-wrap gap-6 mt-15 justify-center">
                    {booksOfCurrentPage && booksOfCurrentPage.length <= 0 ?
                        <EmptyView
                            description="No books were found."
                            title="No results..."
                        />
                    :   booksOfCurrentPage?.map((b) => (
                            <Book key={b.id} book={b} />
                        ))
                    }
                </div>
            }
            {maxNumberOfPages > 0 && <ListPagination />}
        </div>
    );
};

export default List;
