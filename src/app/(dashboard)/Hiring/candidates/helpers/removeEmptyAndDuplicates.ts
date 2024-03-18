interface Option {
  label: string;
  value: any;
}

export const removeEmptyAndDuplicates = (options: Option[]): Option[] => {
  const uniqueValues: Set<any> = new Set();
  const filteredOptions: Option[] = [];

  options?.forEach((option) => {
    if (option.label && !uniqueValues.has(option.value)) {
      filteredOptions.push(option);
      uniqueValues.add(option.value);
    }
  });

  return filteredOptions;
};
