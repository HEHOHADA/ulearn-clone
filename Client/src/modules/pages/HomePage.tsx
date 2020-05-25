import React, {useCallback, useContext, useEffect} from 'react'
import {HomeCourses} from "../components/home/HomeCourse/HomeCourses"
import {ICourse} from "../shared/interface"
import {RouteComponentProps} from "react-router-dom"
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {UserContext} from "../context/UserContext"

export const HomePage = (props: RouteComponentProps) => {

    const {history} = props
    const {loading, request} = useHttp()
    const auth = useContext(AuthContext)
    const {chooseTheme} = useContext(UserContext)
    const onClickHandler = (course: ICourse) => {
        if (!auth.userId) {
            history.push('/login')
        }
        const link = `course/${course.id}`
        const courseId = link.split("/")[1]
        //substype
        const data = request(`${process.env.API}/api/user/subscription/`,
            'GET',
            {id: courseId})


        //if have subscription redirect to course page
        if (data) {
            chooseTheme({course: courseId})
            history.push(link)
        } else {
            // redirect to payment page

        }

    }

// will be replace for api connect
    const courses: ICourse[] = [
        {description: "321321321 312 321 312 3123 213 123", id: "1", name: "3"},
        {description: "321321321 312 321 312 3123 213 123", id: "2", name: "3"},
    ]

    const fetchCourse = useCallback(async () => {
        try {
            // using api
        } catch (e) {
            //catching errors
        }
    }, [])

    useEffect(() => {
        fetchCourse()
    }, [fetchCourse])


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
                                        <HomeCourses courses={courses} onClick={onClickHandler} loading={loading}/>
                                    </div>
                                    <nav>
                                        <ul className="pagination"/>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
