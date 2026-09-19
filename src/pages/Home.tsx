import { useState, useEffect } from 'react';
import { CountryCard } from '../components/CountryCard';
import { useTheme } from '../hooks/useTheme';
import type { Country } from '../types/Country';

export const HomePage = () => {
  const { theme } = useTheme();
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем данные один раз при монтировании
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Failed to load local data');
        const json = await response.json();
        const data: Country[] = json.data?.objects || json;
        
        setCountries(data);
      } catch (error) {
        console.error('Error loading countries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCountries();
  }, []);

  // Вычисляем отфильтрованные страны прямо во время рендеринга (без setState в useEffect!)
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.names.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());
    
    const matchesRegion = selectedRegion === '' || country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-8">
      {/* Панель поиска и фильтров */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full md:w-96 px-6 py-3.5 rounded-2xl shadow-sm outline-none transition-colors border ${
            theme === 'dark'
              ? 'bg-[#1e293b] border-[#334155] text-slate-100 placeholder-slate-400 focus:border-[#475569]'
              : 'bg-[#fff9f8] border-[#f0e4e3] text-slate-800 placeholder-slate-400 focus:border-[#e2ccbf]'
          }`}
        />

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
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
      </div>

      {/* Список или состояние загрузки */}
      {isLoading ? (
        <div className="text-center py-20 text-lg opacity-70">Loading countries...</div>
      ) : filteredCountries.length === 0 ? (
        <div className="text-center py-20 text-lg opacity-70">No countries found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCountries.map((country) => {
            const uniqueKey = country.codes?.alpha_3 || country.uuid || country.names.common;
            return <CountryCard key={uniqueKey} country={country} />;
          })}
        </div>
      )}
    </div>
  );
};