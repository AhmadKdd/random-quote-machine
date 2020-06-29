import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import QuoteBox from './QuoteBox'
import { getRandomInt } from "./functions"
import { quotes } from './consts';
import './style/App.scss';



export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      resultQuote: [],
      searchFiled: '',

    };


  }
  componentDidMount() {

    this.handelNextQuote();
    //this.setState({ resultQuote: this.getRandomQuote() })

  }

  handelNextQuote() {
    const newQuote = this.getRandomQuote()
    const matchedQuote = this.state.quotes.find(quote => quote.id === newQuote.id);
    this.setState({ resultQuote: [(matchedQuote !== undefined ? matchedQuote : newQuote)] })
      ;

  }
  getRandomQuote() {

    const quoteNumber = quotes.length;

    const quote = quotes[getRandomInt(quoteNumber)];


    return quote;
  }

  handleLike(quote) {
    quote.liked = !quote.liked;
    quote.liked ? this.setState((state) => ({ quotes: [...state.quotes, quote] })) : this.handelRemoveUnlikedQuote();


  }
  handelRemoveUnlikedQuote() {
    this.setState(state => ({ quotes: state.quotes.filter(quote => quote.liked) }));
  }

  handelFindQuote(key, value = '', e) {

    try {
      let result;



      switch (key) {
        case 'like':

          result = this.state.quotes.filter(quote => quote.liked);

          break;
        case 'quote':
          const regEx = new RegExp(`(\\W)(${value})(\\W)`, `i`);
          e.preventDefault();
          result = quotes.filter(q => regEx.test(`${q.quote} ${q.author}`.toLowerCase()));


          break;
        default:
          result = this.state.resultQuote;

          break;

      }

      this.setState({ resultQuote: result });
    } catch (error) {
      console.log(error);
    }

  }

  handelSearchFiledChange(e) {


    this.setState({ searchFiled: e.target.value });

  }
  render() {
    return (
      <main className="main">
        <p className="title">Random Quote Machine</p>
        <div className="action">

          <button className="action__liked-quote-btn btn" onClick={() => this.handelFindQuote('like')}>
            My Liked Quotes
                </button>

          <button id="new-quote" className="action__new-quote-btn btn " onClick={() => this.handelNextQuote()}>
            New Quote
                </button>

          <form className="action__form">
            <input className="action__search-field" type="text" value={this.state.searchFiled} placeholder="Search Quotes.." onChange={(e) => this.handelSearchFiledChange(e)} />

            <button className="action__search-btn" onClick={(e) => this.handelFindQuote('quote', this.state.searchFiled, e)}>
              <i className="fas fa-search"></i>
            </button>


          </form>

        </div>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

          {this.state.resultQuote.map(quote => {
            return <QuoteBox key={quote.id} currentQuote={quote} like={this.handleLike.bind(this)} />
          })}
        </ReactCSSTransitionGroup>
      </main>
    )
  }
}



export default App;
