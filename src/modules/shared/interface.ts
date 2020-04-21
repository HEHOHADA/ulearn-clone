export interface ILink {
    name: string
    link: string
}


export interface Footer {
    link: ILink[]
    name: string
}

export interface LoginModel {
    email: string
    password: string
}


export interface RegisterModel {
    username: string
    email: string
    password: string
}

export interface Course {
    name: string
    id: string
    description: string
    time: Date
}

export interface ISubscription {
    name: string
    price: number
    benefits: string
}

export interface ICourse {
    name: string
    subscriptionType: string
    description: string
    // themas: Array<ITheme>
}

export interface ITheme {
    name: string
    maxPoints: string
    modules: Array<IModule>
}

export interface IModule {
    name: string
    video?: any
    code?: any
    test?: Array<ITest>
}

export interface ITest {
    question: string
    rightAnswer: Array<number> | number
    answer: Array<string>
    points:number
}
