import Axios from 'axios';
import { ExternalSiteError } from '../error/ExternalSiteError';
import { setupCache } from 'axios-cache-interceptor';

const url = 'https://gabaryty.ekosystem.wroc.pl/tabela-wywozu-odpadow/';
const axios = setupCache(Axios);

const MINUTE = 1000 * 60;
const HOUR = MINUTE * 60;
// @ts-ignore
const DAY = HOUR * 24;

export async function getHtmlSite(): Promise<string> {
    try {
        const request = await axios.get(url, {
            cache: {
                ttl: HOUR * 4,
                interpretHeader: false
            }
        });

        return request.data;
    } catch (error: unknown) {
        throw new ExternalSiteError(error as Error);
    }
}
