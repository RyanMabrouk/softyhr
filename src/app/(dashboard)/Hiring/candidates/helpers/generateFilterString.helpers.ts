type LogicalOperators = {
  and: "and";
  or: "or";
};

export function generateFilterString(
  filters: Record<string, string[]>,
  filterKeys: any,
) {
  const logicalOperators: LogicalOperators = {
    and: "and",
    or: "or",
  };

  function buildFilterExpression(key: string, values: string[]): string {
    if (values.length === 0) {
      return ""; 
    }
    const orExpression = values.map((value) => `"${key}".eq."${value}"`);
    return `${logicalOperators.or}(${orExpression.join(",")})`;
  }

  const andExpressions: string[] = [];

  for (const key of Object.keys(filters)) {
    const values = filters[key];
    andExpressions.push(buildFilterExpression(filterKeys[key], values));
  }

  const andExpression = `${logicalOperators.and}(${andExpressions.filter(Boolean).join(",")})`;

  return andExpression;
}
