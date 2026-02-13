import { create } from 'zustand'
import Saved from '../pages/Saved'

export const usePromptStore = create((set) => ({
  prompts: [],
  Saved: [],
  setPrompts: (data) => set({ prompts: data }),
  addSaved: (prompt) => set((state) => ({ Saved: [...state.Saved, prompt] })),
  removePrompt: (id) => set((state) => ({ prompts: state.prompts.filter(prompt => prompt.id !== id) }))
}));