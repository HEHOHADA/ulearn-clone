import React from 'react'
import {ReviewCode} from "./Review/ReviewCode";

export const ReviewPage = () => {
    return (
        <main className="page">
            <div className="container">
                <h2 className="text-center">Название темы</h2>
                <span className="text-lg-left mt-2">Имя ученика</span>
                <div className="border text-center p-3">код</div>
              <ReviewCode/>
            </div>
        </main>
    )
}
