import React, { useCallback } from "react";
import AsyncSelect from "react-select/async";
import { getCountriesByName } from "@yusifaliyevpro/countries";
import { useDebounce } from "../hooks/useDebounce";
import type { Option } from "../types";

interface CountrySelectorProps {
  selectedOption: Option | null;
  onCountryChange: (option: Option | null) => void;
  onAddCountry: () => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedOption,
  onCountryChange,
  onAddCountry,
}) => {
  const loadOptionsOriginal = useCallback(
    async (inputValue: string): Promise<Option[]> => {
      const trimmedValue = inputValue.trim();

      if (!trimmedValue) {
        return [];
      }

      try {
        const countries = await getCountriesByName({
          name: trimmedValue,
          fields: ["name", "flag"],
        });

        if (!countries) {
          return [];
        }

        return countries.map((country) => ({
          value: country.name.common.toLowerCase().replace(/\s+/g, "-"),
          label: country.name.common,
          flag: country.flag,
        }));
      } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
      }
    },
    [],
  );

  const loadOptions = useDebounce(loadOptionsOriginal, 600);

  const formatOptionLabel = useCallback(
    (option: Option) => (
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="text-xl">{option.flag}</span>
        <span>{option.label}</span>
      </div>
    ),
    [],
  );

  return (
    <div className="p-4 flex gap-2 bg-white shadow z-10">
      <AsyncSelect<Option>
        value={selectedOption}
        onChange={onCountryChange}
        loadOptions={loadOptions}
        formatOptionLabel={formatOptionLabel}
        placeholder="Search for a country..."
        isClearable
        noOptionsMessage={({ inputValue }) =>
          inputValue
            ? `No countries found for "${inputValue}"`
            : "Type to search countries"
        }
        styles={{
          container: (provided) => ({
            ...provided,
            width: "400px",
          }),
        }}
      />
      <button
        onClick={onAddCountry}
        disabled={!selectedOption}
        className={`h-[38px] px-4 text-white border-none rounded text-sm ${
          selectedOption
            ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Add country
      </button>
    </div>
  );
};
