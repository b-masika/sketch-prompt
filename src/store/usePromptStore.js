import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { prompts } from '../data/prompts';

export const usePromptStore = create(
  persist(
    (set, get) => ({
      // State
      currentPrompt: prompts[0],
      savedPromptIds: [],
      completedDates: {},

      // Actions
    generatePrompt: () => {
        const state = get();
        let nextPrompt;
        do {
          nextPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        } while (nextPrompt.id === state.currentPrompt.id);
        set({ currentPrompt: nextPrompt });
      },

      toggleSave: (id) => {
        set((state) => ({
          savedPromptIds: state.savedPromptIds.includes(id)
            ? state.savedPromptIds.filter((pid) => pid !== id)
            : [...state.savedPromptIds, id]
        }));
      },

      clearSaved: () => set({ savedPromptIds: [] }),

      toggleComplete: (dateString) => {
        set((state) => ({
          completedDates: {
            ...state.completedDates,
            [dateString]: !state.completedDates[dateString]
          }
        }));
      },
    }),
    {
      name: 'prompt-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);