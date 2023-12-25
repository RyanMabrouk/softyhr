export function generateInitialValues(personnalChamps:any) {
  const initialValues = {};

  personnalChamps.forEach(({ champ, Fields }:any) => {
    Fields?.forEach(({ Row }:any) => {
      Row?.forEach((RowField:any) => {
        initialValues[RowField?.name] = RowField.value || ""; // You can set a default value if initialValue is not provided
      });
    });
  });

  return initialValues;
}
