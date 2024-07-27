function playerFactory(name, icon) {
  let points = 0;

  const getPoints = () => points;
  const setPoints = () => points++;
  const resetPoints = () => (points = 0);

  return { name, icon, getPoints, setPoints, resetPoints };
}
