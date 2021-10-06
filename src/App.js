import Header from './Header/Header';
import Search from './Search/Search';
import Favorites from './Favorites/Favorites';
import Footer from './Footer/Footer';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <div className="main">
        <Search />
        <Favorites />
      </div>
      <Footer />
    </div>
  );
}

export default App;
