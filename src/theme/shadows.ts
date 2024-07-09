export const SHADOWS = {
  card: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 4,
  },
};

export type Shadow = keyof typeof SHADOWS;
