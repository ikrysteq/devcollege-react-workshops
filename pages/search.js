import React from "react"
import Link from "next/link"
import Layout from "../app/Layout"
import {connect} from "react-redux";
import {fetchCards} from '../app/actions/card'
import {
  Table,
} from "semantic-ui-react"

class Search extends React.Component {
  // fires before component init:
  // query is in context
  // 'getInitialProps' code must be compatible with browser and server
  static async getInitialProps({ store, query }) {
    const searchPhrase = query.q;
    await store.dispatch(fetchCards(searchPhrase));
    return {}
  }

  render() {
    // with unique keys (eg. 'card.id') react render only this one row
    const rows = this.props.results.map(card => (
            <Table.Row key={card.id}>
              <Table.Cell>
                  <Link
                  href={{pathname: '/card', query: {id: card.id}}}
                  >
                  <a>{card.name}</a>
                  </Link>
              </Table.Cell>
              <Table.Cell>{card.set_name}</Table.Cell>
              <Table.Cell>{card.mana_cost}</Table.Cell>
              <Table.Cell>{card.eur ? `${card.eur}€` : "N/A"}</Table.Cell>
            </Table.Row>
          ));

    return (
      <Layout>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Set</Table.HeaderCell>
              <Table.HeaderCell>Mana cost</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{rows}</Table.Body>
        </Table>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  results: state.card.results
});

// HOF - connect returns function with our argument Search
//returns component wrapped with store
export default connect(
  mapStateToProps,
)(Search);
