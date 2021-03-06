import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import getRandomColor from "utils/getRandomColor";
import { TwitterOutlined, LoadingOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTumblr } from "@fortawesome/free-brands-svg-icons";
import {
  faQuoteLeft,
  faRedoAlt,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import staticQuote from "constants/quotes";
import meta from "constants/meta";
import SEO from "components/SEO";
import links from "constants/links";
import CenteredContent from "components/CenteredContent";
import speak from "utils/speak";

const Root = styled.div`
  #quote-box {
    background-color: white;
    width: 40vw;
    padding: 50px;
    border-radius: 15px;
    box-shadow: 5px 6px lightgray;
    #text {
      h1,
      h2 {
        color: ${(props: { bg: string }) => props.bg};
        font-size: 2em;
        text-align: center;
      }
      h1 {
        font-family: "Roboto Mono", Arial;
      }
      h2 {
        font-family: "Dancing Script", Arial;
      }
      margin-bottom: 10px;
    }
    .actions {
      text-align: center;
    }
    .random-button {
      border-radius: 5px;
      padding: 10px;
      background-color: ${(props: { bg: string }) => props.bg};
      color: white;
      height: 40px;
      margin-right: 5px;
      mid-width: 40px;
    }
    .social {
      width: 40px;
      text-align: center;
    }
  }

  @media screen and (max-width: 400px) {
    #quote-box {
      width: 95vw;
      padding: 1em;
      #text {
        h1,
        h2 {
          font-size: 20px;
        }
      }
    }
  }

  @media screen and (min-width: 401px) and (max-width: 768px) {
    #quote-box {
      width: 60vw;
      padding: 1em;
      #text {
        h1,
        h2 {
          font-size: 24px;
        }
      }
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1400px) {
    #quote-box {
      width: 50vw;
      padding: 1em;
      #text {
        h1,
        h2 {
          font-size: 2em;
        }
      }
    }
  }
`;

export default ({ data }) => {
  const [random, setRandom] = useState(data?.author ? data : staticQuote());
  const [loading, setLoading] = useState(false);
  const [randomColor, setRandomColor] = useState(getRandomColor());
  const [rotation, setRotation] = useState(360);

  const generateNewQuote = async () => {
    setLoading(true);
    try {
      const { data } = (await axios.get(`/api/quotes/random`)) as any;
      setRandom(Math.random() > 0.1 ? data.edges : staticQuote());
      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
    setRandomColor(getRandomColor());
    setRotation((val) => val + 360);
  };

  return (
    <CenteredContent bgColor={randomColor}>
      <Root bg={randomColor}>
        <SEO title="Random Quote Machine" withFCCScript />
        <motion.div id="quote-box">
          <div id="text">
            <motion.h1
              animate={{ rotate: rotation }}
              transition={{ ease: "easeOut", duration: 0.8 }}
            >
              {loading ? (
                <LoadingOutlined />
              ) : (
                <>
                  <FontAwesomeIcon icon={faQuoteLeft} />
                  &nbsp;
                  {random.quote}
                </>
              )}
            </motion.h1>
            <h2 id="author">{loading ? <></> : `- ${random.author} -`}</h2>
            <br />
            <div className="actions">
              <motion.a
                whileHover={{ scale: 1.1 }}
                className="random-button social"
                id="tweet-quote"
                href={links.SHARE_TWEET_URL(random)}
                target="_blank"
              >
                <TwitterOutlined />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                className="random-button social"
                target="_blank"
                href={links.SHARE_TUBLER_URL(random)}
              >
                <FontAwesomeIcon icon={faTumblr} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                className="random-button social"
                target="_blank"
                onClick={() => speak(`${random.quote} by ${random.author}`)}
              >
                <FontAwesomeIcon icon={faPlay} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                onClick={generateNewQuote}
                className="random-button"
                id="new-quote"
              >
                <span>
                  {loading ? (
                    <LoadingOutlined />
                  ) : (
                    <FontAwesomeIcon icon={faRedoAlt} />
                  )}
                </span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </Root>
    </CenteredContent>
  );
};
