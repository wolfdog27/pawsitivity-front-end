import React from "react";
import { Layout} from 'antd';
import './Swipe.css'
import InitForm from "../components/InitForm";
import UpDateForm from "../components/UpdateForm";

const { Content } = Layout;


export default function Login() {
  return (
    <Layout>
      <Content>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <UpDateForm/>
        </div>
      </Content>
  </Layout>
  )
}