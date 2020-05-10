import React from 'react'
import {CourseForm} from "../../../components/Admin/course/CourseForm";
import {ICourse} from "../../../shared/interface";
import {CourseViewModel, ViewModelField} from "../../../view-models/CourseViewModel";

export const CourseCreate = () => {

    const a = new CourseViewModel("asd")
    return (
        <div>
            фывфывыв
            <input {...a.description.attributes}/>
        </div>

        //<CourseForm/>
    )

}

