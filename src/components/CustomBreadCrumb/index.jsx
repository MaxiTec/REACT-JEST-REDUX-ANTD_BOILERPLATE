import React from 'react';
import {Link} from 'react-router-dom'
import { Breadcrumb,Icon } from 'antd';
const CustomBreadCrumb = (props) => {
  const pathSnippets = props.location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <React.Fragment key={index}>
            {index==-1 ?
              <Breadcrumb.Item key={url}>
                <Link to={url}>{_}</Link>
              </Breadcrumb.Item>
            :
            <span key={url}>{_}</span>  
          }
        </React.Fragment>
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Icon type="home" style={{marginRight:'5px'}} />
        <Link to="/">Home</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
  return ( 
    <div style={{marginTop:'3px'}}>
      {breadcrumbItems}
    </div>
  );
}
 
export default CustomBreadCrumb;