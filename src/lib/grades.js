// Grade boundaries and color mappings

export const getGrade = (average) => {
  if (average >= 90) return 'A';
  if (average >= 75) return 'B';
  if (average >= 60) return 'C';
  if (average >= 50) return 'D';
  return 'F';
};

export const GradeColor = {
  A: 'green-600',
  B: 'amber-500',
  C: 'orange-500',
  D: 'red-500',
  F: 'red-600',
};

export const calculateAverage = (scores = []) => {
  if (!scores.length) return 0;
  const total = scores.reduce((acc, curr) => acc + curr, 0);
  return total / scores.length;
};
