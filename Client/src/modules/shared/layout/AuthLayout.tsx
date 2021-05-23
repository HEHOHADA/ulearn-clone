import React from 'react'
import MainLayout from "./MainLayout"


export const AuthLayout = (props: any) => {
    return (
        <MainLayout>
            <main className="page login-page">
                <section className="clean-block clean-form dark">
                    <div className="container">
                        {props.children}
                    </div>
                </section>
            </main>
        </MainLayout>
    )
}
