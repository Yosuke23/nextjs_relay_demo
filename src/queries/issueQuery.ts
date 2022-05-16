import { graphql } from 'react-relay'
// issue（今回は一個目のissue）のデータとそれに紐づいたcommentsのデータを取得（今回は初めから10件）
export default graphql`
query issueQuery {
  repository(owner: "Yosuke23", name: "nextjs_relay_demo") {
    issue(number: 1) {
      id
      publishedAt
      title
      body
    comments(first: 10) {
      edges {
        node {
          id
          bodyText
        }
       }
      }
     }
    }
   }
`
