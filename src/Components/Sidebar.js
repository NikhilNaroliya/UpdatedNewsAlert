import React from 'react';

class Sidebar extends React.Component {
  render() {
    const { newsItems, watchlist } = this.props;

    return (
      <aside>
        <div>
          <h2>News Items</h2>
          <ul>
            {newsItems && newsItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Watchlist</h2>
          <ul>
            {watchlist && watchlist.map((stock, index) => (
              <li key={index}>{stock}</li>
            ))}
          </ul>
        </div>
      </aside>
    );
  }
}

export default Sidebar;