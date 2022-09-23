import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HeaderContainer from './components/Header/HeaderContainer.tsx'
import Nav from './components/Nav/Nav.tsx'
import UsersPage from './components/Users/UsersContainer.tsx'
import LoginPage from './components/Login/Login.tsx'
import { connect } from 'react-redux'
import {initializeApp} from './redux/app-reducer.ts'
import Preloader from './components/Common/Preloader/Preloader.tsx'
import {AppStateType} from './redux/redux-store.tsx'

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu } from 'antd'
const { Header, Content, Footer, Sider } = Layout

const ProfileContainer = React.lazy( () => import('./components/Profile/ProfileContainer.tsx'))
const DialogsContainer = React.lazy( () => import('./components/Dialogs/DialogsContainer.tsx'))
const News = React.lazy( () => import('./components/News/News.tsx'))
const Music = React.lazy( () => import('./components/Music/Music.tsx'))
const Setting = React.lazy( () => import('./components/Setting/Setting.tsx'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const menuItems = [
  {
    key: 'My Profile',
    icon: <UserOutlined />,
    label: <Link to="/profile/24457">My Profile</Link>,
  },
  {
    key: 'Messages',
    icon: <NotificationOutlined />,
    label: <Link to="/dialogs">Messages</Link>,
  },
  {
    key: 'Developers',
    icon: <LaptopOutlined />,
    label: <Link to="/developers">Developers</Link>,
  },
]

const menuItems1: MenuProps['items'] = menuItems.map(item => ({
  key: item.key,
  label: item.label,
}));

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
        <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={['2']}
            items={menuItems1}
      />
    </Header>
    <Content style={{ padding: '0 50px' }}>
      {/* <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            // defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
            items={menuItems}
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
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
              <Route path='/developers/*' element={<UsersPage pageTitle={'Samurai'} />} />
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
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
        {/* <div className='app-wrapper'>
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
              <Route path='/users/*' element={<UsersPage pageTitle={'Samurai'} />} />
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
        </div> */}

              </BrowserRouter>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App)


