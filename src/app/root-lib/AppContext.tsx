'use client';
import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
  useContext
} from 'react';

interface AppContextData {
  appContextData: object;
  setAppContextData: React.Dispatch<React.SetStateAction<object>>;
}

const AppContext = createContext<AppContextData>({
  appContextData: {},
  setAppContextData: () => null
});

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appContextData, setAppContextData] = useState<object>({});

  // Use an effect to retrieve and set app context data from local storage
  useEffect(() => {
    // Attempt to retrieve stored data with the key 'appContextData' from local storage
    const storedData = localStorage.getItem('appContextData');

    // If 'appContextData' is found in local storage
    if (storedData) {
      // Parse the stored data as a JSON object
      const parsedObject = JSON.parse(storedData) || {};
      // Check if the parsed object has any keys (non-empty object)
      if (Object.keys(parsedObject)?.length > 0) {
        // Set the app context data using the parsed data
        setAppContextData(JSON.parse(storedData) as object);
      } else {
        // If data is not found in 'appContextData', try to get it from 'appData'
        const appData = localStorage.getItem('appData');
        // If 'appData' is found in local storage
        if (appData) {
          // Set the app context data using 'appData'
          setAppContextData(JSON.parse(appData) as object);
        }
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appContextData', JSON.stringify(appContextData));
  }, [appContextData]);

  const contextValue: AppContextData = useMemo(
    () => ({ appContextData, setAppContextData }),
    [appContextData, setAppContextData]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};



const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext should be used inside AppProvider');
  }

  return context;
};

export { AppContext, AppProvider, useAppContext };
