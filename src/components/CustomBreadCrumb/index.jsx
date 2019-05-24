import React from 'react';
import {Link} from 'react-router-dom'
import { Breadcrumb,Icon } from 'antd';
const breadcrumbNameMap = {
  '/apps': 'Application List',
  '/apps/1': 'Application1',
  '/apps/2': 'Application2',
  '/apps/1/detail': 'Detail',
  '/apps/2/detail': 'Detail',
};
const CustomBreadCrumb = (props) => {
  const pathSnippets = props.location.pathname.split('/').filter(i => i);
  console.log()
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      if(pathSnippets.length==1 && url=='/dashboard'){
        return null
      }else{
        return (
            <Breadcrumb.Item key={url}>
              {pathSnippets.length -1 == index ? <span>{_}</span> : <Link to={url}>{_}</Link>}
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
 
export default CustomBreadCrumb;