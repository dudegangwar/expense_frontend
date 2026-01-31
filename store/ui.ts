// Toast functionality removed — export a safe stub used only for compatibility
export const useToastStore = {
  getState: () => ({
    showToast: (_message: string, _type?: string, _duration?: number) => {
      // no-op
    },
  }),
};
