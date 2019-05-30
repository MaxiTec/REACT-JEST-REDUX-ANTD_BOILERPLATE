import React from 'react';
import {Link} from 'react-router-dom'
import { Breadcrumb,Icon } from 'antd';
import {MenuRoutes} from '../InnerLayout/menu'
let breadcrumbNameMap={}
MenuRoutes.forEach(element => {
  element.children.forEach(test=>{
    if(test.path!=undefined){
      breadcrumbNameMap[test.path]=test.name;
    }
  })
});
let CustomBreadCrumb = (props) => {
  // Removemos el item de editar solo para el Breadcrumb
  const pathSnippets = props.location.pathname.replace("editar", "").split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      if(pathSnippets.length==1 && url=='/dashboard'){
        return null
      }else{
        return (
            <Breadcrumb.Item key={url}>
              {pathSnippets.length -1 == index ? <span>{(breadcrumbNameMap[url]!=undefined)?breadcrumbNameMap[url]:props.title}</span> : <Link to={url}>{breadcrumbNameMap[url]}</Link>}
            </Breadcrumb.Item>
        );
      }
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
      <Icon type="home" style={{marginRight:'5px'}} />
      {(pathSnippets.length==1 && pathSnippets[0]=='dashboard')?
      <span>Home</span>
      :
      <Link to="/">Home</Link>
    }
    </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems)
  return ( 
    <Breadcrumb separator=">">
      {breadcrumbItems}
    </Breadcrumb>
  );
}
 
export default CustomBreadCrumb