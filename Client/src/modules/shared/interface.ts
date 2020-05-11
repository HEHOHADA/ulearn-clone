export interface Token {
    aud: string
    exp: number
    iss: string
    jti: string
    name: string
    sub: string
    role?: string
}

export interface ILink {
    name: string
    link: string
}


export interface Footer {
    link: ILink[]
    name: string
}

export interface LoginModel {
    login: string
    password: string
}


export interface RegisterModel {
    username: string
    email: string
    password: string
}

export interface IData {
    token?: string
    message?: Array<string>
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
    name: string | null
    subscriptionType: string
    description: string
    id?: string
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
    answers: Array<IAnswer>
    points: number
}

export interface IAnswer {
    answerText: string
    isCorrect: boolean
}

export interface IGroup {
    name: string
    courseName: string
    participants?: Array<string>
}


export interface ObjectKeys {
    [key: string]: string
}

type picture = "image/png" | "image/jped"

export interface Picture {
    lastModified: number
    lastModifiedDate: Date
    name: string
    path: string
    size: number
    type: picture
    webkitRelativePath: string
}
