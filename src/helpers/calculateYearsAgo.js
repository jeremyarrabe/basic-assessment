export const calculateYearsAgo = (dateString) => {
  const inputDate =
    dateString.length === 4 ? new Date(`${dateString}-01-01T00:00:00.000Z`) : new Date(dateString);

  const currentDate = new Date();
  let yearsAgo = currentDate.getFullYear() - inputDate.getFullYear();

  const hasNotHadAnniversaryThisYear =
    currentDate.getMonth() < inputDate.getMonth() ||
    (currentDate.getMonth() === inputDate.getMonth() &&
      currentDate.getDate() < inputDate.getDate());

  if (hasNotHadAnniversaryThisYear) {
    yearsAgo -= 1;
  }

  return yearsAgo;
};
