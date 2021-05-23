import React from 'react'
import { IdentityForm } from './IdentityForm'

export const IdentitySettings = (props: any) => {
    let flag = ''
    let prop = {}
    const {settings, identity, submitData, loading} = props

    return (
        <>
            { settings.map(({value, name}: any, index: number) => {
                if (index === 1) {
                    flag = 'mb-3'
                } else {
                    prop = {
                        initialValues: {...identity}
                    }
                }
                return (
                    <div key={ `${ name }-${ index }` }>

                        <div className={ `card shadow ${ flag }` }>
                            <div className="card-header py-3">
                                <p className="text-primary m-0 font-weight-bold">{ name }</p>
                            </div>
                            <IdentityForm loading={ loading } { ...prop } submit={ submitData }
                                          formNames={ value }/>
                        </div>

                    </div>
                )
            })
            }
        </>
    )
}
