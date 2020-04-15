import React, { Component } from 'react'
import request from 'superagent'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const genreUrl = 'https://binaryjazz.us/wp-json/genrenator/v1/genre'
const giphyKey = 'WxVWUK3MGQVmOIvQUHUMsRODwCw1JViY'
const giphyUrl = `https://api.giphy.com/v1/gifs/search?limit=1&offset=0&rating=G&lang=en`


class Genrenator extends Component {
  state = {
    genre: '',
    gif: ''
  }

  componentDidMount() {
    this.setState({gif: false})
    request.get(genreUrl)
      .then(res => {
        this.setState({
          genre: res.body
        })
      })
    request.get(giphyUrl)
      .query({
        api_key: giphyKey,
        q: this.state.genre.split(' ').join('_')
      })
      .then(res => {
        this.setState({
          gif: (res.body.data === []) ? false : res.body.data[0].images.original.url
        })
      })
  }

  render() { 
    return (
      <Container style={{ width: '50%' }}>
        <Card>
          {this.state.gif ? <Card.Img variant="top" src={this.state.gif} /> : <Card.Text>No gif found :/</Card.Text>}
          <Card.Body>
            {(this.state.genre === '') && <Card.Title>Loading genre...</Card.Title>}
            <Card.Title>{this.state.genre}</Card.Title>
            <Card.Text>Gifs are the first result for {this.state.genre} on Giphy</Card.Text>
            <Button variant="primary" onClick={() => this.componentDidMount()}>New Random Genre</Button>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

export default Genrenator