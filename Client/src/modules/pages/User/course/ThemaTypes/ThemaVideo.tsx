import React from 'react'

export const ThemaVideo = () => {
    return (
        <div className="container">
            <h2>VIDEO</h2>
                <video width="320" height="240" controls>
                    <source src="https://www.youtube.com/watch?v=6xp9KeRcrRI"  type="video/mp4"/>
                </video>
        </div>
    )
}
