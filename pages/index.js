import React from "react"
import Router from "next/router"
import Layout from "../app/Layout"

import {
  Segment,
  Container,
  Header,
  Form,
  Button,
  Icon
} from "semantic-ui-react"

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchPhrase: "test"
    }

    this.handleSearchPhraseChange = this.handleSearchPhraseChange.bind(this)
    this.redirectToSearchPage = this.redirectToSearchPage.bind(this)
  }

  handleSearchPhraseChange(event) {
    this.setState({
      searchPhrase: event.target.value
    })
  }

  redirectToSearchPage() {
    Router.push({
      pathname: '/search',
      query: {q: this.state.searchPhrase}
    });
  }

  render() {
    return (
      <Layout>
        <Segment
          textAlign="center"
          style={{ minHeight: "100vh", paddingTop: "200px" }}
          vertical
        >
          <Container text>
            <Header
              content="DevCollege card search"
            />
            <Form>
              <Form.Field>
                <label>Search for cards</label>
                <input
                  placeholder="Type search phrase"
                  type="text"
                  value={this.state.searchPhrase}
                  onChange={this.handleSearchPhraseChange}
                />
              </Form.Field>
              <Button
                onClick={this.redirectToSearchPage}
              >
                Submit
                <Icon name="right arrow" />
              </Button>
            </Form>
          </Container>
        </Segment>
      </Layout>
    )
  }
}
