import React, { Component } from 'react';
import { Header, Segment, Divider, Grid, Image } from 'semantic-ui-react';
import ReactMarkDown from 'react-markdown';
import axios from 'axios';
import dpsLogo from '../images/dpsLogo.svg';

class Home extends Component {
  state = { assignmentMarkdown: '' };

  componentDidMount() {
    axios.get('/api/assignment_details')
      .then(res => {
        this.setState({ assignmentMarkdown: res.data.file })
      })
      .catch( error => {
        console.log(error.response);
    });
  }

  render() {
    return(
      <Segment basic>
        <Segment basic textAlign='center'>
          <Image style={styles.centered} size='tiny' src={dpsLogo} alt='DevPoint Studios Logo' />
          <Header as='h1' style={styles.header}>DevPoint Studios React Assessment</Header>
        </Segment>
        <Grid>
          <Grid.Column computer={8} tablet={8} mobile={16}>
            <Segment inverted>
              <Header
                as='h1'
                textAlign='center'
                style={styles.header}>
                  Assessment Details:
              </Header>
              <Divider />
              <ReactMarkDown source={this.state.assignmentMarkdown} />
            </Segment>
          </Grid.Column>
          <Grid.Column computer={8} tablet={8} mobile={16}>
            <Segment inverted>
              <Header
                as='h1'
                textAlign='center'
                style={styles.header}>
                  Assessment API Endpoints:
              </Header>
              <Divider />
              <iframe
                style={styles.iframe}
                title='Assignment README.md'
                frameBorder={0}
                src='http://localhost:3001/rails/info/routes'
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

const styles = {
  iframe: {
    width: '100%',
    height: '100vh'
  },
  centered: {
    margin: '0 auto',
  },
  header: {
    color: '#2ecc40'
  }
}

export default Home;
