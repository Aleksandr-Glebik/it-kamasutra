import React from 'react'
import { Layout, Menu, Avatar, Row, Col, Button } from 'antd'
import { menuItems1 } from '../../App.tsx'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth, selectCurrentUserLogin } from '../../redux/auth-selectors.ts'
import {logout} from '../../redux/auth-reducer.ts'
import { Link } from 'react-router-dom'

export type PropsType = {}

const Header: React.FC<PropsType> = (props) => {
    const { Header } = Layout
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()
    const logoutCallBack = () => {
      dispatch(logout())
    }

    return (
      <Header className="header">
      <Row>
        <Col span={18}>
          <Menu theme="dark"
                mode="horizontal"
                items={menuItems1}
          />
        </Col>
          {isAuth
            ? <>
              <Col span={2}>
                <Avatar title={login} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Col>
              <Col span={4}>
                <Button onClick={logoutCallBack}>Logout</Button>
              </Col>
              </>
            : <Col span={6}>
                <Button>
                  <Link to={'/login'}>Login</Link>
                </Button>
              </Col>
          }
      </Row>
    </Header>
    )
}

export default Header