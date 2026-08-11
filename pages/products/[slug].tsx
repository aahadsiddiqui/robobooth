import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import ProductLayout from '../../components/ProductLayout'
import RobotBoothPage from '../../components/RobotBoothPage'
import { ProductData, products } from '../../data/products'

type ProductPageProps = {
  product: ProductData
}

export default function ProductPage({ product }: ProductPageProps) {
  const isPremium = product.slug === 'premium-photobooth'
  const isRobot = product.slug === 'robot-photobooth'

  // Robot Photobooth gets its own custom high-conversion page
  if (isRobot) {
    return (
      <>
        <Head>
          <title>Robot Photobooth | Canada&apos;s First Robot Photobooth | Robo Booth</title>
          <meta name="description" content="Canada's first robot photobooth that roams your event, engages guests, and captures studio-quality photos anywhere. No booth setup, no venue requirements. Reserve your date now." />
          <meta property="og:title" content="Robot Photobooth | Robo Booth" />
          <meta property="og:description" content="The robot photobooth that comes to your guests. Canada's first." />
          <meta property="og:type" content="website" />
        </Head>
        <RobotBoothPage />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{product.name} | Robo Booth Product Hub</title>
        <meta name="description" content={product.summary} />
        <meta property="og:title" content={`${product.name} | Robo Booth`} />
        <meta property="og:description" content={product.summary} />
        <meta property="og:type" content="website" />
      </Head>
      <ProductLayout
        name={product.name}
        tagline={product.tagline}
        summary={product.summary}
        priceLabel={product.priceLabel}
        priceNote={product.priceNote}
        badges={product.badges}
        usp={product.usp}
        videoUrl={product.videoUrl}
        productImage={product.productImage}
        faqData={product.faqData}
        testimonials={product.testimonials}
        belowHeroContent={isPremium ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                Premium Photobooth Overview
              </h2>
              <p className="text-white/70">
                The Premium Photobooth delivers a sleek, compact setup with studio lighting and instant sharing. Perfect for elegant events where space is tight but quality still matters.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-black w-full aspect-video max-h-[360px]">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                preload="metadata"
              >
                <source src="/videos/premiumphoto.mov" type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        ) : undefined}
      />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: products.map((product) => ({ params: { slug: product.slug } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<ProductPageProps> = async (context) => {
  const slug = context.params?.slug as string
  const product = products.find((item) => item.slug === slug)

  if (!product) {
    return { notFound: true }
  }

  return {
    props: {
      product
    }
  }
}

