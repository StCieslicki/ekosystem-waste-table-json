import { HTMLElement, parse } from 'node-html-parser';
import { ParseError } from '../error/ParseError';
import { Result } from '../handler';

const STREET_INDEX = 0;
const ESTATE_INDEX = 1;
const DATE_INDEX = 2;
const GEO_INDEX = 3;

const tableCellClass = '.table-cell-4';

export function getRows(data: string): HTMLElement[] {
    try {
        const root: HTMLElement = parse(data);
        const wasteTable: HTMLElement | null = root.querySelector('#waste-table > .table-inner');
        const rows: HTMLElement[] | undefined = wasteTable?.querySelectorAll('.table-row');

        return rows as HTMLElement[];
    } catch (error) {
        throw new ParseError(error as Error);
    }
}

export function getRowId(htmlRow: HTMLElement): number {
    return Number(htmlRow.getAttribute('id'));
}

export function getRowStreet(htmlRow: HTMLElement): string {
    return removeWhiteSpaces(
        removeWhiteSpaces(
            (htmlRow.querySelectorAll(tableCellClass)[STREET_INDEX].querySelector('span')?.text as string)
        )
    );
}

export function getRowDate(htmlRow: HTMLElement): string {
    return (
        htmlRow.querySelectorAll(tableCellClass)[DATE_INDEX].querySelector('span')?.text as string
    );
}

export function getRowEstate(htmlRow: HTMLElement): string {
    return removeWhiteSpaces(
        removeWhiteSpaces(
            (htmlRow.querySelectorAll(tableCellClass)[ESTATE_INDEX].querySelector('a')?.text as string)
        )
    );
}

export function getRowGeo(htmlRow:HTMLElement) {
    const regex = /.+(lat=(\d{1,3}.\d{1,10}))&(lng=(\d{1,3}.\d{1,10})).+/gm;
    const subst = `$2 $4`;

    const url = htmlRow.querySelectorAll(tableCellClass)[GEO_INDEX].querySelector('a')?.getAttribute('href') as string;
    const [lat, lng] = (url as string).replace(regex, subst).split(' ');

    return { lat, lng };
}

export function filterByStreet(data: Result[], filter: string) {
    return data.filter((item: Result) => item.street.toLowerCase().includes(filter.toLowerCase()))
}

export function sortByStreet(data: Result[]) {
    // todo fixme - doesn't work
    // @ts-ignore
    return data.sort((a: Result, b: Result): number => {
        const nameA = a.street.toLowerCase();
        const nameB = b.street.toLowerCase();

        if (nameA < nameB) {
            return -1;
        }

        if (nameA > nameB) {
            return 1;
        }

        if (nameA === nameB) {
            return 0;
        }
    });
}

function removeWhiteSpaces(text: string): string {
    const regex = /\n| +/gm;

    const result = text.replace(regex, ' ');

    return result;
}

export function createResultItem(htmlRow: HTMLElement): Result {
    return {
        id: getRowId(htmlRow),
        street: getRowStreet(htmlRow),
        date: getRowDate(htmlRow),
        estate: getRowEstate(htmlRow),
        geo: getRowGeo(htmlRow)
    };
}
