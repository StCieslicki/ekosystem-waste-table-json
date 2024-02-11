import {HTMLElement} from 'node-html-parser';
import {getHtmlSite} from "./service/externalSite";
import {
    createResultItem,
    filterByStreet,
    getRows,
    sortByStreet
} from "./service/parse";

export interface Result {
    id: number;
    street: string,
    date: string,
    estate: string,
    geo: {lat: string; lng: string}
}

export async function getWasteTable({street: filter, ids}: {street: string; ids?: string[]}): Promise<Result[]> {
    try {
        const data = await getHtmlSite();

        const rows = getRows(data);

        const response: Result[] = [];

        (rows as HTMLElement[])?.forEach((row: HTMLElement) => {
            response.push(createResultItem(row));
        });

        if (filter) {
            return sortByStreet(filterByStreet(response, filter));
        }

        if (ids) {
            return response.filter((item: Result) => ids.indexOf(String(item.id)) > -1);
        }

        return [];
    } catch (error) {
        throw error;
    }
}
