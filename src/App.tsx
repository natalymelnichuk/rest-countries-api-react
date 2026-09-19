

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';
import { HomePage } from './pages/Home';
import { CountryDetailPage } from './pages/CountryDetail';

const MainLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0f172a] text-[#e2e8f0]' 
        : 'bg-[#fcf6f5] text-[#2d3748]'  
    }`}>
      
      <header className={`flex justify-between items-center px-8 py-5 shadow-sm transition-colors duration-300 border-b ${
        theme === 'dark' 
          ? 'bg-[#1e293b] border-[#334155]'
          : 'bg-[#fff9f8] border-[#f0e4e3]'
      }`}>
        <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
          🌍 <span className="font-semibold">Where in the world?</span>
        </h2>
        
        
        <button
          onClick={toggleTheme}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm cursor-pointer border ${
            theme === 'dark' 
              ? 'bg-[#334155] hover:bg-[#475569] text-[#cbd5e1] border-[#475569]' 
              : 'bg-[#d8eedb] hover:bg-[#c2e5cb] text-[#2c5233] border-[#b4dcbe]'  
          }`}
        >
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      
      <main className="max-w-7xl mx-auto py-8 px-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:code" element={<CountryDetailPage />} />
        </Routes>
      </main>
    </div>
  );
};

export function App() {
  

  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App
