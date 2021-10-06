import { Provider } from 'react-redux';
import Header from './Header/Header';
import Search from './Search/Search';
import Favorites from './Favorites/Favorites';
import Footer from './Footer/Footer';
import store from './app/store';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <div className="main">
          <Search />
          <Favorites />
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
