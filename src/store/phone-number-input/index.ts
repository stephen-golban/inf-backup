import { create } from 'zustand';

const initial_state = {
  minLength: 8,
  displayLength: 8,
};

const usePhoneNumberInputStore = create(() => initial_state);

function setPhoneNumberInputStore(state: Partial<typeof initial_state>) {
  usePhoneNumberInputStore.setState(state);
}

function resetPhoneNumberInputStore() {
  usePhoneNumberInputStore.setState(initial_state);
}

export { usePhoneNumberInputStore, resetPhoneNumberInputStore, setPhoneNumberInputStore };
