import React from 'react'
import {MainLayout} from "./MainLayout";


export const AuthLayout = (props: any) => {
    return (
        <MainLayout>
            <main className="page login-page">
                <section className="clean-block clean-form dark">
                    <div className="container">
                        <div className="block-heading">
                            <h2 className="text-info">{props.name}</h2>
                            <p> Пожауйста войдите в систему</p>
                        </div>
                        {props.children}
                    </div>
                </section>
            </main>
        </MainLayout>
    )
}
