// WordWatchlist.js
import React from 'react';

class WordWatchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWord: '',
      watchlist: [],
    };
  }

  handleChange = (event) => {
    this.setState({ currentWord: event.target.value });
  };

  handleAddToWatchlist = () => {
    if (this.state.currentWord.trim() === '') {
      return; // Prevent adding empty words to the watchlist
    }

    this.setState((prevState) => ({
      currentWord: '',
      watchlist: [...prevState.watchlist, prevState.currentWord.trim()],
    }));
  };

  render() {
    const { currentWord, watchlist } = this.state;

    return (
      <div>
        <div>
          <textarea
            value={currentWord}
            onChange={this.handleChange}
            placeholder="Enter a word..."
          />
          <button onClick={this.handleAddToWatchlist}>Add to Watchlist</button>
        </div>
        <div>
          <h2>Watchlist</h2>
          <ul>
            {watchlist.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default WordWatchlist;
