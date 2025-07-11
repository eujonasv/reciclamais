import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Clock, TrendingUp, X, History } from 'lucide-react';
import { useSmartSearch } from '@/hooks/use-smart-search';
import { CollectionPoint } from '@/types/collection-point';

interface SmartSearchInputProps {
  data: CollectionPoint[];
  onSearch: (term: string) => void;
  onResults: (results: CollectionPoint[]) => void;
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
}

export function SmartSearchInput({
  data,
  onSearch,
  onResults,
  placeholder,
  className = '',
  showSuggestions = true,
}: SmartSearchInputProps) {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    suggestions,
    handleSearch,
    clearSearchHistory,
  } = useSmartSearch({
    data,
    searchKeys: ['name', 'address', 'description', 'materials'],
  });

  const allSuggestions = [
    ...suggestions.recent,
    ...suggestions.popular,
    ...suggestions.suggestions,
  ];

  useEffect(() => {
    onResults(searchResults);
  }, [searchResults, onResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    // Delay blur to allow clicking on suggestions
    setTimeout(() => setIsFocused(false), 200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
    onSearch(suggestion);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || !isFocused) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < allSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && allSuggestions[selectedIndex]) {
          handleSuggestionClick(allSuggestions[selectedIndex].text);
        } else if (searchTerm.trim()) {
          handleSearch(searchTerm);
          onSearch(searchTerm);
          setIsFocused(false);
        }
        break;
      case 'Escape':
        setIsFocused(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleSearch(searchTerm);
      onSearch(searchTerm);
      setIsFocused(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    inputRef.current?.focus();
  };

  const showSuggestionsDropdown = showSuggestions && isFocused && 
    (searchTerm.length === 0 || allSuggestions.length > 0);

  return (
    <div className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" 
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || t('search.placeholder')}
            className={`pl-10 pr-10 transition-all duration-200 ${
              isFocused ? 'ring-2 ring-primary' : ''
            }`}
            aria-label={t('accessibility.searchButton')}
            aria-expanded={showSuggestionsDropdown}
            aria-haspopup="listbox"
            role="combobox"
            aria-activedescendant={selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined}
          />
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
              aria-label={t('common.clear')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      {showSuggestionsDropdown && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg border">
          <CardContent className="p-0" ref={suggestionsRef}>
            <div role="listbox" aria-label={t('search.suggestions')}>
              {/* Recent Searches */}
              {suggestions.recent.length > 0 && (
                <div className="p-3 border-b">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {t('search.recentSearches')}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearSearchHistory}
                      className="h-auto p-1 text-xs"
                    >
                      <History className="h-3 w-3 mr-1" />
                      {t('search.clearHistory')}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {suggestions.recent.map((suggestion, index) => (
                      <Badge
                        key={suggestion.id}
                        variant="secondary"
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => handleSuggestionClick(suggestion.text)}
                      >
                        {suggestion.text}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              {suggestions.popular.length > 0 && (
                <div className="p-3 border-b">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                    <TrendingUp className="h-4 w-4" />
                    {t('search.popularSearches')}
                  </div>
                  <div className="space-y-1">
                    {suggestions.popular.map((suggestion, index) => {
                      const suggestionIndex = suggestions.recent.length + index;
                      return (
                        <button
                          key={suggestion.id}
                          id={`suggestion-${suggestionIndex}`}
                          role="option"
                          aria-selected={selectedIndex === suggestionIndex}
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-accent transition-colors ${
                            selectedIndex === suggestionIndex ? 'bg-accent' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{suggestion.text}</span>
                            {suggestion.count && (
                              <span className="text-xs text-muted-foreground">
                                {suggestion.count}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Auto-complete Suggestions */}
              {suggestions.suggestions.length > 0 && (
                <div className="p-3">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {t('search.suggestions')}
                  </div>
                  <div className="space-y-1">
                    {suggestions.suggestions.map((suggestion, index) => {
                      const suggestionIndex = suggestions.recent.length + suggestions.popular.length + index;
                      return (
                        <button
                          key={suggestion.id}
                          id={`suggestion-${suggestionIndex}`}
                          role="option"
                          aria-selected={selectedIndex === suggestionIndex}
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-accent transition-colors ${
                            selectedIndex === suggestionIndex ? 'bg-accent' : ''
                          }`}
                        >
                          {suggestion.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* No suggestions */}
              {allSuggestions.length === 0 && searchTerm.length > 0 && (
                <div className="p-3 text-sm text-muted-foreground text-center">
                  {t('search.noResults')}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}