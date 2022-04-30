# Prisma repro

Trying to reproduce https://github.com/prisma/prisma/issues/12856#issuecomment-1113962687

## Setup

Install dependencies and run with `npx ts-node index.ts`.
After the intial run you should have following data in the db:

```
➜ npx prisma-repl
> await db.user.findMany();
[ { id: 1, email: 'alice@prisma.io', name: 'Alice' } ]
> await db.post.findMany();
[
  {
    id: 1,
    createdAt: 2022-04-30T14:21:10.214Z,
    updatedAt: 2022-04-30T14:21:10.214Z,
    title: 'TestPost1',
    content: 'Some content 1',
    published: false,
    authorId: 99999
  },
  {
    id: 2,
    createdAt: 2022-04-30T14:21:10.214Z,
    updatedAt: 2022-04-30T14:21:10.214Z,
    title: 'TestPost2',
    content: 'Some content 2',
    published: false,
    authorId: 1
  }
]
```

After that check out branch `add-foreign-key-constraint` and run `npx prisma migrate deploy`.
