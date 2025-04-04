import { useState, useEffect, useRef } from "react";

import { getTopics } from "../api";

export default function TopicsDropdown({ setTopic }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const dropdownRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option) => {
    setTopic(option);
    setSearch(option);
    setIsOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((response) => {
        const topicOptions = response.map((topic) => topic.slug);
        setOptions(topicOptions);
      })
      .catch((err) => {
        setError("Could not get list of topics");
      })
      .finally(() => {
        setIsLoading(false);
      });

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
      <label htmlFor="topic">Topic</label>
      <input
        name="topic"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => {
          setSearch("");
          setIsOpen(true);
        }}
        placeholder="Select a Topic"
        className="search-input"
        readOnly
      />

      {isOpen && (
        <div ref={dropdownRef} className="dropdown-overlay" id="topic-dropdown">
          {!isLoading ? (
            !error ? (
              filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option}
                    className="dropdown-item"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </div>
                ))
              ) : (
                <div className="dropdown-item disabled">No results found</div>
              )
            ) : (
              <div className="dropdown-item disabled">{error}</div>
            )
          ) : (
            <div className="dropdown-item disabled">loading</div>
          )}
        </div>
      )}
    </div>
  );
}
