const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const email = "shanikt@gmail.com";
const password = "Shanik41810028!";

fetch("https://literal.club/graphql/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `,
    variables: { email, password }
  })
})
  .then(res => res.json())
  .then(data => {
    console.log("Your token:", data.data.login.token);
  });
