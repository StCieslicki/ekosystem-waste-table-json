import {HTMLElement, parse} from 'node-html-parser';
import axios from 'axios';

const url = 'https://gabaryty.ekosystem.wroc.pl/tabela-wywozu-odpadow/';

interface Result { street: string, date: string }

export async function getWasteTable({street: filter}: {street: string}): Promise<Result[]> {
    try {
        const data = (await axios.get(url)).data;

        const root: HTMLElement = parse(data);
        const wasteTable: HTMLElement | null = root.querySelector('#waste-table > .table-inner');
        const rows: HTMLElement[] | undefined = wasteTable?.querySelectorAll('.table-row');

        const response: Result[] = [];

        (rows as HTMLElement[])?.forEach((row: HTMLElement) => {
            const street: string = (row.querySelector('.table-cell--street')?.text as string);
            const date: string = (row.querySelectorAll('.text--mini')[2].text as string);

            response.push({street, date});
        });

        return response.filter((item: Result) => item.street.toLowerCase().includes(filter.toLowerCase()));
    } catch (error) {
        // @ts-ignore
        throw new Error(error?.message);
    }
}
