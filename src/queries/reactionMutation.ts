import { graphql, commitMutation, readInlineData } from 'react-relay'
import createEnvironment from '../lib/createEnvironment';
import type {
  AddReactionInput,
  ReactionContent,
  reactionMutation,
  reactionMutation as reactionMutationType,
reactionMutation$data as reactionMutationResponse,
} from '../queries/__generated__/reactionMutation.graphql';
// src/queries/issueQuery.tsで取得した issueのIDをここに渡せる様な実装を目標にする、、まだできてない
export const reactionMutations = graphql`
 mutation reactionMutation(
  $reactionInput:AddReactionInput!
  $reopenIssueInput: ReopenIssueInput!
  ){ addReaction(input:$reactionInput) { 
    reaction{
     content
     id
     databaseId
    }
   }
    reopenIssue(input: $reopenIssueInput) {
    issue {
      ...issueFragment
    }
  }
}
`
// ここは現状つかってない
// export const commitReactionMutation = (): Promise<reactionMutationResponse> =>
//   new Promise((resolve, reject) => {
//     const environment = createEnvironment()
//     if (!environment) {
//       reject(new Error('No environment'));
//       return;
//     }
//     commitMutation<reactionMutationType>(environment, {
//       mutation: reactionMutations,
//       variables: {
//         input: <AddReactionInput>{},
//       },
//       onCompleted: (response) => {
//         resolve(response);
//         console.log(response)
//       },
//       onError: (error) => {
//         reject(error);
//       },
//     });
//   });
  
export const commitReactionMutation = (content: string, subjectId: string | undefined) =>  { 
  const environment = createEnvironment()
  const variables = {
    input: {
      content,
      subjectId,
    },
  }
  commitMutation(
    environment,
    {
      mutation: reactionMutations,
      variables,
      // 6
      onCompleted: () => {
        console.log('Completed')
      },
      onError: err => console.error(err),
    },
  )
}