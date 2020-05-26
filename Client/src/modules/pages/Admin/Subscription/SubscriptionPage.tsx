import React, {useEffect, useState} from 'react'
import {SubscriptionView} from "../../../components/pay/SubscriptionView"
import {useHistory} from 'react-router-dom'
import {useHttp} from "../../../hooks/http.hook"
import {subscriptionRequest} from "../../../shared/request"
import {ISubscription} from "../../../shared/interface"
import {useFetch} from "../../../hooks/fetch.hook"
import {useForm} from "../../../hooks/form.hook"

export const SubscriptionPage = () => {

    const history = useHistory()
    const {request, loading} = useHttp()
    const [subscriptions, setSubscriptions] = useState<Array<ISubscription>>()
    const {fetched, isBusy} = useFetch<Array<ISubscription>>(subscriptionRequest)
    const [sort, setSort] = useState<number>(0)
    const [page, setPage] = useState(1)
    useEffect(() => {
        if (!isBusy) {
            console.log('fetched', fetched)
            setSubscriptions(fetched)
        }
    }, [isBusy])

    const onEditHandler = (id: number) => {
        history.push(`/admin/subscription/edit/${id}`)
    }

    const onClickCreate = () => {
        history.push(`/admin/subscription/create`)
    }

    const onDeleteHandler = async (id: number) => {
        try {
            const deleted = await request(`${subscriptionRequest}/${id}`, 'DELETE')
            const newSubs = subscriptions!.filter((sub: ISubscription) => sub.id !== deleted.id)
            setSubscriptions(newSubs)
        } catch (e) {
            console.log(e)
        }
    }
    const initialValues = {
        fromLevel: 0,
        toLevel: 0,
        fromPrice: 0,
        toPrice: 0
    }

    const {form, generateInputs} = useForm(initialValues)
    const filterHandler = async (sortBy: number, pagee?: number) => {
        try {
            if (sortBy !== -1) {
                setSort(sortBy)
            }
            const response = await request(`${subscriptionRequest}?page=${pagee ?? page}&pageSize=${3}&fromLevel=${form.fromLevel}&toLevel=${form.toLevel}&fromPrice=${form.fromPrice}&toPrice=${form.toPrice}&sortType=${sort}`, 'GET')
            if (response) {
                setSubscriptions(response)
            }
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="row">
            {!isBusy && <SubscriptionView
                subscription={subscriptions}
                loading={loading}
                onDelete={onDeleteHandler}
                onClick={onEditHandler}
                text={"Edit"}/>}
            <div className="container pt-4">
                <button className="btn btn-primary" onClick={onClickCreate}>Создать подписку</button>
                <div className="btn-block m-5">
                    <button type="submit" className="btn btn-primary m-1" onClick={() => filterHandler(0)}>По убыванию
                        цены
                    </button>
                    <button type="submit" className="btn btn-primary m-1" onClick={() => filterHandler(1)}>по
                        возрастанию цены
                    </button>
                    <button type="submit" className="btn btn-primary m-1" onClick={() => filterHandler(2)}>По убыванию
                        левела
                    </button>
                    <button type="submit" className="btn btn-primary m-1" onClick={() => filterHandler(3)}>по
                        возрастанию левела
                    </button>
                    <button
                        disabled={page === 1}
                        onClick={async () => {
                            setPage(page - 1)
                            await filterHandler(-1, page - 1)
                        }
                        }>previous

                    </button>
                    <strong>{page}</strong>
                    <button
                        onClick={async () => {
                            setPage(page + 1)
                            await filterHandler(-1, page + 1)
                        }}
                    >next
                    </button>
                </div>
            </div>

            <div className="m-5">
                {generateInputs()}
            </div>

        </div>
    )
}
