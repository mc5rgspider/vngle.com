import React, { useState, useEffect } from "react"
import {
  Jumbotron,
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Image,
  Spinner,
} from "react-bootstrap"
import styled from "styled-components"
import Nanogram from "nanogram.js"
import MailchimpSubscribe from "react-mailchimp-subscribe"

import Layout from "../components/layout"
import NewsSubForm from "../components/newsSubForm"
import SEO from "../components/seo"
import HeroImg from "../static/images/hero.svg"
import MozillaLogo from "../../static/images/mozilla.png"
import ColumbiaLogo from "../../static/images/columbia-tamer.png"
import GoodieNationLogo from "../../static/images/goodie-nation.png"
import Facebook from "../../static/images/icons/facebook.svg"
import Instagram from "../../static/images/icons/instagram.svg"
import Linkedin from "../../static/images/icons/linkedin.svg"
import Twitter from "../../static/images/icons/twitter.svg"

const IndexPage = () => {
  const [instaFeed, setInstaFeed] = useState(null)

  useEffect(() => {
    const fetchInstaFeed = async () => {
      const instaParser = new Nanogram()
      const response = await instaParser.getMediaByUsername("vnglestories")

      setInstaFeed(response)
    }

    fetchInstaFeed()
  }, [])

  if (instaFeed === null) {
    return (
      <LoadingWrapper className="d-flex flex-column justify-content-center">
        <SEO title="Various angles on local news driven by you" />
        <Spinner animation="grow" variant="primary" className="m-auto">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </LoadingWrapper>
    )
  } else {
    return (
      <Layout>
        <SEO title="Various angles on local news driven by you" />

        <Jumbotron className="bg-primary rounded-0" as="section">
          <HeroContainer>
            <h1 className="text-center display-2">
              {/* typed.js here? */}
              Various Angles On Grassroots Local News <u>Driven by You</u>
            </h1>
            <Row>
              <Col
                className="d-flex flex-column justify-content-center text-center"
                lg
                md
                sm
              >
                {/* use Gatsby Image */}
                <Image
                  alt="Man reading newspaper"
                  src={HeroImg}
                  className="hero-img"
                />
              </Col>
              <Col lg={6} md={12} sm={12} xs={12}>
                <Card className="shadow border-0" id="sub-card">
                  <Card.Body>
                    <Card.Title as="h2" className="mb-3">
                      Sign up for community updates!
                    </Card.Title>
                    <Card.Subtitle className="mb-4 font-weight-normal">
                      Get the latest local <b>COVID-19 updates</b> near you.
                    </Card.Subtitle>
                    <MailchimpSubscribe
                      url={process.env.GATSBY_MAILCHIMP_URL}
                      render={({ subscribe, status, message }) => (
                        <NewsSubForm
                          status={status}
                          message={message}
                          onSubmitted={formData => subscribe(formData)}
                        />
                      )}
                    />
                    <Row className="justify-content-around mt-4">
                      <a href="https://www.instagram.com/vnglestories/">
                        <img src={Instagram} alt="Instagram" />
                      </a>
                      <a href="https://www.facebook.com/vnglestories/">
                        <img src={Facebook} alt="Facebook" />
                      </a>
                      <a href="https://www.linkedin.com/company/vngle/">
                        <img src={Linkedin} alt="Linkedin" />
                      </a>
                      <a href="https://twitter.com/vnglestories">
                        <img src={Twitter} alt="Twitter" />
                      </a>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </HeroContainer>
        </Jumbotron>

        <Jumbotron className="bg-primary border-radius-0" as="section">
          <Container>
            <Row>
              <Col>
                <h1>Think something needs coverage?</h1>
                <p>
                  Request special coverage on your city or send us content
                  (documents, photos, videos, etc.) via our email.
                </p>
              </Col>
              <Col
                className="text-center d-flex flex-column justify-content-center"
                lg
                md={12}
              >
                <Form>
                  <Form.Group>
                    <Button
                      variant="light"
                      size="lg"
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdn0-K37ukwXDy-A5KjNrvuGKAsGgbO-Aqk6i0uVllwf5SNNg/viewform"
                    >
                      Request Coverage
                    </Button>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="font-weight-bold">OR</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="font-weight-bold">
                      Text "COVERAGE" to <b>(678) 995-5121</b>
                    </Form.Label>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Jumbotron>

        <Container as="section">
          <Row className="align-items-center mb-4">
            <Col lg="auto" md="auto" sm="auto" xs="auto">
              <img
                alt="Instagram post"
                src={instaFeed.profile.profile_pic_url}
                width="70px"
              />
            </Col>
            <Col>
              <h2>@vnglestories</h2>
            </Col>
          </Row>
          <Row>
            {instaFeed.profile.edge_owner_to_timeline_media.edges.map(post => (
              <Col key={post.node.id} lg={3} md={4} sm={6} className="mb-4">
                <a href={`https://www.instagram.com/p/${post.node.shortcode}`}>
                  {/* use Gatsby Image */}
                  <img alt="post" src={post.node.thumbnail_src} width="100%" />
                </a>
              </Col>
            ))}
          </Row>
        </Container>

        <Container as="section" className="my-4">
          <Row as={Col} className="justify-content-center">
            <h1 className="mb-4">Who We've Worked With</h1>
          </Row>
          <Row className="align-items-center text-center">
            <Col lg sm={12}>
              <a href="https://www.mozilla.org">
                <img alt="Mozilla logo" src={MozillaLogo} width={200} />
              </a>
            </Col>
            <Col lg sm={12}>
              <a href="https://www8.gsb.columbia.edu/socialenterprise/">
                <img
                  alt="Columbia Tamer Center logo"
                  src={ColumbiaLogo}
                  width={200}
                />
              </a>
            </Col>
            <Col lg sm={12}>
              <a href="https://goodienation.org/">
                <img
                  alt="Goodie Nation logo"
                  src={GoodieNationLogo}
                  width={200}
                />
              </a>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

const HeroContainer = styled(Container)`
  & {
    padding: 0;

    h1 {
      font-weight: 900;
      line-height: 1.5em;
      margin-top: 0.7em;
      margin-bottom: 1.5em;
    }

    .hero-img {
      width: calc(100px + 25vw);
      margin: 0 auto;
    }
  }
`

const LoadingWrapper = styled.div`
  height: 100vh;

  & div {
    width: 100px;
    height: 100px;
  }
`

export default IndexPage
