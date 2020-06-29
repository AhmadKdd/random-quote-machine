import React from 'react'
import './style/QuoteBox.scss'
export default function QuoteBox(props) {
    const currentQuote = props.currentQuote;
    return (
        <div className="quote-box">
            <p id="text" className="quote-box__text" >
                <strong>
                    {currentQuote.quote}
                </strong>
            </p>
            <p id="author" className="quote-box__author">
                -{currentQuote.author}
            </p>
            <div className="quote-box__social">

                <span className={"quote-box__social__like" + (currentQuote.liked ? " quote-box__social__like--liked" : "")} onClick={() => props.like(currentQuote)}>
                    <i className="fas fa-heart"></i>
                </span>

                <a id="tweet-quote" contenttext="Tweet Quote" className="quote-box__social__twitter"
                    href={`https://twitter.com/intent/tweet?text=${currentQuote.quote} -${currentQuote.author}`}
                >

                    <i className="fab fa-twitter">
                    </i>
                </a>




            </div>

        </div>
    )
}
