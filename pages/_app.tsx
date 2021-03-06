import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "antd";
import { Provider } from "react-redux";
import Link from "next/link";
import styled from "styled-components";
import "styles/global.css";
import NProgress from "nprogress";
import { motion } from "framer-motion";
import SD from "constants/styleDefaults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import MobileHeader from "components/MobileHeader";
import store from "store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const item = {
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    rotate: 360,
    transition: {
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0, x: 1000 },
};

const { Content } = Layout;
const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const nprogressStart = () => NProgress.start();
    const nprogressDone = () => {
      NProgress.done();
    };
    router.events.on("routeChangeStart", nprogressStart);
    router.events.on("routeChangeComplete", nprogressDone);
    router.events.on("routeChangeError", nprogressDone);

    return () => {
      router.events.off("routeChangeStart", nprogressStart);
      router.events.off("routeChangeComplete", nprogressDone);
      router.events.off("routeChangeError", nprogressDone);
    };
  }, []);

  return (
    <Provider store={store}>
      <Layout
        className="layout"
        style={{
          position: "relative",
        }}
      >
        <Buns>
          <Patty whileTap={{ rotate: 180 }} onClick={() => setIsOpen(true)}>
            <StyledMobileIcon icon={faBars} />
          </Patty>
        </Buns>
        <HeaderContent>
          <Header className="header">
            <Link href="/">
              <Logo>FCC</Logo>
            </Link>
            <motion.div
              className="header-right"
              initial="hidden"
              animate="visible"
              variants={list}
            >
              <Link href="/">
                <motion.a variants={item} custom={1}>
                  /home
                </motion.a>
              </Link>
              <Link href="/projects">
                <motion.a variants={item} custom={2}>
                  /projects
                </motion.a>
              </Link>
              <Link href="/certificates">
                <motion.a variants={item} custom={3}>
                  /certificates
                </motion.a>
              </Link>
            </motion.div>
          </Header>
        </HeaderContent>
        <StyledContent>
          <Component {...pageProps} />
        </StyledContent>

        <MobileHeader
          {...{
            setIsOpen,
            isOpen,
          }}
        />
      </Layout>
    </Provider>
  );
};

const StyledContent = styled(Content)`
  height: calc(100vh - 49px);
  margin-top: ${SD.sizes.header}px;
  overflow-y: auto;
`;

const Header = styled.div`
  overflow: hidden;
  background-color: ${SD.colors.header};
  padding: 0 50px 0px 50px;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  z-index: 99;
`;

const Logo = styled.a`
  color: white;
  font-size: 25px;
  font-weight: bold;
`;

const Buns = styled.div`
  position: fixed;
  top: 0;
  font-size: 20px;
  background-color: #041529;
  width: 100%;
  left: 0;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  z-index: 999;

  @media screen and (min-width: 520px) {
    display: none;
  }
`;

const Patty = styled(motion.div)`
  cursor: pointer;
`;

const StyledMobileIcon = styled(FontAwesomeIcon)`
  color: white;
`;

const HeaderContent = styled.div`
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

  .header a:hover {
    color: #041529;
    background-color: white;
    border-radius: 0px;
  }

  .header-right {
    float: right;
  }

  @media screen and (max-width: 520px) {
    .header {
      display: none;
    }
  }
`;

export default App;
