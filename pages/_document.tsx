import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/logo/favicon.svg" />

				{/* SEO */}
				<meta name="keyword" content={'modu, modu.uz, modu design, modu furnitura'} />
				<meta
					name={'description'}
					content={
						'Professional sellers and dealers can sell furniture, and any customers can buy it in South Korea. Best furniture at best prices on modu.uz | ' +
						'Профессиональные продавцы и дилеры могут продавать мебель, a любые клиенты могут покупать её в Южной Корее. Лучшая мебель по лучшим ценам на modu.uz | ' +
						'대한민국에서 가구는 전문 판매자와 딜러가 판매할 수 있으며, 어떤 고객이든 구매할 수 있습니다. Modu.uz에서 최적의 가격으로 최고의 가구를 만나보세요'
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
