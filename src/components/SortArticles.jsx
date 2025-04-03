import { useEffect, useState, useRef } from "react";

export default function SortArticles({ searchParams, setSearchParams }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: "sort_by=created_at&order=ASC", label: "Old" },
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
    const currentSortBy = searchParams.get("sort_by");
    const currentOrder = searchParams.get("order");

    console.log({ currentSortBy, currentOrder });

    let currentOption;

    if (currentSortBy && currentOrder) {
      console.log({ currentSortBy, currentOrder }, "<--- sort by and order");
      currentOption = sortOptions.find(
        (option) =>
          option.value.includes(`sort_by=${currentSortBy}`) &&
          option.value.includes(`order=${currentOrder}`)
      );
    } else if (currentSortBy) {
      console.log({ currentSortBy, currentOrder }, "<---only sort by");
      currentOption = sortOptions.find((option) => {
        return (
          option.value.includes(`sort_by=${currentSortBy}`) &&
          !option.value.includes("order=")
        );
      });
      console.log(currentOption, "<--- sort by only");
    }

    if (currentOption) {
      setSelected(currentOption.label);
    } else {
      setSelected("New");
    }
  }, [searchParams]);

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
        placeholder=""
        className="search-input"
        readOnly
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
