const environment = {
  development: {
    apiUrl: "http://localhost:5000"
  },
  production: {
    apiUrl: "https://don-covid-tracker-api.herokuapp.com"
  }
}

export default environment[process.env.NODE_ENV];