import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import './App.scss';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import ProductDetail from './components/pages/ProductDetail';
import Services from './components/pages/Services';
import Destinations from './components/pages/Destinations';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';

// 🔵 NEW IMPORTS
import SignupBackend from "./components/pages/SignupBackend";
import LoginBackend from "./components/pages/LoginBackend";
import UserProfile from "./components/pages/UserProfile";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      {/* 🔵 Wrap router inside AuthProvider */}
      <AuthProvider>
        <Router>
          <Navbar/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/services" exact component={Services}/>
            <Route path="/services" exact component={Services}/>
            <Route path="/products" exact component={Products}/>
            <Route path="/destinations" exact component={Destinations}/>
            <Route path="/sign-up" exact component={SignUp}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/products/:id" component={ProductDetail}/>

            {/* 🔵 NEW ROUTES */}
            <Route path="/signup-backend" exact component={SignupBackend}/>
            <Route path="/login-backend" exact component={LoginBackend}/>
            <Route path="/profile" exact component={UserProfile}/>
          </Switch>
          <Footer/>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
