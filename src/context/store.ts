import { create } from 'zustand';

type useLoadingProps = {
    isLoading: boolean;
    changeLoadingStatus: (value: boolean) => void;
};

type useNotificationProps = {
    message: string;
    isVisible: boolean;
    showNotification: (message: string) => void;
};

type useUserProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentUser: any;
    setUser: (user: unknown) => void;
    resetUser: () => void;
};

export const useLoading = create<useLoadingProps>()((set) => ({
    isLoading: false,
    changeLoadingStatus: (value) => set(() => ({ isLoading: value })),
}));

export const useNotification = create<useNotificationProps>((set) => ({
    message: '',
    isVisible: false,

    showNotification: (message) => {
        setTimeout(() => set({ message, isVisible: true }), 500);
        setTimeout(() => set({ message: '', isVisible: false }), 3000);
    },
}));

export const useUser = create<useUserProps>((set) => ({
    currentUser: {},

    setUser: (user) => set({ currentUser: user }),
    resetUser: () => set({ currentUser: null }),
}));
