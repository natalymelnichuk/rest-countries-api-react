
import type { Country } from "../types/Country"

const BASE_URL = 'https://api.restcountries.com/countries/v5';
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Helper to safely extract the best available code/identifier from a country object,
 * handling alpha_3, alpha_2, uuid, id, or common name fallback.
 */
export const getCountryCode = (country: Country): string => {
    const alpha3 = country.codes?.alpha_3?.trim();
    const alpha2 = country.codes?.alpha_2?.trim();
    const uuid = country.uuid || country.id;
    const name = country.names?.common;

    return (alpha3 && alpha3 !== '') ? alpha3 : 
            (alpha2 && alpha2 !== '') ? alpha2 : 
            (uuid || name || '');
};


// 1. Fetch all countries with pagination (v5) and fallback to local JSON
export const getAllCountries = async (): Promise<Country[]> => {

    
    try {
        const limit = 100;
        const offsets = [0, 100, 200];

        const requests = offsets.map((offset) => 
            fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`, {
                headers: { 'Authorization': `Bearer ${API_KEY}` }
            }).then((res) => {
                if (!res.ok) throw new Error(`API Error: ${res.status}`);
                return res.json();
            })
        );

        const results = await Promise.all(requests);
        return results.flatMap((jsonResult) => jsonResult.data?.objects || jsonResult);

    } catch (error) {
        console.warn('API error, falling back to local JSON:', error);
        const localResponse = await fetch('/data.json');
        if (!localResponse.ok) {
            throw new Error(`Local JSON Error: ${localResponse.status}`, { cause: error });
        }
        const localData = await localResponse.json();
        return localData.data?.objects || localData;
    }
};

// 2. Fetch a specific country by its code 
export const getCountryByCode = async (code: string): Promise<Country> => {
    try {
        const response = await fetch(`${BASE_URL}/${code}`, {
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });
        if (!response.ok) {
            throw new Error(`Failed to find country with code: ${code}`);
        }
        const data = await response.json();
        return Array.isArray(data) ? data[0] : (data.data || data);
    } catch (error) {
        console.error('Error in getCountryByCode:', error);
        throw error;
    }
};

// 3. Fetch a list of neighboring countries
export const getBorderCountries = async (codes: string[]): Promise<Country[]> => {
    if (!codes || codes.length === 0) return [];
    try {
        const requests = codes.map((code) => getCountryByCode(code));
        const results = await Promise.all(requests);
        return results.filter(Boolean);
    } catch (error) {
        console.error('Error in getBorderCountries:', error);
        return [];
    }
};