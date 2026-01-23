import React, { useEffect, useState } from 'react';

export const useMedScreen = (drugId) => {
  const [medication, setMedication] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${process.env.API_URL}/medication/full`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            drugId
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setMedication(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    if (drugId) {
        fetchData();
    }
  }, [drugId]);

  return {
    medication,
    loading,
    error
  };
};
