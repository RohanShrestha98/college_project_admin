export const convertToSelectOptions = (lists) => {
  const options = lists?.map((item) => {
    return { value: item?.id || item?._id, label: item?.title };
  });
  return options;
};
