import { create } from 'zustand';

export const usePromptStore = create((set) => ({
  prompts: [],
  Saved: [],

  //Set prompts (for random, calendar, mood etc.)
  setPrompts: (data) => set({ prompts: data }),

  // Add to saved (avoiding duplicates)
  addSaved: (prompt) => {
    const exists = get().saved.find((p) => p.id === prompt.id);
    if (!exists) {
      set((state) => ({
        saved: [...state.saved, prompt],
      }));
    }
  },
  
  // Remove from saved
  removeSaved: (id) =>
  set((state) => ({
    saved: state.saved.filter((prompt) => prompt.id !== id),
  })),

  // Remove prompt from main list
 removePrompt: (id) =>
  set((state) => ({
    prompts: state.prompts.filter((prompt) => prompt.id !== id),
  })),
}));