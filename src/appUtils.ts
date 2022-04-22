let client: any
const setClient = async (cli) => {
  client = cli
}

const getClient = async () => {
  return await client
}

const getNumber = async (numberPhone) => {
  const number = numberPhone
  const numberDDD = number.substr(0, 2)
  const numberUser = number.substr(-8, 8)

  let numberValid

  if (numberDDD <= 30) {
    numberValid = '55' + numberDDD + '9' + numberUser + '@c.us'
  } else if (numberDDD > 30) {
    numberValid = '55' + numberDDD + numberUser + '@c.us'
  }
  return await numberValid
}



module.exports = {
  setClient,
  getClient,
  getNumber,
}
