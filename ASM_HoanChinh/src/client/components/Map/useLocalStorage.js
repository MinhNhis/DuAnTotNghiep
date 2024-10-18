import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    const timeoutId = setTimeout(() => {
      localStorage.removeItem(key);
      setValue(initialValue);
    }, 60000);

    return () => clearTimeout(timeoutId);
  }, [key, value, initialValue]);

  return [value, setValue];
}
