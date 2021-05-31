import axios from 'axios'

export const useAuth = () => {

  const login = async (email: string, password: string) => {
    const response = await axios.post(process.env.VUE_APP_API_URL, {
      query: `
mutation {
  login(input: { identifier: "${email}", password: "${password}" }) {
    jwt
  }
}
    `,
    })
  }

  const register = async (username: string, email: string, password: string) => {
    const response = await axios.post(process.env.VUE_APP_API_URL, {
      query: `
mutation {
  register(input: { username: "${username}", email: "${email}", password: "${password}" }) {
    jwt
    user {
      username
      email
    }
  }
}
    `,
    })
  }
  return { register, login }
}
