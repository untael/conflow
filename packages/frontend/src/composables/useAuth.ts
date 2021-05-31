import axios from 'axios'

export const useAuth = () => {

  const login = (email: string, password: string) => {

  }

  const register = async (email: string, password: string) => {
    const data = await axios.post(process.env.VUE_APP_API_URL, {
      query: `
mutation {
  register(input: { username: "test", email: "${email}", password: "${password}" }) {
    jwt
    user {
      username
      email
    }
  }
}
    `,
      // variables: {
      //   email: email,
      //   password: password,
      //   username: 'test',
      // },
    })
//     const data = await axios({
//       url: process.env.VUE_APP_API_URL,
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//         'Access-Control-Allow-Origin': '*',
//       },
//       data: {
//         query: `
// mutation {
//   register(input: { email: $email, password: $password }) {
//     jwt
//     user {
//       email
//     }
//   }
// }
//     `,
//         variables: {
//           email: email,
//           password: password,
//         },
//       },
//     })
    console.log('data', data)
  }
  return { register }
}
