const environment = {
  development: {
    apiUrl: "http://localhost:5000"
  },
  production: {
    apiUrl: "https://monster-slayer-api.herokuapp.com"
  }
}

export default environment[process.env.NODE_ENV];