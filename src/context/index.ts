export const useUser = create<useUserProps>((set) => ({
    currentUser: {},
    isCheckingAuth: false,
    setUser: (user) => set({ currentUser: user }),
    resetUser: () => set({ currentUser: null }),
}));

import { create } from 'zustand';

type useLoadingProps = {
    isLoading: boolean;
    changeLoadingStatus: (value: boolean) => void;
};

type useUserProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentUser: any | null;
    isCheckingAuth: boolean;
    setUser: (user: unknown) => void;
    resetUser: () => void;
};

export const useLoading = create<useLoadingProps>()((set) => ({
    isLoading: false,
    changeLoadingStatus: (value) => set(() => ({ isLoading: value })),
}));

export * from './ui/alerts.store';


