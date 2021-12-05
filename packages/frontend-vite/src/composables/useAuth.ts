import axios from 'axios'

export const useAuth = () => {

  const login = async (email: string, password: string) => {
    const response: any = await axios.post(import.meta.env.VITE_API_URL as string, {
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
    const response = await axios.post(import.meta.env.VITE_API_URL as string, {
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
