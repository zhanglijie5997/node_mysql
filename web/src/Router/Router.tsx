import React, { useEffect, useState, useCallback } from "react";
import { RouteComponentProps, } from 'react-router';
import { routerConfig, bottomRouterConfig } from '../Page/Page';
import { Route, Switch, Redirect, NavLink, Link } from "react-router-dom";
import { RouteConfigType } from '../Page/PageType';
import { useSelector } from "react-redux";
import styles from "./Router.scss";
import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
const RouterPage: (props: RouteComponentProps) => JSX.Element = (props: RouteComponentProps) => {
    const [getRouterConfigPage, setRouterConfigPage] = useState<RouteConfigType[]>(bottomRouterConfig.concat(routerConfig)); // 路由配置
    const [getShowAppBar, setShowAppBar] = useState<string[]>(["/user", "/index", "/", "/shop", "/reservation"]);
    const [getSelectPage, setSelectPage] = useState<number>(-1); // 当前选择页面
    const [getPage, setPage] = useState<string>("/index");
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const userStatus = useSelector((state: { userStatusReducer: boolean }) => state.userStatusReducer); // 用户登陆状态, 此处为获取redux state参数,可以用对象获取自己需要的参数

    useEffect(() => {
        let pageSelect: number = 0;
        try {
            pageSelect = nowPage.get(props.location.pathname)!();
        } catch (error) {
            pageSelect = 0;
        }
        setSelectPage(pageSelect);
        const page = props.location.pathname;
        setPage(page);
    }, [userStatus, props.location]);

    // 当前所处页面Map对象
    const nowPage: Map<string, () => number> = new Map([
        ["/", () => 0],
        ["/index", () => 0],
        ["/shop", () => 1],
        ["/reservation", () => 2],
        ["/user", () => 3],
        ["null", () => 0]
    ]);

    const navgiation = useCallback((index: number, to: string) => {
        setSelectPage(index);
        if (getPage === to) {
            return
        } else {
            setPage(to);
            props.history.push(to)
        }
    }, [getPage])

    // 导航, 重定向路由不显示在页面
    const routerNav: JSX.Element[] = bottomRouterConfig.map((item: RouteConfigType, index: number) => {
        return <div key={index} className={styles.navItem} onClick={() => navgiation(index, item.path)}>
            <div className={styles.navitemBox}>
                <img src={getSelectPage === index ? item.selectImg : item.defaultImg} alt="" />
                <p className={[getSelectPage === index ? styles.selectColor : ''].join(" ")}>{item.meta.title}</p>
            </div>
        </div>
    })
    // 路由页面
    const routerPage: JSX.Element[] = getRouterConfigPage.map((item: RouteConfigType, index: number) => {
        return <Route path={item.path} exact={item.excat} key={index} render={(itemProps: RouteComponentProps) => {
            if (!item.meta.requiresAuth || item.path === "/login") {
                document.title = item.meta.title;
                return <item.component {...itemProps} />
            }
            // 用户没有登录的情况
            // Toast.fail("请先登录", 3, () => {

            // })
            return <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
        }} />
    });


    return (
        <div className={styles.router}>
            
            {/* 导航页 */}
            {/* { getShowAppBar.includes(props.location.pathname) ? <div className={styles.appBar}>
                <div className={styles.navBox}>{routerNav}</div>
            </div> : null } */}
            <div className={styles.menuContainer}>
                <button onClick={() => setCollapsed(!collapsed)}>关闭</button>
                <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                className={[styles.menu, collapsed ? '' : styles.addMenuWidth].join(' ')}
            >
                <Menu.Item key="1">
                    <PieChartOutlined />
                    <span>Option 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <DesktopOutlined />
                    <span>Option 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <ContainerOutlined />
                    <span>Option 3</span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <MailOutlined />
                            <span>Navigation One</span>
                        </span>
                    }
                >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <AppstoreOutlined />
                            <span>Navigation Two</span>
                        </span>
                    }
                >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </SubMenu>
            </Menu>
            </div>
            {/* 路由页面 */}
            <div className={styles.pageView}>
                <Switch>
                    {routerPage}
                </Switch>
            </div>
        </div>
    )
}
export default RouterPage;