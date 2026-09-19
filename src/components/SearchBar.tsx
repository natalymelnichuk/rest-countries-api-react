
import { useTheme } from '../hooks/useTheme';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
    const { theme } = useTheme();

    return (
        <input
            type="text"
            placeholder="Search for a country..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full md:w-96 px-6 py-3.5 rounded-2xl shadow-sm outline-none transition-colors border ${
                theme === 'dark'
                ? 'bg-[#1e293b] border-[#334155] text-slate-100 placeholder-slate-400 focus:border-[#475569]'
                : 'bg-[#fff9f8] border-[#f0e4e3] text-slate-800 placeholder-slate-400 focus:border-[#e2ccbf]'
            }`}
        />
    );
};