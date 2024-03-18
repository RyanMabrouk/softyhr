type LogicalOperators = {
  and: "and";
  or: "or";
};

interface FilterObject {
  TableName: string;
  FilterQuery: string;
}

export function generateFilterArray(
  filters: Record<string, string[]>,
  filterKeys: Record<string, string>,
): FilterObject[] {
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

  const filterGroups: Record<string, string[]> = {};

  // Group filters by table name
  for (const key of Object.keys(filters)) {
    const values = filters[key];
    const tableKey = `${key}Table`;
    const tableName = filterKeys[tableKey];
    if (!tableName) {
      console.error(`Table name not found for key: ${tableKey}`);
      continue;
    }
    if (!filterGroups[tableName]) {
      filterGroups[tableName] = [];
    }

    const buildFilterExpressionValue = buildFilterExpression(
      filterKeys[key],
      values,
    );
    if (buildFilterExpressionValue !== "") {
      filterGroups[tableName].push(buildFilterExpressionValue);
    }
  }
  const filterObjects: FilterObject[] = [];

  // Construct FilterObjects from filterGroups
  for (const tableName of Object.keys(filterGroups)) {
    const filterQuery = filterGroups[tableName].join(",");
    if (filterQuery !== "") {
      if (filterGroups[tableName].length === 1) {
        filterObjects.push({ TableName: tableName, FilterQuery: filterQuery });
      } else {
        filterObjects.push({
          TableName: tableName,
          FilterQuery: `${logicalOperators.and}(${filterQuery})`,
        });
      }
    }
  }

  return filterObjects;
}
