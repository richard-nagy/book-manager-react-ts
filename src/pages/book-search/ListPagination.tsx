import { useBookSearch } from "@/components/book/BookSearchContext";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { useCallback, useMemo, type FC, type ReactElement } from "react";

const pageNumber = 5;

const ListPagination: FC = (): ReactElement => {
    const { numberOfPages } = useBookSearch();

    const paginationItem = useCallback(
        (number: number) =>
            number <= 0 || number > numberOfPages ?
                null
            :   <PaginationItem>
                    <PaginationLink
                        to={number.toString()}
                        isActive={pageNumber === number}
                    >
                        {number}
                    </PaginationLink>
                </PaginationItem>,
        [numberOfPages],
    );

    const paginationText = useCallback(
        (text: string, toNumber: number) =>
            pageNumber < numberOfPages ?
                <PaginationItem>
                    <PaginationLink to={toNumber.toString()}>
                        {text}
                    </PaginationLink>
                </PaginationItem>
            :   null,
        [numberOfPages],
    );

    const paginationEllipsis = useMemo(
        () => (
            <PaginationItem>
                <PaginationEllipsis />
            </PaginationItem>
        ),
        [],
    );

    const pageNationItemsToRender = useMemo(() => {
        return [
            paginationText("Prev", pageNumber + 1),
            pageNumber - 2 > 1 ? paginationEllipsis : null,
            paginationItem(pageNumber - 2),
            paginationItem(pageNumber - 1),
            paginationItem(pageNumber),
            paginationItem(pageNumber + 1),
            paginationItem(pageNumber + 2),
            pageNumber + 2 < numberOfPages ? paginationEllipsis : null,
            paginationText("Next", pageNumber - 1),
        ];
    }, [numberOfPages, paginationEllipsis, paginationItem, paginationText]);

    return (
        <Pagination className="my-3">
            <PaginationContent>{pageNationItemsToRender}</PaginationContent>
        </Pagination>
    );
};

export default ListPagination;
