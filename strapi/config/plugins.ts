export default ({ env }) => ({
    'users-permissions': {
        config: {
            register: {
                allowedFields: [
                    'username',
                    'email',
                    'password',
                    'firstName',
                    'lastName',
                    'yearOfBirth',
                    'gender',
                    'zipCode',
                    'country',
                    'loginCount',
                    'state',
                ],
            },
            jwt: {
                expiresIn: '24h',
            },
        },
    },
    upload: env('NODE_ENV') === 'development' || !env('NODE_ENV')
        ? {
            // Development: Use default local file upload in public/uploads folder
            config: {
                provider: 'local',
            },
        }
        : {
            // Production/Staging: Use AWS S3
            config: {
                provider: 'aws-s3',
                providerOptions: {
                    credentials: {
                        accessKeyId: env('AWS_ACCESS_KEY_ID'),
                        secretAccessKey: env('AWS_ACCESS_SECRET'),
                    },
                    region: env('AWS_REGION'),
                    params: {
                        Bucket: env('AWS_BUCKET_NAME'),
                        ACL: null, // Must be like this, due to a Strapi bug
                    },
                },
                actionOptions: {
                    upload: {},
                    uploadStream: {},
                    delete: {},
                },
            },
        },
    email: env('NODE_ENV') === 'development' || !env('NODE_ENV')
        ? {
            config: {
                provider: 'nodemailer',
                providerOptions: {
                    host: env('ETH_HOST'),
                    port: env.int('ETH_PORT'),
                    auth: {
                        user: env('ETH_USER'),
                        pass: env('ETH_PASS'),
                    },
                    secure: false,
                },
                settings: {
                    defaultFrom: env('ETH_DEFAULT_FROM'),
                },
            },
        }
        : {
            config: {
                provider: 'amazon-ses',
                providerOptions: {
                    key: env('AWS_SES_KEY'),
                    secret: env('AWS_SES_SECRET'),
                    amazon: env('AWS_SES_ENDPOINT'),
                    debug: true,
                },
                settings: {
                    defaultFrom: env('AWS_SES_DEFAULT_FROM'),
                    logger: console,
                },
            },
        }
});