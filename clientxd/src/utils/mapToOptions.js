export const mapToOption = element => {
  return { label: element, value: element };
};

export const mapToOptions = elements => {
  return elements.map(x => ({ label: x, value: x }));
};

export const mapToOptionsWithNone = elements => {
  return [
    { label: "None", value: "None" },
    ...elements.map(x => ({ label: x, value: x }))
  ];
};
