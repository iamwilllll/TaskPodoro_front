export type RegisterT = {
    name: string;
    username: string;
    email: string;
    password: string;
    repeat_password: string;
};

export type LoginT = {
    email: string;
    password: string;
};

export type VerifyUserT = {
    code: string;
    email: string;
};
