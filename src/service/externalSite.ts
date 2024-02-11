import axios from "axios";
import { ExternalSiteError } from "../error/ExternalSiteError";

const url = 'https://gabaryty.ekosystem.wroc.pl/tabela-wywozu-odpadow/';

export async function getHtmlSite(): Promise<string> {
    try {
        return (await axios.get(url)).data;
    } catch (error: unknown) {
        throw new ExternalSiteError(error as Error);
    }
}
