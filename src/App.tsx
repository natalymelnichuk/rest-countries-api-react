
import { useEffect } from 'react';
import { getAllCountries } from './services/countryService';

export function App() {
  useEffect(() => {
    
    getAllCountries()
      .then((countries) => {
        console.log('🌍 Successfully received countries:', countries);
        console.log('📊 Total count:', countries.length);
      })
      .catch((error) => {
        console.error('Error while fetching countries:', error);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>REST Countries React App</h1>
    </div>
  );
}
export default App
