
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Theme } from "../types/Theme";
import { ThemeContext } from "../hooks/useTheme";


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('app-theme');
        return (savedTheme as Theme) || 'light';
    });

    useEffect(() => {
        localStorage.setItem('app-theme', theme);
        
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};