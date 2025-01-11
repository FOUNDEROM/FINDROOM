import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function usePGs(page = 1, limit = 12) {
  const [pgs, setPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchPGs() {
      try {
        setLoading(true);
        
        // Calculate offset
        const offset = (page - 1) * limit;

        // Fetch PGs with pagination
        const { data, error, count } = await supabase
          .from('pgs')
          .select('*', { count: 'exact' })
          .range(offset, offset + limit - 1);

        if (error) throw error;

        setPGs(data);
        setTotalCount(count);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPGs();
  }, [page, limit]);

  return { pgs, loading, error, totalCount };
}