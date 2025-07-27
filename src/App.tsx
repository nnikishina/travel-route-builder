import React, { useState, useCallback } from "react";
import Select from "react-select";
import "./App.css";

interface Option {
  value: string;
  label: string;
  flag: string;
}

const options: Option[] = [
  { value: "usa", label: "United States", flag: "🇺🇸" },
  { value: "germany", label: "Germany", flag: "🇩🇪" },
  { value: "france", label: "France", flag: "🇫🇷" },
  { value: "japan", label: "Japan", flag: "🇯🇵" },
];

function App() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [addedCountries, setAddedCountries] = useState<Option[]>([]);

  const handleChange = (option: Option | null) => {
    setSelectedOption(option);
  };

  const handleAddCountry = () => {
    if (!selectedOption) return;
    
    const countryExists = addedCountries.find(country => country.value === selectedOption.value);
    if (!countryExists) {
      setAddedCountries([...addedCountries, selectedOption]);
    }
  };

  const formatOptionLabel = useCallback((option: Option) => (
    <div className="flex items-center gap-2">
      <span className="text-xl">{option.flag}</span>
      <span>{option.label}</span>
    </div>
  ), []);

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <Select<Option>
          defaultValue={selectedOption}
          onChange={handleChange}
          options={options}
          formatOptionLabel={formatOptionLabel}
          placeholder="Select a country..."
          styles={{
            container: (provided) => ({
              ...provided,
              width: '300px'
            })
          }}
        />
        <button 
          onClick={handleAddCountry}
          disabled={!selectedOption}
          className={`h-[38px] px-4 text-white border-none rounded text-sm ${
            selectedOption 
              ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Add country
        </button>
      </div>
      
      {addedCountries.length > 0 && (
        <div>
          <ul className="list-none p-0">
            {addedCountries.map((country) => (
              <li 
                key={country.value} 
                className="flex items-center gap-2 mb-2 p-2 bg-gray-100 rounded"
              >
                <span className="text-2xl">{country.flag}</span>
                <span>{country.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
