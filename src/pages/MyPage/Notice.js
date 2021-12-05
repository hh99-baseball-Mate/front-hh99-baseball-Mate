// import React from "react"

// import { IKImage, IKContext } from "imagekitio-react"

// export const Notice = ({ path, fileName }) => {
//   const urlEndpoint = `https://ik.imagekit.io/jaeil/images/group/${path}`
//   const publicKey = process.env.APP_PUBLIC_KEY
//   const serverUrl = process.env.REACT_APP_BASE_URL

//   return (
//     <IKContext
//       publicKey={publicKey}
//       urlEndpoint={urlEndpoint}
//       transformationPosition="path"
//       authenticationEndpoint={serverUrl}
//     >
//       {/* // Image component */}
//       <IKImage
//         path="/basic0"
//         transformation={[
//           {
//             height: "300",
//             width: "400",
//           },
//         ]}
//       />
//       {/* // Image upload */}
//       {/* <IKUpload fileName="my-upload" /> */}
//     </IKContext>
//   )
// }
