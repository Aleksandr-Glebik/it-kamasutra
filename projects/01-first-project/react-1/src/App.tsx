import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer.tsx';
import Nav from './components/Nav/Nav.tsx';
import UsersContainer from './components/Users/UsersContainer.tsx';
import LoginPage from './components/Login/Login.tsx';
import { connect } from 'react-redux';
import {initializeApp} from './redux/app-reducer.ts'
import Preloader from './components/Common/Preloader/Preloader'
import {AppStateType} from './redux/redux-store.tsx'

const ProfileContainer = React.lazy( () => import('./components/Profile/ProfileContainer.tsx'))
const DialogsContainer = React.lazy( () => import('./components/Dialogs/DialogsContainer.tsx'))
const News = React.lazy( () => import('./components/News/News.tsx'))
const Music = React.lazy( () => import('./components/Music/Music.tsx'))
const Setting = React.lazy( () => import('./components/Setting/Setting.tsx'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
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
              <Route path='/users/*' element={<UsersContainer pageTitle={'Samurai'} />} />
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

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App)


