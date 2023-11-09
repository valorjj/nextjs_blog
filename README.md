<!-- @format -->

# Next.js 이용한 블로그

# 전체구조 및 계획

![blog](https://user-images.githubusercontent.com/30681841/281118817-a11df869-fbbb-482a-9f85-688dd3a6ea69.png)

## Prisma 설치

> Node.js 기반 ORM <br/>
> 스프링부트에서의 JPA, Hibernate 를 생각하면 된다. <br/>
> MongoDB 등 여러 NoSQL 데이터베이스와 연결해서 사용할 수 있다.

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

`prisma studio` 라는 GUI 를 지원한다.

```bash
npx prisma studio
```

위 명령어 실행 시, `localhost:5555` 에서 기본적인 CRUD 작업을 할 수 있다.

`schema.prisma` 을 작성한 뒤 `npx prisma generate` 명령어로 모델과 컬렉션을 생성한다.

## 데이터 fetch

스프링부트에서 `JPA`, `Hibernate` 을 사용하는 것 처럼 `MongoDB` 를 `Prisma` 라는 ORM 에 연결해서 사용한다. (깃허브를 보니 `firebase` 도 연결가능하다.)

`import { PrismaAdapter } from "@auth/prisma-adapter"`

아직은 모든게 생소해서 정리를 해보자면,

-   `adapter` 패턴으로 여러 종류의 DB Connection 을 지원한다.
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

왜냐면 `Next.js` 가 `route.js` 라는 특정한 파일을 통해서 HTTP 처리를 담당하는 객체를 생성하도록 만들었기 때문이다.

따라서, `app/api/...` 경로로 폴더를 생성한 뒤, `route.js` 파일을 생성해 GET, POST 등의 메서드를 만들면 된다.

[route.js 에 관한 Next.js 공식 가이드](https://nextjs.org/docs/app/api-reference/file-conventions/route) 를 참고한다.

### 메서드 호출

위에서 정의한 GET 객체를 다른 곳에서 호출해서 사용해보자.

```javascript
const getData = async () => {
	const response = await fetch('/api.categories', {
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed');
	}

	return response.json();
};
```

### 페이징

`Post` 를 불러올 때는 페이지를 고려해야 한다. 따라서, 페이지를 계산할 간단한 로직을 첨가한다.

```javascript
const { posts, count } = await getData(page);

const POST_PER_PAGE = 2;

const hasPrev = POST_PER_PAGE * (page - 1) > 0;
const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;
```

`Post` 에 쿼리를 요청할 때, 쿼리가 **_총 2번_** 나가야 한다.

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

> where 절안에 카테고리가 파라미터로 넘어왔을 때만 검색되도록 한다.

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

### swr 이용 - 댓글 검색

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

// /components/comment/Comments.jsx
import useSWR from 'swr';

const fetcher = async (url) => {
	const res = await fetch(url);

	const data = await res.json();

	if (!res.ok) {
		const error = new Error(data.message);
		throw error;
	}

	return data;
};

const Comments = ({ postSlug }) => {
	// ...
	const { data, mutate, isLoading } = useSWR(
		`http://localhost:3000/api/comments?postSlug=${postSlug}`,
		fetcher
	);
	const [desc, setDesc] = useState('');

	const handleSubmit = async () => {
		await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({ desc, postSlug }),
		});
		mutate();
	};

	return (
		// ...
	)
}
```

### 댓글 작성

```javascript
const Comments = ({ postSlug }) => {
	const { status } = useSession();

	const { data, mutate, isLoading } = useSWR(
		`http://localhost:3000/api/comments?postSlug=${postSlug}`,
		fetcher
	);

	const [desc, setDesc] = useState('');

	const handleSubmit = async () => {
		await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({ desc, postSlug }),
		});
		mutate();
	};
};
```

swr 에서 제공하는 `mutate` 를 사용했다.

`const data = mutate(key, data, option);`

swr, tanstack 등 로컬 캐시를 관리하는 라이브러리 중 가장 중요한 것이 언제 이전 캐시를 날리고 새로운 데이터로 업데이트 할 건가? 인 것 같다.

`mutate` 인자 중 첫번째 key 값으로 대상을 지목한다.

위 상황처럼 `mutate()` 로 작성하면, fetch 작업과 동시에 데이터를 revalidate 한다고 한다. 공식문서를 보면, 이미 data 라는 객체로 pre-bound 되어 있기 때문에 굳이 적어주지 않아도 된다고 한다.

[관련 블로그](https://velog.io/@sinclairr/next-swr-2) 를 보고 배울 수 있었다.

### 게시글 삭제(추가)

간단한 CRUD 작업 중 삭제 에서 잠시 막혔다. 삭제버튼을 따로 컴포넌트로 만들었다.

```javascript
// components/deleteButton/DeleteButton.jsx
const DeleteButton = ({ slug }) => {
	const router = useRouter();
	const handleDelete = async (slug) => {
		try {
			const res = await fetch(`/api/posts/${slug}`, {
				method: 'DELETE',
			});
			if (res.ok) router.push('/');
		} catch (e) {
			console.log(e);
		}
	};

	return <button onClick={() => handleDelete(slug)}>Delete this Post</button>;
};

// app/api/posts/[slug]/route.js
// DELETE A SINGLE POST
export const DELETE = async (req, { params }) => {
	const slug = params.slug;
	try {
		await prisma.post.delete({
			where: { slug },
		});
		return new NextResponse(JSON.stringify({ status: 200 }));
	} catch (err) {
		console.log(err);
		return new NextResponse(
			JSON.stringify(
				{ message: 'Something went wrong!' },
				{ status: 500 }
			)
		);
	}
};
```

여기서 하나 알게 된 사실은 ORM 의 사용목적처럼, Post 는 Comment 와 관계가 맺어져있다. 따라서 아래 오류는 당연했다.

```bash
The change you are trying to make would violate the required relation 'CommentToPost' between the `Comment` and `Post` models.
    at Cn.handleRequestError (/Users/jeongjin/Documents/Github/nextjs_blog/node_modules/@prisma/client/runtime/library.js:123:6817)
    at Cn.handleAndLogRequestError (/Users/jeongjin/Documents/Github/nextjs_blog/node_modules/@prisma/client/runtime/library.js:123:6206)
    at Cn.request (/Users/jeongjin/Documents/Github/nextjs_blog/node_modules/@prisma/client/runtime/library.js:123:5926)
    at async l (/Users/jeongjin/Documents/Github/nextjs_blog/node_modules/@prisma/client/runtime/library.js:128:9968)
    at async DELETE (webpack-internal:///(rsc)/./app/api/posts/[slug]/route.js:44:9)
    at async /Users/jeongjin/Documents/Github/nextjs_blog/node_modules/next/dist/compiled/next-server/app-route.runtime.dev.js:6:62499 {
  code: 'P2014',
  clientVersion: '5.5.2',
  meta: {
    relation_name: 'CommentToPost',
    model_a_name: 'Comment',
    model_b_name: 'Post'
  }
}
```

`Spring Data Jpa` 와 형태만 다르지 기능은 동일하다.

<script src="https://gist.github.com/valorjj/3ff2ef8b41f8fcbc4033099be89c3c95.js"></script>

schema.prism 파일에서 다음 옵션을 주면된다.

```prisma
model Comment {
  id        String   @id @default(cuid()) @map("_id")
  createdAt DateTime @default(now())
  desc      String
  userEmail String
  user      User     @relation(fields: [userEmail], references: [email], onDelete: Cascade, onUpdate: Cascade)
  postSlug  String
  post      Post     @relation(fields: [postSlug], references: [slug], onDelete: Cascade, onUpdate: Cascade)
}
```

자세한 사항은 [공식문서](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/referential-actions) 를 참조하면 된다.
한가지 특이한 점은 SetNull, SetDefault 가 존재한다는 점이다. 말 그대로 참조하는 값을 Null 이나 Default 값으로 변경한다는 옵션이 존재한다는 점이 흥미로웠다.

## Vercel 배포 (진행중)

### 문제1

`prisma` 와 `mongodb` 연결이 안된다. deploy 로그를 살펴보니, production 으로 빌드할 시 `vercel-build` 명령어를 실행한다는 것을 확인했다. 따라서, 해당 명령어를 추가했다.

### 해결

```javascript
	"scripts": {
		"dev": "next dev",
		"build": "next build",
		"start": "next start",
		"lint": "next lint",
		"vercel-build": "npx prisma generate && next build"
	},
```

### 문제2

```bash
Error occurred prerendering page "/write". Read more: https://nextjs.org/docs/messages/prerender-error
```

`ReactQuill` 이라는 라이브러리를 사용하여 글 작성하는 페이지인데, 오류가 난다. 검색을 통해 `ReactQuill` 은 `document` 를 조작하는데 `Next.js` 에서 pre-rendering 되는 값이 중간에 바뀌기 때문에 오류를 출력한다.

따라서, 모든 요소가 로드된 이후에 `ReactQuill` 을 불러오도록 하면 된다. 검색을 통해 여러 방법이 있다는 것을 알게되었다.

-   `ReactQuill` 호출하는 코드를 컴포넌트로 따로 분리한다.
    -   `useMeme`, `useRef` 등을 사용한다.
    -   CSR, SSR 분리가 필요할 때는 이 방법을 사용하면 된다.
-   `next/dynamic` 를 사용한다.
    -   `React.lazy()` + `Suspense` 가 적용되어 있어, 최초 html 이 렌더링 된 이후에 요소를 불러온다.

### 해결

```javascript
const WritePage = () => {
	// ...
	const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
	// ...
	return (
		<ReactQuill
			className={styles.textArea}
			theme='bubble'
			value={value}
			onChange={setValue}
			placeholder='Tell your story...'
		/>
	);
};
```

#### 관련 메모

아래 방법은 문제를 해결하지 못했다.

```javascript
// 1.
{typeof window !== object ? ... : ...}
// 2.
{typeof document !== undefined ? ... : ...}

```

### 배포결과

document 관련 문제를 해결하니, vercel 을 통한 배포는 정상적으로 진행되었다.

```bash
Route (app)                              Size     First Load JS
┌ λ /                                    1.26 kB        97.5 kB
├ ○ /_not-found                          882 B          84.6 kB
├ λ /api/auth/[...nextauth]              0 B                0 B
├ ○ /api/categories                      0 B                0 B
├ λ /api/comments                        0 B                0 B
├ λ /api/posts                           0 B                0 B
├ λ /api/posts/[slug]                    0 B                0 B
├ λ /blog                                1.04 kB        97.3 kB
├ ○ /login                               1 kB           95.7 kB
├ λ /posts/[slug]                        6.93 kB         114 kB
└ ○ /write                               20.9 kB         121 kB
```

### 문제3 (해결중)

마지막 관문으로, `next-auth` 적용이 문제였다. 소셜 로그인을 위해 `process.env.NEXTAUTH_URL`, `process.env.NEXTAUTH_SECRET` 두 환경변수를 넘겨줘야 했다. `valorjj-code.vercel.app` 로 도메인을 하나 생성하고, 구글의 redirect url, NEXTAUTH_URL 에도 포함시켰다.

```bash
Application error: a server-side exception has occurred (see the server logs for more information).
Digest: 956933652
```

#### 공식문서 참고

[배포 관련 공식문서](https://next-auth.js.org/deployment) 를 다시 읽었다.

여기서 알려주는 사실은 다음과 같다

-   `NEXTAUTH_URL` 이 더 이상 필요하지 않다.
-   `NEXTAUTH_SECRET` 에는 `base64` 로 인코딩된 값이 필요하다.
    -   `openssl rand -base64 32` 터미널에서 입력하거나
    -   [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32) 해당 주소를 방문하면 얻을 수 있다.
    -   예제는 [깃허브 링크](https://github.com/nextauthjs/next-auth-example) 에서 확인할 수 있다.

그러나 여전히 문제는 그대로이다.
