'use client'
import React, { useState } from 'react';


interface AutocompleteDropdownProps {
  options: string[];
}

export const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({ options }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInputValue(input);

    // Filter options based on user input
    const filtered = options.filter(option =>
      option.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setInputValue(option);
    setFilteredOptions([]);
  };

  return (
    <div className="w-64 mx-auto mt-8">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type here..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
      />
      <ul className="mt-2 border border-gray-300 rounded-md">
        {filteredOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionSelect(option)}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            {option}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xl">{selectedOption || 'None'}</p>
    </div>
  );
};

export default AutocompleteDropdown;
