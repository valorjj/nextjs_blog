<!-- @format -->

# Next.js 이용한 블로그

![blog](https://user-images.githubusercontent.com/30681841/281118817-a11df869-fbbb-482a-9f85-688dd3a6ea69.png)

# Prisma 설치

> Node.js 기반 ORM <br/>
> 스프링부트에서의 JPA, Hibernate 를 생각하면 된다.

[공식](https://authjs.dev/reference/adapter/prisma)

```bash
# 1. Prisma 설치
npm install @prisma/client @auth/prisma-adapter
npm install prisma --save-dev

# 2. prisma/schema.prisma
npx prisma init --datasource-provider mongodb

# 3. mongodb 관련 설정을 마친 후
npx primsa generate
```

## prisma | mongodb 설정

<script src="https://gist.github.com/valorjj/a7f26628b3385dac9503432a08312e80.js"></script>

## prisma studio 이용

prisma studio 라는 GUI 를 지원한다.

```bash
npx prisma studio
```

위 명령어 실행 시, `localhost:5555` 에서 CRUD 작업을 할 수 있다.

`schema.prisma` 을 작성한 뒤 `npx prisma generate` 명령어로 모델과 컬렉션을 생성한다.

## 데이터 fetch

스프링부트에서 `JPA`, `Hibernate` 을 사용하는 것 처럼 `MongoDB` 를 `Prisma` 라는 ORM 에 연결해서 사용한다. (깃허브를 보니 `firebase` 도 연결가능하다.)

`import { PrismaAdapter } from "@auth/prisma-adapter"`

아직은 모든게 생소해서 정리를 해보자면,

-   `adapter` 패턴으로 여러 종류의 DB 와 Connection 을 지원한다.
    -   여기선 `MongoDB` 와 연결한다.
    -   `.env` 파일에 `MongoDB Atlas` 에서 제공하는 url 을 적는다.
    -   `mongodb+srv://<username>:<password>@cluster0.tjhl874.mongodb.net/?retryWrites=true&w=majority`
-   `import { PrismaClient } from "@prisma/client"` 객체를 사용해서
    -   DB 와 연결을 맺은 객체를 전역적으로 사용하기 위한 유틸 객체 생성
        -   `utils/connect.js`

쿼리도 매우 간단한데, Category 라는 컬렉션에 대한 모든 데이터를 가져오는 쿼리는 다음 한줄이면 된다.

`const categories = await prisma.category.findMany()`

전체적인 코드는

```javascript
export const GET = async () => {
	try {
		const categories = await prisma.category.findMany();
		return new NextResponse(
			JSON.stringify(categories, {
				status: 200,
			})
		);
	} catch(e) {
        // error handling
    }
```

그럼 호출은 어떻게 해야할까?
`/api/categories` 로 해당 쿼리를 실행한 결과 값을 확인할 수 있다.

```bash
api
├── auth
│   └── [...nextauth]
│       └── route.js
└── categories
    └── route.js
```

왜냐면 Next.js 가 route.js 라는 특정한 파일을 통해서 HTTP 통신을 담당하는 핸들러를 생성하도록 만들었기 때문이다.

따라서, `app/api/...` 경로로 폴더를 생성한 뒤, route.js 파일을 생성해 GET, POST 등의 async 메서드를 만들면 된다.

[route.js 에 관한 Next.js 공식 가이드](https://nextjs.org/docs/app/api-reference/file-conventions/route) 를 참고한다.

### 메서드 호출

위에서 정의한 HTTP 핸들러 객체를 다른 곳에서 호출해서 사용해보자.

```javascript
const getData = async () => {
	const response = await fetch("/api.categories", {
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error("Failed");
	}

	return response.json();
};
```

### 페이징

Post 를 불러올 때는 페이지를 고려해야 한다. 따라서, 페이지를 계산할 간단한 로직을 첨가해야한다.

```javascript
const { posts, count } = await getData(page);

const POST_PER_PAGE = 2;

const hasPrev = POST_PER_PAGE * (page - 1) > 0;
const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;
```

Post 에 쿼리를 요청할 때, 쿼리가 **_총 2번_** 나가야 한다.

1. 페이지 전체 개수를 구하는 쿼리
2. 현재 페이지, 페이지 당 보여줄 개수 를 계산해서 그 만큼한 데이터 요청

```javascript
// 한번에 여러 쿼리를 날릴 수 있는 $transaction 을 사용
export const GET = async (req) => {
	const { searchParams } = new URL(req.url);
	const page = searchParams.get("page");
	const POST_PER_PAGE = 2;

	const query = {
		take: POST_PER_PAGE,
		skip: POST_PER_PAGE * (page - 1),
	};

	try {
		// multiple request at once
		const [posts, count] = await prisma.$transaction([
			prisma.post.findMany(query),
			prisma.post.count(),
		]);
    }
}

```

### 카테고리 검색 추가

```javascript
const query = {
	take: POST_PER_PAGE,
	skip: POST_PER_PAGE * (page - 1),
	where: {
		...GET(cat && { catSlug: cat }),
	},
};
```

## swr 설치

> [swr 설명은 여기서 확인](https://swr.vercel.app/ko)

```bash
npm -i swr
```

### 장점

> 장점이 많지만, 여기선 아래 2가지만 생각한다.

-   SSR, SSG
-   Cache

### 기본 사용법

```javascript
import useSWR from "swr";

function Profile() {
	const { data, error, isLoading } = useSWR("/api/user", fetcher);

	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	return <div>hello {data.name}!</div>;
}
```

## 댓글 검색

> 특정한 게시물에 작성된 댓글을 검색

```javascript
// /app/api/comments/route.js
export const GET = async (req) => {
	const { searchParams } = new URL(req.url);
	// 특정 페이지 번호를 쿼리에서 가져온다. 
	const postSlug = searchParams.get("postSlug");

	try {
		const comments = await prisma.comment.findMany({
			
			where: {
				...(postSlug && { postSlug }),
			},
			include: { user: true },
		});
}
```
