import { createSlice } from '@reduxjs/toolkit';

const generateSparkline = (basePrice, currentPrice) =>
    Array.from({ length: 24 }, (_, i) =>
        parseFloat((currentPrice + Math.sin(i / 2) * 50 + Math.random() * 20 - 10).toFixed(2))
    );

const initialState = {
    assets: [
        {
            id: 1,
            name: 'Bitcoin',
            symbol: 'BTC',
            price: 93759.48,
            thPercent: -0.43,
            h24Percent: -0.93,
            d7Percent: -11.11,
            marketCap: 1861618902186,
            volume24h: 43874950947,
            circulatingSupply: 19.85,
            maxSupply: 46.78,
            sparkline: generateSparkline(93759.48),
        },
        {
            id: 2,
            name: 'Ethereum',
            symbol: 'ETH',
            price: 1802.46,
            thPercent: -0.60,
            h24Percent: -3.21,
            d7Percent: -13.68,
            marketCap: 217581279327,
            volume24h: 23547469307,
            circulatingSupply: 120.71,
            maxSupply: null,
            sparkline: generateSparkline(1802.46),
        },
        {
            id: 3,
            name: 'Tether',
            symbol: 'USDT',
            price: 1.0,
            thPercent: -0.00,
            h24Percent: -0.00,
            d7Percent: -0.04,
            marketCap: 145320022085,
            volume24h: 92268882007,
            circulatingSupply: 145.27,
            maxSupply: null,
            sparkline: generateSparkline(1.0),
        },
        {
            id: 4,
            name: 'XRP',
            symbol: 'XRP',
            price: 2.22,
            thPercent: -0.46,
            h24Percent: -0.54,
            d7Percent: -6.18,
            marketCap: 130073814966,
            volume24h: 5131481491,
            circulatingSupply: 58.39,
            maxSupply: 100.0,
            sparkline: generateSparkline(2.22),
        },
        {
            id: 5,
            name: 'BNB',
            symbol: 'BNB',
            price: 606.65,
            thPercent: -0.09,
            h24Percent: -1.20,
            d7Percent: -3.73,
            marketCap: 85471956947,
            volume24h: 1874281784,
            circulatingSupply: 140.89,
            maxSupply: null,
            sparkline: generateSparkline(606.65),
        },
        {
            id: 6,
            name: 'Solana',
            symbol: 'SOL',
            price: 133.54,
            thPercent: 7.18,
            h24Percent: 7.18,
            d7Percent: 4.9,
            marketCap: 68127495099,
            volume24h: 3659714887,
            circulatingSupply: 510156352,
            maxSupply: null,
            sparkline: generateSparkline(133.54),
        },
    ],
};


export const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        updatePrices: (state) => {
            state.assets = state.assets.map(asset => {
                const priceChange = (Math.random() * 2 - 1) / 100;
                const newPrice = asset.price * (1 + priceChange);
                const newSparkline = generateSparkline(asset.price, newPrice);

                const randomPercentChange = () => (Math.random() * 4 - 2);

                const volumeChange = (Math.random() * 20 - 10) / 100;
                const newVolume = asset.volume24h * (1 + volumeChange);

                return {
                    ...asset,
                    price: parseFloat(newPrice.toFixed(2)),
                    thPercent: parseFloat((asset.thPercent + randomPercentChange()).toFixed(2)),
                    h24Percent: parseFloat((asset.h24Percent + randomPercentChange()).toFixed(2)),
                    d7Percent: parseFloat((asset.d7Percent + randomPercentChange()).toFixed(2)),
                    volume24h: parseFloat(newVolume.toFixed(0)),
                    sparkline: newSparkline,

                };
            });
        },
    },
});

export const { updatePrices } = cryptoSlice.actions;
export const selectAllAssets = (state) => state.crypto.assets;
export default cryptoSlice.reducer;