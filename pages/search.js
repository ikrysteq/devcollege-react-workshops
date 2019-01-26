import React from "react"
import Link from "next/link"
import Layout from "../app/Layout"
import fetch from "node-fetch"
import { Table } from "semantic-ui-react"

export default class Search extends React.Component {
  // fires before component init:
  // query is in context
  // 'getInitialProps' code must be compatible with browser and server
  static async getInitialProps({ query }) {
    const searchPhrase = query.q
    const res = await fetch(
      `https://api.scryfall.com/cards/search?q=${searchPhrase}`
    )
    const statusCode = res.status
    const { data } = await res.json() //parsing must be async
    return { data, statusCode }
  }

  render() {
    // with unique keys (eg. 'card.id') react render only this one row
    const rows =
      this.props.statusCode === 200
        ?
          this.props.data.map(card => (
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
          ))
        : []

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
