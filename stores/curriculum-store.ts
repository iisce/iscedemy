import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { z } from 'zod';
import { CreateCurriculumSchema } from '@/schemas';

interface CurriculumState {
  draft: z.infer<typeof CreateCurriculumSchema> | null;
  setDraft: (draft: z.infer<typeof CreateCurriculumSchema>) => void;
  clearDraft: () => void;
}

export const useCurriculumStore = create<CurriculumState>()(
  persist(
    (set) => ({
      draft: null,
      setDraft: (draft) => set({ draft }),
      clearDraft: () => set({ draft: null }),
    }),
    {
      name: 'curriculum-draft', 
    }
  )
);