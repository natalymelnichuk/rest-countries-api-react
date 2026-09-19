
import { useTheme } from '../hooks/useTheme';

interface RegionFilterProps {
    value: string;
    onChange: (value: string) => void;
}

export const RegionFilter = ({ value, onChange }: RegionFilterProps) => {
    const { theme } = useTheme();

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full md:w-64 px-5 py-3.5 rounded-2xl shadow-sm outline-none transition-colors cursor-pointer border ${
                theme === 'dark'
                ? 'bg-[#1e293b] border-[#334155] text-slate-100'
                : 'bg-[#fff9f8] border-[#f0e4e3] text-slate-800'
            }`}
        >
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        </select>
    );
};