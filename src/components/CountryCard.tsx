
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import type { CountryCardProps } from '../types/Country';


export const CountryCard = ({ country }: CountryCardProps) => {
    const { theme } = useTheme();

    const alpha3 = country.codes?.alpha_3?.trim();
    const uuid = country.uuid || country.id;
    const name = country.names?.common || 'Unknown';
    const countryCode = (alpha3 && alpha3 !== '') ? alpha3 : (uuid || name);

    const formattedPopulation = country.population !== undefined 
        ? country.population.toLocaleString('en-US') 
        : 'N/A';
        
    const capitalName = country.capitals?.[0]?.name || 'N/A';

    const flagPng = country.flag?.url_png?.trim();
    const flagSvg = country.flag?.url_svg?.trim();
    const flagSrc: string | undefined = flagPng || flagSvg || undefined;
   
    
    
    return (
        <Link
            to={`/country/${encodeURIComponent(countryCode)}`}
            className={`block rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md border ${
                theme === 'dark'
                ? 'bg-[#1e293b] border-[#334155] text-slate-100'
                : 'bg-[#fff9f8] border-[#f0e4e3] text-slate-800'
            }`}
        >
        
            <div className="h-40 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                    src={flagSrc}
                    alt={country.flag?.description || `${name} flag`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="p-6">
                <h3 className="text-lg font-bold mb-3 truncate" title={name}>
                    {name}
                </h3>
                <div className="space-y-1.5 text-sm opacity-90">
                    <p>
                        <span className="font-semibold">Population:</span>
                        {formattedPopulation}
                    </p>
                    <p>
                        <span className="font-semibold">Region:</span> {country.region || 'N/A'}
                    </p>
                    <p>
                        <span className="font-semibold">Capital:</span> {capitalName}
                    </p>
                </div>
            </div>
        </Link>
    );
};