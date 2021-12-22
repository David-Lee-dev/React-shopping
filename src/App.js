import './App.css';
import Header from './components/Header';
import Prototypes from './components/Prototypes';
import Orders from './components/Orders';
import Footer from './components/Footer';
import AppStateProvider from './providers/AppStateProviders';

function App() {
  return (
    <AppStateProvider>
      <Header />
      <div className="container">
          <Prototypes />
          <Orders />
          <Footer />
      </div>
    </AppStateProvider>
  );
}

export default App;
