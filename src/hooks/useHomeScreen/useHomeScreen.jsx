import React, { useEffect, useState } from 'react';

export const useHomeScreen = () => {
  const [region, setRegion] = useState('NREMT');
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${process.env.API_URL}/medication/base`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            region
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setMedications(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [region]);

  return {
    medications,
    loading,
    error,
    region,
    setRegion
  };
};
