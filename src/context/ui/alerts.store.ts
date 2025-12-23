import { create } from 'zustand';
import type { LoadingProps, NotificationStore } from './types';

export const useLoading = create<LoadingProps>()((set) => ({
    isLoading: true,
    changeLoadingStatus: (value) => set(() => ({ isLoading: value })),
    
}));

export const useNotification = create<NotificationStore>((set) => ({
    message: '',
    messageIsVisible: false,
    messageShouldRender: false,
    showAlertMessage: ({ message, duration = 3000 }) => {
        setTimeout(() => set({ message, messageIsVisible: true, messageShouldRender: true }), 100);
        setTimeout(() => set({ messageIsVisible: false }), duration);
        setTimeout(() => set({ message: '', messageShouldRender: false }), duration + 400);
    },

    linkTo: '',
    linkLabel: '',
    linkIsVisible: false,
    linkShouldRender: false,
    showAlertLink: ({ linkTo, linkLabel, duration = 3000 }) => {
        setTimeout(() => set({ linkTo, linkLabel, linkIsVisible: true, linkShouldRender: true }), 100);
        setTimeout(() => set({ linkIsVisible: false }), duration);
        setTimeout(() => set({ linkTo: '', linkLabel: '', linkShouldRender: false }), duration + 400);
    },
}));
