interface Option {
  label: string;
  value: any;
}

export const removeEmptyAndDuplicates = (options: Option[]): Option[] => {
  const uniqueValues: Set<any> = new Set();
  const filteredOptions: Option[] = [];

  options?.forEach((option) => {
    if (option.label && !uniqueValues.has(option.label)) {
      filteredOptions.push(option);
      uniqueValues.add(option.label);
    }
  });

  return filteredOptions;
};
