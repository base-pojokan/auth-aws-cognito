# Authentication with AWS Cognito

Package Authentication For AWS Cognito

## Install

```
yarn add @base-pojokan/auth-aws-cognito
```


## Express + Serverless HTTP

- Untuk mengambil data requestContext, maka di handler harus dirubah terlebih dahulu, yang sebelumnya :

```js
// export to serverless
export const handler = serverless(app);
```

- Ubah menjadi seperti dibawah ini

```js
// export to serverless
export const handler = serverless(app, {
    request(request, event, context) {
        request.context = event.requestContext;
    },
});
```

- Kemudian ketika declare request, harus menggunakan request extended dari package ini dan validate group dari cognito

```js
import { Response, NextFunction } from 'express';
import { RequestAuthenticated, validateGroup } from '@base-pojokan/auth-aws-cognito';

export const index = async (req: RequestAuthenticated, res: Response, next: NextFunction) => {
    try {
        // validate group
        const userDetail = validateGroup(req, 'venue');

        return res.status(200).json(userDetail);
    } catch (e) {
        next(e);
    }
}
```