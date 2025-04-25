import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store"
import CryptoTable from "./components/CryptoTable"
import MockWebSocket from "./utils/WebSocket";

const App = () => {
  useEffect(() => {
    const ws = new MockWebSocket(store);
    ws.connect();

    return () => {
      ws.disconnect();
    };
  }, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <CryptoTable />
      </div>
    </Provider>
  );
};

export default App;
