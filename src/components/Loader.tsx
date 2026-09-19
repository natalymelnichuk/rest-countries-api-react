
import { useTheme } from '../hooks/useTheme';

export const Loader = () => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col items-center justify-center py-28 space-y-4">
        
            <div 
                className={`w-12 h-12 border-4 rounded-full animate-spin ${
                theme === 'dark'
                    ? 'border-slate-700 border-t-sky-400'
                    : 'border-rose-100 border-t-rose-400'
                }`}
            />
                <span className={`text-sm font-medium tracking-wide animate-pulse ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                    Loading countries...
                </span>
        </div>
    );
};