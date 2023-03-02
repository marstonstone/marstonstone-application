// import { Auth } from 'aws-amplify';

const config = {
  amplify: {
    // Auth: {
    //   userPoolId: process.env.REACT_APP_AWS_AUTH_USERPOOLID,
    //   region: process.env.REACT_APP_AWS_AUTH_REGION,
    //   userPoolWebClientId: process.env.REACT_APP_AWS_AUTH_USERPOOLWEBCLIENTID,
    // },
    API: {
      endpoints: [
        {
          name: 'Internal-API',
          endpoint: process.env.REACT_APP_INTERNAL_API,
        },
      ],
    },
  },
};

export default config;
