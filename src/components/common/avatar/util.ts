const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(' ');
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`;
  } else {
    return firstName[0];
  }
};
const isInitials = (label: string) => {
  return label === label.toUpperCase() && !label.includes(' ');
};

export { getInitials, isInitials };
