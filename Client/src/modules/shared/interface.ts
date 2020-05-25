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
    id?: string
    // themas: Array<ITheme>
}

export interface IModule {
    name: string
    maxPoints: string
    tasks: Array<ITheme>
}

interface CommonTheme {
    name: string
    description: string
    id?: string
}

interface TestTask extends CommonTheme {
    questions: Array<Question>
}
interface CodeTask extends CommonTheme{
    code:string
}
interface VideoTask extends CommonTheme{
    video:string
}
export interface ITheme {
    video?: any
    code?: any
    test?: Array<IQuestion>
}

export interface IVideoTask {

}

export interface IQuestion {
    text: string
    answers: Array<IAnswer>
    points: number
}

export interface IAnswer {
    answerText: string
    isCorrect: boolean
}

export interface IGroup {
    name: string
    courseId: any
    userGroups?: Array<string>
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
