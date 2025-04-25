import { updatePrices } from '../redux/cryptoSlice'

class MockWebSocket {
    constructor(store) {
        this.store = store;
        this.interval = null;
    }

    connect() {
        this.interval = setInterval(() => {
            this.store.dispatch(updatePrices());
        }, 2000);
    }

    disconnect() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

export default MockWebSocket;