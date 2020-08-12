import { Layout, Menu, Dropdown } from "antd";
import Link from "next/link";
import styled from "styled-components";
import "styles/global.css";

const { SubMenu } = Menu;
const { Header, Footer, Content } = Layout;
const App = ({ Component, pageProps }) => {
  const menu = (
    <Menu style={{ marginTop: 10 }}>
      <SubMenu title="Front End Libraries">
        <Menu.Item>
          <Link href="/projects/front-end-libraries/random-quote-machine">
            <a>Random Quote Machine</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/projects/front-end-libraries/markdown-previewer">
            <a>Markdown Previewer</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/projects/front-end-libraries/drum-machine">
            <a>Drum Machine</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/projects/front-end-libraries/javascript-calculator">
            <a>Javascript Calculator</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/projects/front-end-libraries/pomodoro-clock">
            <a>Pomodoro Clock</a>
          </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );

  return (
    <Layout className="layout">
      <Header style={{ padding: 0, paddingTop: 10 }}>
        <HeaderContent>
          <div className="header">
            <Link href="/">
              <a className="logo">FCC</a>
            </Link>
            <div className="header-right">
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href="/projects">
                <a>Projects</a>
              </Link>
            </div>
          </div>
        </HeaderContent>
      </Header>
      <Content style={{ height: "calc(100vh - 64px - 70px)" }}>
        <Component {...pageProps} />
      </Content>

      {pageProps?.path === "/" ? (
        <></>
      ) : (
        <Footer
          style={{
            textAlign: "center",

            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
          Free Code Camp Projects © 2020 Created by{" "}
          <a href="http://github.com/devlargs" target="_blank">
            Ralph Largo
          </a>
        </Footer>
      )}
    </Layout>
  );
};

const HeaderContent = styled.div`
  .header {
    overflow: hidden;
    background-color: #041529;
    padding: 0 50px 0px 50px;
  }

  .header a {
    float: left;
    color: white;
    text-align: center;
    padding: 12px;
    text-decoration: none;
    font-size: 18px;
    line-height: 25px;
    border-radius: 4px;
  }

  .header a.logo {
    color: white;
    font-size: 25px;
    font-weight: bold;
  }

  .header a:hover {
    color: white;
  }

  .header a.active {
    background-color: #20a76e;
    color: white;
  }

  .header-right {
    float: right;
  }

  @media screen and (max-width: 500px) {
    .header a {
      float: none;
      display: block;
      text-align: left;
    }

    .header-right {
      float: none;
    }
  }
`;

export default App;
