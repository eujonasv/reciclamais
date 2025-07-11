import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { CollectionPoint } from '@/types/collection-point';

interface SmartSearchOptions {
  threshold?: number;
  includeScore?: boolean;
  shouldSort?: boolean;
  includeMatches?: boolean;
  findAllMatches?: boolean;
  minMatchCharLength?: number;
  location?: number;
  distance?: number;
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'popular' | 'suggestion';
  count?: number;
}

interface UseSmartSearchProps {
  data: CollectionPoint[];
  searchKeys: string[];
  options?: SmartSearchOptions;
}

export function useSmartSearch({ data, searchKeys, options = {} }: UseSmartSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [popularSearches] = useState<SearchSuggestion[]>([
    { id: '1', text: 'papel', type: 'popular', count: 150 },
    { id: '2', text: 'plástico', type: 'popular', count: 120 },
    { id: '3', text: 'vidro', type: 'popular', count: 90 },
    { id: '4', text: 'eletrônicos', type: 'popular', count: 75 },
    { id: '5', text: 'bateria', type: 'popular', count: 60 },
  ]);

  // Configure Fuse.js for fuzzy search
  const fuseOptions = {
    keys: searchKeys,
    threshold: options.threshold || 0.4,
    includeScore: options.includeScore || true,
    shouldSort: options.shouldSort !== false,
    includeMatches: options.includeMatches || true,
    findAllMatches: options.findAllMatches || false,
    minMatchCharLength: options.minMatchCharLength || 2,
    location: options.location || 0,
    distance: options.distance || 100,
    ...options,
  };

  const fuse = useMemo(() => new Fuse(data, fuseOptions), [data, fuseOptions]);

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('searchHistory');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved).slice(0, 10)); // Keep only last 10
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }
  }, []);

  // Save search history to localStorage
  const saveSearchHistory = (term: string) => {
    if (!term.trim() || term.length < 2) return;
    
    const newHistory = [term, ...searchHistory.filter(h => h !== term)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Perform fuzzy search
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }

    const results = fuse.search(searchTerm);
    return results.map(result => result.item);
  }, [searchTerm, fuse, data]);

  // Generate search suggestions
  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) {
      const recentSuggestions: SearchSuggestion[] = searchHistory.map((term, index) => ({
        id: `recent-${index}`,
        text: term,
        type: 'recent',
      }));

      return {
        recent: recentSuggestions,
        popular: popularSearches,
        suggestions: [],
      };
    }

    // Find matching suggestions from popular searches
    const matchingSuggestions = popularSearches.filter(suggestion =>
      suggestion.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Generate autocomplete suggestions based on data
    const autocompleteSuggestions: SearchSuggestion[] = [];
    const uniqueTerms = new Set<string>();

    data.forEach(point => {
      searchKeys.forEach(key => {
        const value = point[key as keyof CollectionPoint];
        if (typeof value === 'string') {
          const words = value.toLowerCase().split(/\s+/);
          words.forEach(word => {
            if (
              word.includes(searchTerm.toLowerCase()) &&
              word.length > 2 &&
              !uniqueTerms.has(word)
            ) {
              uniqueTerms.add(word);
              autocompleteSuggestions.push({
                id: `auto-${word}`,
                text: word,
                type: 'suggestion',
              });
            }
          });
        }
      });
    });

    return {
      recent: [],
      popular: matchingSuggestions,
      suggestions: autocompleteSuggestions.slice(0, 5),
    };
  }, [searchTerm, searchHistory, popularSearches, data, searchKeys]);

  // Handle search submission
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    saveSearchHistory(term);
  };

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    suggestions,
    searchHistory,
    handleSearch,
    clearSearchHistory,
    highlightMatch,
    resultsCount: searchResults.length,
  };
}