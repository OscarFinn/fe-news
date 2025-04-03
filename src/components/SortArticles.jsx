import { useEffect, useState, useRef } from "react";

export default function SortArticles({ searchParams, setSearchParams }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: "sort_bycreated_at&order=ASC", label: "Old" },
    { value: "sort_by=created_at", label: "New" },
    { value: "sort_by=comment_count", label: "Most Commented" },
    { value: "sort_by=comment_count&order=ASC", label: "Least Commented" },
    { value: "sort_by=votes", label: "Best" },
    { value: "sort_by=votes&order=ASC", label: "Worst" },
  ];

  const handleSelect = (e, option, optionLabel) => {
    e.preventDefault();
    setSelected(optionLabel);
    setSearchParams(option);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: "relative", maxWidth: "300px", margin: "auto" }}>
      <input
        name="sort"
        type="text"
        value={selected}
        onFocus={() => {
          setIsOpen(true);
        }}
        placeholder="--Sort Articles--"
        className="search-input"
        required
      />

      {isOpen && (
        <div ref={dropdownRef} className="dropdown-overlay">
          {sortOptions.map(({ value, label }) => (
            <div
              key={value}
              className="dropdown-item"
              onClick={(e) => handleSelect(e, value, label)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
