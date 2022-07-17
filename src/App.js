import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Router } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import AdminBuilding from './components/Admin/AdminBuilDing';
import CreatBuilding from './components/Building/CreatBuilding';
import AdminUser from './components/Admin/AdminUser';
import AdminPost from './components/Admin/AdminPost';
import { history } from './redux/util/setting';
import { AdminTemplate } from './templates/AdminTemplate';
import Profile from './components/Home/Profile';
import Cart from './components/Cart/Cart';
import { UserTemplate } from './templates/UserTemplate';
import Apartment from './components/Apartment/Apartment';
import CreateAccountAdmin from './components/Login/CreateAccountAdmin';
import CreateApartment from './components/Apartment/CreateApartment';
import Wallet from './components/Wallet/Wallet';
import WalletSystem from './components/Wallet/WalletSystem';
import WalletChaitity from './components/Wallet/WalletChaitity';
import CreateWallet from './components/Wallet/CreateWallet';
import EditWallet from './components/Wallet/EditWallet';
import LoadImage from './components/Admin/LoadImage';
import Detail from './components/Home/Detail';





function App () {
  return (
    <BrowserRouter  >
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/createaccountadmin" component={CreateAccountAdmin} />
        <UserTemplate exact path="/home" Component={Home} />
        <AdminTemplate exact path="/adminbuilding" Component={AdminBuilding} />
        <AdminTemplate exact path="/adminuser" Component={AdminUser} />
        <AdminTemplate exact path="/creatbuilding" Component={CreatBuilding} />
        <AdminTemplate exact path="/apartment" Component={Apartment} />
        <AdminTemplate exact path="/wallet" Component={Wallet} />
        <AdminTemplate exact path="/editwallet" Component={EditWallet} />
        <AdminTemplate exact path="/walletsystem" Component={WalletSystem} />
        <AdminTemplate exact path="/walletcharitity" Component={WalletChaitity} />
        <AdminTemplate exact path="/createwallet" Component={CreateWallet} />
        <AdminTemplate exact path="/createaparment" Component={CreateApartment} />
        <AdminTemplate exact path="/adminpost" Component={AdminPost} />
        <UserTemplate exact path="/profile" Component={Profile} />
        <UserTemplate exact path="/cart" Component={Cart} />
        <Route exact path="/detail" Component={Detail} />
        <AdminTemplate exact path="/thinh" Component={LoadImage} />
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
