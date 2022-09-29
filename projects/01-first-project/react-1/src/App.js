import React, { Suspense } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Nav from './components/Nav/Nav';
// import News from './components/News/News';
// import Music from './components/Music/Music';
// import Setting from './components/Setting/Setting';
// import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/Common/Preloader/Preloader';

const ProfileContainer = React.lazy( () => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy( () => import('./components/Dialogs/DialogsContainer'))
const News = React.lazy( () => import('./components/News/News'))
const Music = React.lazy( () => import('./components/Music/Music'))
const Setting = React.lazy( () => import('./components/Setting/Setting'))
class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className='app-wrapper'>
          <HeaderContainer />
          <Nav />
          <div className='app-wrapper-content'>
            <Routes>
              <Route path='/dialogs/*' element={
                <React.Suspense fallback={<Preloader />}>
                  <DialogsContainer />
                </React.Suspense>
              } />
              <Route path='/profile/:userId' element={
                <React.Suspense fallback={<Preloader />}>
                  <ProfileContainer />
                </React.Suspense>
              } />
              <Route path='/profile/*' element={
                <React.Suspense fallback={<Preloader />}>
                  <ProfileContainer />
                </React.Suspense>
              } />
              <Route path='/users/*' element={<UsersContainer />} />
              <Route path='/news/*' element={
                <React.Suspense fallback={<Preloader />}>
                  <News />
                </React.Suspense>
              } />
              <Route path='/music/*' element={
                <React.Suspense fallback={<Preloader />}>
                  <Music />
                </React.Suspense>
              } />
              <Route path='/setting/*' element={
                <React.Suspense fallback={<Preloader />}>
                  <Setting />
                </React.Suspense>
              } />
              <Route path='/login/*' element={<LoginPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App)


//result samurai-1.0 path


