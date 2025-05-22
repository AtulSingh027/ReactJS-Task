import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const DataContext = createContext();

export default function ApiData({ children }) {
   const [Data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
     async function GetData() {
        try {
            setLoading(true);
            const Res = await axios.get("https://mxpertztestapi.onrender.com/api/sciencefiction");
            console.log("API Response:", Res.data);
            setData(Res.data);
            setError(null);
        }
        catch (e) {
            console.log("Error To Fetching Data", e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
     }
     GetData();
   }, [])

  return (
    <DataContext.Provider value={{ Data, loading, error }}>
      {children}
    </DataContext.Provider>
  )
}