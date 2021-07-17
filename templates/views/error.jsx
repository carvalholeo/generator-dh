const React = require('react');
const Layout = require('./layout');

function Error(props) {
  return (
    <Layout>
      <h1>{props.message}</h1>
      <h2>{props.error.status}</h2>
      <pre>{props.error.stack}</pre>
    </Layout>
  );
}

module.exports = Error;
