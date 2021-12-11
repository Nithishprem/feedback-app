
import {useState, useEffect,useContext} from "react"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
    const [text, setText] =useState('')
    const [rating, setRating] =useState(10)
    const [btnDisabled, setBtnDisabled] =useState(true)
    const [message, setMessage] =useState(null)
    
    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

    useEffect(()=>{
        if(feedbackEdit.edit === true){
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    },[feedbackEdit])
    
    const handleTextChange = (e)=>{
        setText(e.target.value)    
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const newFeedback = {
            text,
            rating
        }
        if(feedbackEdit.edit === true){
            updateFeedback(feedbackEdit.item.id, newFeedback)
        }
        else{
            addFeedback(newFeedback);
        }

        setText('')
    }
    
    useEffect(() => {
        if(text ===''){
            setBtnDisabled(true)
            setMessage(null)
        }else if(text !=='' && text.trim().length <= 10){
            setBtnDisabled(true)
            setMessage('Text must be atleast 10 characters')
        }else{
            setMessage(null)
            setBtnDisabled(false)
        } 
        return()=>{
            // console.log('unmounted');
        }
        
    }, [text])
    
    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select = {(rating)=> (setRating(rating))}/>
                <div className="input-group">
                    <input type="text" 
                    onChange={handleTextChange}
                    placeholder="Write a review" value={text}/>
                    <Button type="submit" isDisabled={btnDisabled}>Send</Button>
                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm
