import { useState, useEffect } from 'react';
import { CountryCard } from '../components/CountryCard';
import type { Country } from '../types/Country';
import { SearchInput } from '../components/SearchBar';
import { RegionFilter } from '../components/Filter';
import { getAllCountries } from '../services/countryService';
import { Loader } from '../components/Loader';

export const HomePage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setIsLoading(true);
        
        const data = await getAllCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error loading countries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCountries();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.names.common.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const matchesRegion = selectedRegion === '' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });


  
  return (
    <div className="space-y-8">
      {/* Search and Filter components */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <RegionFilter value={selectedRegion} onChange={setSelectedRegion} />
      </div>

      {/* Countries Grid */}
      {isLoading ? (
        <Loader />
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