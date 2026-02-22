import { create } from 'zustand';
import { prompts } from '../data/prompts';

export const usePromptStore = create((set) => ({
  currentPrompt: prompts[Math.floor(Math.random() * prompts.length)],

  //Set prompts (for random, calendar, mood etc.)
  setPrompts: (data) => set({ prompts: data }),

  generatePrompt: () => {
    set((state) => {
      let nextPrompt;
      do {
        nextPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      } while (nextPrompt.id === state.currentPrompt.id);
      return { currentPrompt: nextPrompt };
    })
  }

}));