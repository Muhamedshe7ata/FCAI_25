
import 'react-hot-loader/patch'; // Keep this as the FIRST import!
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root'; // Import 'hot'

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore } from 'app/store';
import Root from './app'; // Assuming './app' exports your root component
import history from './browserHistory';

// prepare store
const store = configureStore(history);

// Wrap your root component with hot()
// If Root has typing issues after wrapping, you might need to adjust Root or its definition.
// Often, defining the component to render outside of ReactDOM.render is cleaner:
const HotRoot = hot(Root);

// Now render the hot-wrapped component
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HotRoot /> {/* Render the hot-wrapped component here */}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// Note: The manual module.hot.accept logic is usually not needed
// when using webpack-dev-server with the --hot flag and RHL v4+/v5 setup.
// The 'react-hot-loader/patch' and hot(Root) should handle most cases.// import 'react-hot-loader/patch';
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
// import { configureStore } from 'app/store';
// import Root from './app';
// import history from './browserHistory';

// // prepare store
// const store = configureStore(history);

// ReactDOM.render(
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <Root />
//     </ConnectedRouter>
//   </Provider>,
//   document.getElementById('root'),
// );
