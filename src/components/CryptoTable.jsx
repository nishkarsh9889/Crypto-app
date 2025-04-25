import React from "react";
import { useSelector } from "react-redux";
import { selectAllAssets } from "../redux/cryptoSlice";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Sparklines, SparklinesLine } from "react-sparklines";

const CRYPTO_IMAGES = {
  Bitcoin: "/bitcoin.png",
  Ethereum: "/ethereum.png",
  Tether: "/tether.png",
  XRP: "/xrp.png",
  BNB: "/bnb.png",
  Solana: "/solana.png",
};

const CryptoTable = () => {
  const assets = useSelector(selectAllAssets);

  const formatNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const formatSupply = (supply, symbol) => {
    if (supply >= 1e9) return `${(supply / 1e9).toFixed(2)}B ${symbol}`;
    if (supply >= 1e6) return `${(supply / 1e6).toFixed(2)}M ${symbol}`;
    return `${supply.toLocaleString()} ${symbol}`;
  };

  const getColorClass = (value) =>
    value >= 0 ? "text-green-500" : "text-red-500";

  const getArrowIcon = (value) =>
    value >= 0 ? (
      <ArrowUpRight className="inline w-4 h-4" />
    ) : (
      <ArrowDownRight className="inline w-4 h-4" />
    );

  return (
    <div className="px-4 py-10 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Crypto Market</h1>

        <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white/5 backdrop-blur-md border border-white/10">
          <table className="min-w-full text-sm text-white">
            <thead className="bg-white/10">
              <tr>
                {[
                  "#",
                  "Name",
                  "Price",
                  "1h %",
                  "24h %",
                  "7d %",
                  "Market Cap",
                  "Volume (24h)",
                  "Circulating Supply",
                  "Last 7 Days",
                ].map((heading, i) => (
                  <th
                    key={i}
                    className="px-6 py-4 text-left uppercase tracking-wider font-semibold text-xs text-gray-400"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr
                  key={asset.id}
                  className="border-b border-white/10 hover:bg-white/5 transition duration-150"
                >
                  <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                  <td className="px-6 py-4 flex items-center gap-3 font-semibold">
                    <img
                      src={CRYPTO_IMAGES[asset.name] || "/placeholder.png"}
                      alt={asset.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <div>
                      <div>{asset.name}</div>
                      <div className="text-gray-400 text-xs">
                        {asset.symbol}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">${asset.price.toLocaleString()}</td>
                  <td className={`px-6 py-4 ${getColorClass(asset.thPercent)}`}>
                    {asset.thPercent > 0 ? "+" : ""}
                    {asset.thPercent}% {getArrowIcon(asset.thPercent)}
                  </td>
                  <td
                    className={`px-6 py-4 ${getColorClass(asset.h24Percent)}`}
                  >
                    {asset.h24Percent > 0 ? "+" : ""}
                    {asset.h24Percent}% {getArrowIcon(asset.h24Percent)}
                  </td>
                  <td className={`px-6 py-4 ${getColorClass(asset.d7Percent)}`}>
                    {asset.d7Percent > 0 ? "+" : ""}
                    {asset.d7Percent}% {getArrowIcon(asset.d7Percent)}
                  </td>
                  <td className="px-6 py-4">{formatNumber(asset.marketCap)}</td>
                  <td className="px-6 py-4">{formatNumber(asset.volume24h)}</td>
                  <td className="px-6 py-4">
                    {formatSupply(asset.circulatingSupply, asset.symbol)}
                    {asset.maxSupply && (
                      <div className="text-xs text-gray-400">
                        Max: {formatSupply(asset.maxSupply, asset.symbol)}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {asset.sparkline && asset.sparkline.length > 0 ? (
                      <Sparklines
                        data={asset.sparkline}
                        width={100}
                        height={30}
                      >
                        <SparklinesLine
                          color={
                            asset.sparkline[0] <
                            asset.sparkline[asset.sparkline.length - 1]
                              ? "#16a34a" // Green 
                              : "#dc2626" // Red 
                          }
                          style={{ fill: "none" }}
                        />
                      </Sparklines>
                    ) : (
                      <div className="text-gray-400 text-sm">
                        No data available
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;
