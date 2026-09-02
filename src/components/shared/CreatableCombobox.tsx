'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Check, ChevronsUpDown, Loader2, Plus, Search, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface ComboboxOption {
  _id: string;
  name: string;
}

export interface CreatableComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  onCreate?: (name: string) => Promise<ComboboxOption | null | void>;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  createText?: (name: string) => string;
  disabled?: boolean;
  className?: string;
}

export function CreatableCombobox({
  options,
  value,
  onChange,
  onCreate,
  placeholder = 'Select…',
  searchPlaceholder = 'Search…',
  emptyText = 'No items found.',
  createText,
  disabled = false,
  className,
}: CreatableComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } else {
      setQuery('');
    }
  }, [open]);

  const selectedOption = useMemo(() => {
    return options.find((opt) => opt._id === value);
  }, [options, value]);

  const trimmedQuery = query.trim();

  const filteredOptions = useMemo(() => {
    if (!trimmedQuery) return options;
    const lower = trimmedQuery.toLowerCase();
    return options.filter((opt) => opt.name.toLowerCase().includes(lower));
  }, [options, trimmedQuery]);

  const exactMatch = useMemo(() => {
    if (!trimmedQuery) return null;
    const lower = trimmedQuery.toLowerCase();
    return options.find((opt) => opt.name.trim().toLowerCase() === lower);
  }, [options, trimmedQuery]);

  const handleSelect = (optionId: string) => {
    onChange(optionId);
    setOpen(false);
    setQuery('');
  };

  const handleCreate = async () => {
    if (!trimmedQuery || !onCreate || isCreating) return;

    // If an exact match already exists, simply select it
    if (exactMatch) {
      handleSelect(exactMatch._id);
      return;
    }

    setIsCreating(true);
    try {
      const created = await onCreate(trimmedQuery);
      if (created && created._id) {
        onChange(created._id);
        setOpen(false);
        setQuery('');
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // If exact match found, select it
      if (exactMatch) {
        handleSelect(exactMatch._id);
      } else if (filteredOptions.length === 1) {
        handleSelect(filteredOptions[0]._id);
      } else if (trimmedQuery && onCreate) {
        handleCreate();
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type='button'
          disabled={disabled}
          className={cn(
            'flex h-9 w-full items-center justify-between rounded-sm border border-border/60 bg-transparent px-3 py-1 text-sm text-foreground shadow-xs transition-colors hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            !selectedOption && 'text-muted-foreground',
            className
          )}
        >
          <span className='truncate'>
            {selectedOption ? selectedOption.name : placeholder}
          </span>
          <div className='ml-2 flex shrink-0 items-center gap-1'>
            {value && !disabled && (
              <span
                role='button'
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    onChange('');
                  }
                }}
                className='rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground'
                title='Clear selection'
              >
                <X className='h-3 w-3' />
              </span>
            )}
            <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align='start'
        sideOffset={4}
        className='z-70 w-(--radix-popover-trigger-width) min-w-55 p-0 shadow-lg rounded-sm border-border/60 bg-popover'
      >
        {/* Search Input */}
        <div className='flex items-center gap-2 border-b border-border/40 px-3 py-2'>
          <Search className='h-4 w-4 shrink-0 text-muted-foreground' />
          <input
            ref={inputRef}
            type='text'
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isCreating}
            className='h-6 w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none disabled:opacity-50'
          />
          {query && !isCreating && (
            <button
              type='button'
              onClick={() => setQuery('')}
              className='text-muted-foreground hover:text-foreground'
            >
              <X className='h-3.5 w-3.5' />
            </button>
          )}
        </div>

        {/* Options List */}
        <div className='max-h-56 overflow-y-auto p-1'>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => {
              const isSelected = opt._id === value;
              return (
                <button
                  key={opt._id}
                  type='button'
                  onClick={() => handleSelect(opt._id)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-sm px-2.5 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                    isSelected && 'bg-accent/60 font-medium'
                  )}
                >
                  <span className='truncate'>{opt.name}</span>
                  {isSelected && <Check className='h-4 w-4 shrink-0 text-brand-navy' />}
                </button>
              );
            })
          ) : (
            <div className='py-4 text-center text-xs text-muted-foreground'>
              {emptyText}
            </div>
          )}

          {/* Creatable action if query doesn't match an exact option */}
          {trimmedQuery && onCreate && !exactMatch && (
            <button
              type='button'
              onClick={handleCreate}
              disabled={isCreating}
              className='mt-1 flex w-full items-center gap-2 border-t border-border/40 px-2.5 py-2 text-left text-sm font-medium text-brand-navy transition-colors hover:bg-brand-navy/10 disabled:opacity-50'
            >
              {isCreating ? (
                <Loader2 className='h-3.5 w-3.5 animate-spin shrink-0' />
              ) : (
                <Plus className='h-3.5 w-3.5 shrink-0 text-brand-navy' />
              )}
              <span className='truncate'>
                {createText ? createText(trimmedQuery) : `Create "${trimmedQuery}"`}
              </span>
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
