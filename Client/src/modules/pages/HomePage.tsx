import React, {useContext, useEffect} from 'react'
import {HomeCourses} from '../components/home/HomeCourse/HomeCourses'
import {ICourse} from '../shared/interface'
import {RouteComponentProps} from "react-router"
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {UserContext} from '../context/UserContext'
import {useFetch} from '../hooks/fetch.hook'
import {checkSubscription, courseRequest} from '../shared/request'

export const HomePage = (props: RouteComponentProps) => {

    const {history} = props
    const {loading, request} = useHttp()
    const auth = useContext(AuthContext)
    const {chooseTheme} = useContext(UserContext)
    const {fetched, isBusy} = useFetch<Array<ICourse>>(courseRequest)
    const onClickHandler = async (course: ICourse) => {
        if (!auth.isAuth) {
            history.push('/login')
        }
        const id = course.id
        const link = `course/${id}`
        // const courseId = link.split("/")[1]
        //substype
        const data = await request(`${checkSubscription}/${id}`)

        //if have subscription redirect to course page
        if (data.hasAccess) {
            chooseTheme({course: id})
            history.push(link)
        } else {
            if(data.subscriptionId){
                history.push(`pay/${data.subscriptionId}`)
            }
            // redirect to payment page
        }

    }

// will be replace for api connect
    const courses: ICourse[] = [
        {description: "321321321 312 321 312 3123 213 123", id: 1, name: "3"},
        {description: "321321321 312 321 312 3123 213 123", id: 2, name: "3"},
    ]

    return (
        <main className="page catalog-page">
            <section className="clean-block clean-catalog dark">
                <div className="container">
                    <div className="block-heading">
                        <h2 className="text-info">Course Page</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor
                            in, mattis vitae leo.</p>
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="products">
                                    <div className="row no-gutters">
                                        {!isBusy && <HomeCourses courses={fetched && fetched.length ? fetched : courses}
                                                                 onClick={onClickHandler}
                                                                 loading={loading}/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
