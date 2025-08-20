import React from 'react';
import { clsx } from 'clsx';

const Select = React.forwardRef((
  {
    label,
    error,
    helperText,
    className,
    required = false,
    options = [],
    placeholder = 'Select an option...',
    ...props
  },
  ref
) => {
  const selectClasses = clsx(
    'block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm',
    {
      'border-red-300 focus:border-red-500 focus:ring-red-500': error
    },
    className
  );
  
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={selectClasses}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;