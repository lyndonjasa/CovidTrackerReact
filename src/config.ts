const environment = {
  development: {
    apiUrl: "http://localhost:5000"
  },
  production: {
    apiUrl: process.env.API_URL
  }
}

export default environment[process.env.NODE_ENV];