import {Question} from "../components/Admin/theme/TestForm";

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
}

export interface ISubscription {
    id?: number
    name: string
    price: number
    level?: number
}

export interface ICourse {
    name: string | null
    subscription?: ISubscription
    description: string
    id?: number
    modules?: Array<IModule>
    // themas: Array<ITheme>
}


export interface IModule {
    id?: number
    maxPoints?: number
    name: string
    codeTasks: Array<CodeTask>
    testTasks: Array<TestTask>
    videoTasks: Array<VideoTask>
}

export interface CommonTask {
    name: string
    description: string
    id?: string
}

export interface TestTask extends CommonTask {
    points?: number
    questions: Array<Question>
}

export interface CodeTask extends CommonTask {
    initialCode: string
    points: number
}

export interface VideoTask extends CommonTask {
    video: string
}

export interface ITheme {
    video?: any
    code?: any
    test?: Array<IQuestion>
}


export interface IQuestion {
    text: string
    answers: Array<IAnswer>
    points: number
}

export interface IAnswer {
    text: string
    isCorrect: boolean
}

export interface IGroup {
    name: string
    courseId?: any
    emails?: Array<string>
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
