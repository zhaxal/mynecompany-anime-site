"use client";

import { useState, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash/debounce";
import { Anime } from "@/types/search";

interface SearchBarProps {
  suggestions: Anime[];
}

function SearchBar({ suggestions }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isValidSearch = (query: string) => {
    const pattern = /^[a-zA-Z0-9\s\-_,.]+$/;
    return pattern.test(query);
  };

  const debouncedUpdateUrl = useCallback(
    debounce((query: string) => {
      if (!query || query.length < 2) {
        router.push("/");
        return;
      }
      if (!isValidSearch(query)) return;

      router.push(`/?q=${encodeURIComponent(query)}`);
    }, 300),
    [router]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    setShowSuggestions(true);
    debouncedUpdateUrl(newValue);
  };

  const handleSuggestionClick = (animeId: number) => {
    router.push(`/anime/${animeId}`);
  };

  const AnimeListItem = ({
    anime,
    onClick,
  }: {
    anime: Anime;
    onClick: () => void;
  }) => (
    <div
      onClick={onClick}
      className="px-3 py-2 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-0"
    >
      <div className="text-gray-200 text-sm">{anime.title_orig}</div>
      <div className="text-xs text-gray-400">
        {anime.year} {anime.last_episode && `• ${anime.last_episode} ep.`}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <input
        value={search}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        type="text"
        placeholder="Search..."
        className="w-full py-3 pl-12 pr-4 text-gray-200 bg-gray-800 
            rounded-lg border border-gray-700 shadow-lg
            placeholder-gray-400 focus:outline-none focus:ring-2 
            focus:ring-purple-500 focus:border-transparent
            transition-all duration-200 ease-in-out"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="h-5 w-5 text-purple-400" />
      </div>

      {showSuggestions && search && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-gray-800 rounded-lg border border-gray-700 shadow-xl max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {suggestions.map((anime) => (
            <AnimeListItem
              key={anime.shikimori_id}
              anime={anime}
              onClick={() => handleSuggestionClick(anime.shikimori_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
