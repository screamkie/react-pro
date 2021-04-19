import React from 'react'
import { Menu } from 'antd';
import menus from './../../router/menus'
import { useHistory } from 'react-router-dom'
const { SubMenu } = Menu;

// 获取菜单的一级key
const keyarr = []
menus.forEach(item => {
  keyarr.push(item.path) // key值使用的是item.path
})
// submenu keys of first level
// const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
// 二级菜单的一级key
const rootSubmenuKeys = keyarr
// 函数内部---递归
const SiderMenu = (props) => {
  console.log(props)
  const history = useHistory()
  const [openKeys, setOpenKeys] = React.useState([]);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const renderMenu = (menus) => {
    // 该函数含有jsx的返回值
    return menus.map(item => {
      if (item.children) {
        // 有子菜单的情况
        return(
          <SubMenu key={ item.path } icon={ item.icon } title={ item.title }>
            {/* 使用递归函数 */}
            { renderMenu(item.children)}
          </SubMenu>
        )
      } else {
        // 只有一级菜单
        // 把item.path作为key值有好处，点击左侧菜单时获取到的属性，最容易的是key值
        return  <Menu.Item key={ item.path } icon={ item.icon } >{ item.title }</Menu.Item>
      }
    })
  }
  // 链接切换
  const changeUrl = (obj) => {
    const path = obj.key
    history.push(path)
  }
  return (
    <Menu theme="dark" onClick= { changeUrl } mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
      { renderMenu(menus)}
      {/* <Menu.Item key="1" icon={<MailOutlined />} >Option 1</Menu.Item> */}
      {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
      </SubMenu> */}
    </Menu>
  );
};

export default SiderMenu