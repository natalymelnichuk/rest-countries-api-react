import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import type { Country } from '../types/Country';
import { getAllCountries } from '../services/countryService';
import { Loader } from '../components/Loader';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'


export const CountryDetailPage = () => {
    const { code } = useParams<{ code: string }>();
    const { theme } = useTheme();

    const [country, setCountry] = useState<Country | null>(null);
    const [allCountries, setAllCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCountryDetail = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Fetching data
            const countries = await getAllCountries();
            setAllCountries(countries);

            // Search for country euth the code
            const found = countries.find((c) => {
                const alpha3 = c.codes?.alpha_3?.trim();
                const uuid = c.uuid || c.id;
                const name = c.names?.common;
                
                return (
                    alpha3?.toLowerCase() === code?.toLowerCase() ||
                    uuid?.toLowerCase() === code?.toLowerCase() ||
                    name?.toLowerCase() === code?.toLowerCase()
                );
            });

            if (found) {
                setCountry(found);
            } else {
                setError('Country not found');
            }
        } catch (err) {
            console.error('Error fetching country detail:', err);
            setError('Failed to load country details');
        } finally {
            setIsLoading(false);
        }
        };

        if (code) {
            fetchCountryDetail();
        }
    }, [code]);

    if (isLoading) {
        return <Loader />;
    }

    if (error || !country) {
        return (
        <div className="space-y-6">
            <Link
            to="/"
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl shadow-sm transition-all border ${
                theme === 'dark'
                ? 'bg-[#1e293b] border-[#334155] text-slate-100 hover:bg-[#334155]'
                : 'bg-[#fff9f8] border-[#f0e4e3] text-slate-800 hover:bg-[#f3e7e4]'
            }`}
            >
            Back
            </Link>
            <div className="text-center py-20 text-lg text-red-500">{error || 'Country not found'}</div>
        </div>
        );
    }

    const name = country.names?.common || 'Unknown';
    const officialName = country.names?.official || name;
    const nativeName = country.names?.native?.[Object.keys(country.names.native || {})[0]]?.common || name;
    const population = country.population !== undefined ? country.population.toLocaleString('en-US') : 'N/A';
    const region = country.region || 'N/A';
    const subregion = country.subregion || 'N/A';
    const capital = country.capitals?.[0]?.name || 'N/A';

    const capitalObj = country.capitals?.[0];
    const capitalCoords = capitalObj?.coordinates;

    const countryCoordsObj = country.coordinates; 

    const countryLatlng: [number, number] | null = 
    (capitalCoords?.lat !== undefined && capitalCoords?.lng !== undefined)
        ? [capitalCoords.lat, capitalCoords.lng]
        : (countryCoordsObj?.lat !== undefined && countryCoordsObj?.lng !== undefined)
            ? [countryCoordsObj.lat, countryCoordsObj.lng]
            : null;

    
    const currencies = country.currencies?.map(c => c.name).join(', ') || 'N/A';
    const languages = country.languages?.map(l => l.name).join(', ') || 'N/A';

    const flagSrc = country.flag?.url_png?.trim() || country.flag?.url_svg?.trim();

   
    return (
        <div className="space-y-12 pb-16">
            {/* Button Back */}
            <Link
                to="/"
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-2xl shadow-sm transition-all border font-medium ${
                theme === 'dark'
                    ? 'bg-[#1e293b] border-[#334155] text-slate-100 hover:bg-[#334155]'
                    : 'bg-[#fff9f8] border-[#f0e4e3] text-slate-800 hover:bg-[#f3e7e4]'
                }`}
            >
                Back
            </Link>

            {/* Country info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Flag */}
                <div className="rounded-3xl overflow-hidden shadow-md border dark:border-[#334155] border-[#f0e4e3] bg-slate-100 dark:bg-slate-800 aspect-[4/3] flex items-center justify-center">
                    {flagSrc ? (
                        <img
                        src={flagSrc}
                        alt={country.flag?.description || `${name} flag`}
                        className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="opacity-50">No flag available</span>
                    )}
                </div>

                {/* Info */}
                <div className={`space-y-6 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                    <h1 className="text-3xl font-extrabold">{name}</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                            <p><span className="font-semibold">Native Name:</span> {nativeName}</p>
                            <p><span className="font-semibold">Official Name:</span> {officialName}</p>
                            <p><span className="font-semibold">Population:</span> {population}</p>
                            <p><span className="font-semibold">Region:</span> {region}</p>
                            <p><span className="font-semibold">Sub Region:</span> {subregion}</p>
                            <p><span className="font-semibold">Capital:</span> {capital}</p>
                        </div>

                        <div className="space-y-2">
                            <p><span className="font-semibold">Currencies:</span> {currencies}</p>
                            <p><span className="font-semibold">Languages:</span> {languages}</p>
                        </div>
                    </div>
                </div>

                {/* Border countries */}
                    {country.borders && country.borders.length > 0 && (
                        <div className="pt-4 space-y-3">
                            <strong className="block text-sm font-semibold">Border Countries:</strong>
                            <div className="flex flex-wrap gap-2">
                                {country.borders.map((borderCode) => {
                                    const cleanCode = borderCode.toLowerCase().trim();
                                    const borderCountry = allCountries.find((c) => {
                                        const alpha3 = c.codes?.alpha_3?.toLowerCase().trim();
                                        const uuid = (c.uuid || c.id)?.toLowerCase().trim();
                                        const cName = c.names?.common?.toLowerCase().trim();
                                        return alpha3 === cleanCode || uuid === cleanCode || cName === cleanCode;
                                    });

                                    const borderName = borderCountry?.names?.common || borderCode;
                                    const targetRoute = borderCountry?.codes?.alpha_3 || borderCode;

                                    return (
                                        <Link
                                            key={borderCode}
                                            to={`/country/${targetRoute}`}
                                            className={`px-4 py-1.5 text-xs rounded-xl shadow-sm border transition-all ${
                                                theme === 'dark'
                                                    ? 'bg-[#1e293b] border-[#334155] text-slate-200 hover:bg-[#334155]'
                                                    : 'bg-white border-[#f0e4e3] text-slate-700 hover:bg-[#f3e7e4]'
                                                }`}
                                        >
                                            {borderName}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
            </div>

            {countryLatlng && (
                <div className="mt-8 space-y-3">
                    <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                        Location on Map
                    </h2>
                    <div className="h-72 w-full rounded-3xl overflow-hidden shadow-md border dark:border-[#334155] border-[#f0e4e3] z-0">
                        <MapContainer
                            center={countryLatlng}
                            zoom={5}
                            scrollWheelZoom={false}
                            className="w-full h-full"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={countryLatlng}>
                                <Popup>{capitalObj?.name ? `${capitalObj.name}, ${name}` : name}</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            )}
        </div>
    );
};