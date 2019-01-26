import React from "react"
import Layout from "../app/Layout"
import fetch from "node-fetch"
import {connect} from "react-redux";
import { fetchCardDetails } from "../app/actions/card";
import {
  Card,
  Image,
  Icon,
  Container
} from "semantic-ui-react"

class CardDetail extends React.Component {
  static async getInitialProps({ store, query }) {
    const cardId = query.id;
    await store.dispatch(fetchCardDetails(cardId));
    return {}
  }

  render() {
    const card  = this.props.details;
    return (
      <Layout>
        <Card style={{ margin: "10vh auto 0 auto"}}>
          <Image src={card.image_uris.art_crop} />
          <Card.Content>
            <Card.Header>{card.name}</Card.Header>
            <Card.Meta>
              <Icon name="theme" />
              {card.mana_cost}
            </Card.Meta>
            <Card.Description>
              {card.oracle_text.split("\n").map((paragraph, index) => (
                <p key={index}> {paragraph} </p>
              ))}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>{card.set_name}</Card.Content>
        </Card>
      </Layout>
    )
  }
}
const mapStateToProps = (state) => ({
  details: state.card.details
});

// returns component wrapped with store
export default connect(
  mapStateToProps,
)(CardDetail);
