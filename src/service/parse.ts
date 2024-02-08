import {HTMLElement, parse} from 'node-html-parser';
import axios from 'axios';

const url = 'https://gabaryty.ekosystem.wroc.pl/tabela-wywozu-odpadow/';

interface Result { id: number; street: string, date: string }

export async function getWasteTable({street: filter, ids}: {street: string; ids?: string[]}): Promise<Result[]> {
    try {
        const data = (await axios.get(url)).data;

        const root: HTMLElement = parse(data);
        const wasteTable: HTMLElement | null = root.querySelector('#waste-table > .table-inner');
        const rows: HTMLElement[] | undefined = wasteTable?.querySelectorAll('.table-row');

        const response: Result[] = [];

        (rows as HTMLElement[])?.forEach((row: HTMLElement) => {
            const id: number = Number(row.getAttribute('id'));
            const street: string = (row.querySelector('.table-cell--street')?.text as string);
            const date: string = (row.querySelectorAll('.text--mini')[2].text as string);

            response.push({id, street, date});
        });

        if (filter) {
            return response.filter((item: Result) => item.street.toLowerCase().includes(filter.toLowerCase()));
        }

        if (ids) {
            return response.filter((item: Result) => ids.indexOf(String(item.id)) > -1);
        }

        return [];
    } catch (error) {
        // @ts-ignore
        throw new Error(error?.message);
    }
}
