export type UsersState = {
    users: UsersItem[],
    isLoading: boolean,
    isError: null | string
}

export type UsersItem = {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string
}