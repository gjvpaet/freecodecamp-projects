import { Alert, Tabs } from "antd";
import SEO from "components/SEO";
import styled from "styled-components";
import {
  faBalanceScale,
  faCircle,
  faFlask,
  faRuler,
  faThermometerHalf,
} from "@fortawesome/free-solid-svg-icons";
import TabHeader from "components/TabHeader";

import Area from "./Area";
import Length from "./Length";
import Mass from "./Mass";
import Temperature from "./Temperature";
import Volume from "./Volume";

const { TabPane } = Tabs;

export default () => {
  return (
    <>
      <SEO title="Metric Imperial Converter" />
      <h2 style={{ textAlign: "center", paddingTop: 10 }}>
        Metric Imperial Converter
      </h2>
      <Root>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <TabHeader title="Length" icon={faRuler} />
              </span>
            }
            key="1"
          >
            <Length />
          </TabPane>
          <TabPane
            tab={
              <span>
                <TabHeader title="Area" icon={faCircle} />
              </span>
            }
            key="2"
          >
            <Area />
          </TabPane>
          <TabPane
            tab={
              <span>
                <TabHeader title="Volume" icon={faFlask} />
              </span>
            }
            key="3"
          >
            <Volume />
          </TabPane>

          <TabPane
            tab={
              <span>
                <TabHeader title="Mass" icon={faBalanceScale} />
              </span>
            }
            key="4"
          >
            <Mass />
          </TabPane>

          <TabPane
            tab={
              <span>
                <TabHeader title="Temperature" icon={faThermometerHalf} />
              </span>
            }
            key="5"
          >
            <Temperature />
          </TabPane>
        </Tabs>
      </Root>
    </>
  );
};

const Root = styled.div`
  background-color: white;
  margin: 20px;
  padding: 10px;
  width: 70vw;
  margin: auto;
`;
