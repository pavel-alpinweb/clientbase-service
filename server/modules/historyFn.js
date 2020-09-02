module.exports.saveClientInHistory = async (client, HistoryClient, message, lastChangedTrade) => {
  const updatedClient = {}
  for (const key in client) {
    if (key !== '_id') {
      updatedClient[key] = client[key]
    }
  }
  const historyClient = new HistoryClient(updatedClient)
  historyClient.change = message
  historyClient.date = Date.now()
  if (lastChangedTrade) {
    historyClient.lastChangedTrade = lastChangedTrade
  }
  historyClient.trades = []
  for (const item of client.trades) {
    const trade = {
      isNewTrade: item.isNewTrade,
      client: item.client,
      title: item.title,
      date: item.date,
      pay: item.pay,
      clientId: item.clientId
    }
    historyClient.trades.push(trade)
  }
  await historyClient.save()
}
