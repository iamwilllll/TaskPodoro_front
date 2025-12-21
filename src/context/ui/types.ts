type alertMessageProps = {
    message: string;
    duration?: number;
};
export type LoadingProps = {
    isLoading: boolean;
    changeLoadingStatus: (value: boolean) => void;
};

type alertLinkProps = {
    linkTo: string;
    linkLabel: string;
    duration?: number;
};
export type NotificationStore = {
    message: string;
    messageIsVisible: boolean;
    messageShouldRender: boolean;

    showAlertMessage: ({ message, duration }: alertMessageProps) => void;

    linkTo: string;
    linkLabel: string;
    linkIsVisible: boolean;
    linkShouldRender: boolean;

    showAlertLink: ({ linkTo, linkLabel, duration }: alertLinkProps) => void;
};
