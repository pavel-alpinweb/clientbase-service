module.exports.saveClientInHistory = async (client, HistoryClient, message) => {
  const updatedClient = {}
  for (const key in client) {
    if (key !== '_id') {
      updatedClient[key] = client[key]
    }
  }
  const historyClient = new HistoryClient(updatedClient)
  historyClient.change = message
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
