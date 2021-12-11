import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid"
const FeedbackContext =createContext()

export const FeedbackProvider = ({children})=>{
    const [feedback, setFeedback] = useState([{
        id: 1,
        text: "This is feedback item 1",
        rating: 10
    },
    {
        id: 2,
        text: "This is feedback item 2",
        rating: 7
    },
    {
        id: 3,
        text: "This is feedback item 3",
        rating: 9
    }])

    const deleteFeedback = (id)=>{
        if(window.confirm('Do you want to delete?')){
            setFeedback(feedback.filter((item)=> item.id !== id))
        }
    }

    const [feedbackEdit, setfeedbackEdit] = useState({
        item:{},
        edit: false
    })

    const editFeedback = (item)=>{
        setfeedbackEdit({
            item,
            edit: true
        })
    }

    const updateFeedback = (id, updItem)=>{
        console.log(id, updItem)
        setFeedback(
            feedback.map((item)=>(item.id===id ? {...item,...updItem }: item))
            )
            setfeedbackEdit({
                item:{},
                edit: false
            })
    }


    const addFeedback = (newFeedback)=>{
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
}

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext