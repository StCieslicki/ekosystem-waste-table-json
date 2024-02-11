import {describe, expect, it} from '@jest/globals';
import {readFileSync} from 'fs';
import {getRowDate, getRowId, getRows as getTableRows, getRowStreet} from '../../lib/service/parse';
import {createResultItem, getRowEstate, getRowGeo, sortByStreet} from '../../src/service/parse';
import {HTMLElement} from 'node-html-parser';
import {Result} from '../../src/handler';

const getRows = () => {
    const data = readFileSync(__dirname + '/../data/page.html', 'utf-8');

    const rows = getTableRows(data);

    return rows;
}

describe('Parse tests', () => {
    it('getRows', () => {
        // const data = readFileSync(__dirname + '/../data/page.html', 'utf-8');
        //
        const rows = getRows();

        expect(rows.length).toEqual(10);
    });

    it('getRow', () => {
        const rows = getRows();

        const item = createResultItem(rows[0]);

        expect(item).toEqual({
            id: 3,
            street: 'Abramowskiego 1',
            date: '22-03-2024',
            estate: 'Biskupin - Sępolno - Dąbie - Bartoszowice',
            geo: {
                lat: '51.101979225',
                lng: '17.105930761',
            },
    });
    });

    it('getRowId', () => {
        const rows = getRows();

        const id = getRowId(rows[0])

        expect(id).toEqual(3);
    });

    it('getRowStreet', () => {
        const rows = getRows();

        const street = getRowStreet(rows[4])

        expect(street).toEqual('al. Paderewskiego 22a');
    });

    it('getRowDate', () => {
        const rows = getRows();

        const street = getRowDate(rows[0])

        expect(street).toEqual('22-03-2024');
    });

    it('getRowEstate', () => {
        const rows = getRows();

        const estate = getRowEstate(rows[0])

        expect(estate).toEqual('Biskupin - Sępolno - Dąbie - Bartoszowice');
    });

    it('getRowGeo', () => {
        const rows = getRows();

        const estate = getRowGeo(rows[0])

        expect(estate).toEqual({ lat: '51.101979225', lng: '17.105930761' });
    });

    it('sortByStreet', () => {
        const rows = getRows();

        function createStreetItem (htmlRow: HTMLElement): Pick<Result, 'street'> {
            return {street: getRowStreet(htmlRow)};
        }

        const data = [
            createStreetItem(rows[9]),
            createStreetItem(rows[0]),
            createStreetItem(rows[2]),
            createStreetItem(rows[4]),
            createStreetItem(rows[6]),
        ];

        console.log(data);

        const sorted = sortByStreet(data);

        console.log(sorted);

        expect(sorted).toEqual([
            { street: 'al. Kochanowskiego 23' },
            { street: 'al. Paderewskiego 22a' },
            { street: 'Abramowskiego 1' },
            { street: 'Bacciarellego 1' },
            { street: 'Bacciarellego 50' }
        ]);
    });
});
