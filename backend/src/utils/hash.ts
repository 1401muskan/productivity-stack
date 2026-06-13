import bcyrpt from "bcryptjs";

export const hashPassword = async (password: string) => {
    return bcyrpt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
    return bcyrpt.compare(password, hash);
};
