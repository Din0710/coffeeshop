import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import Layout from '../../components/Layout'
import data from '../../utils/data'
import { Store } from '../../utils/Store'

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store)
  const router = useRouter()

  const { query } = router
  const { slug } = query
  const product = data.products.find((x) => x.slug === slug)

  if (!product) {
    return <div>Product Not Found!</div>
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (product.countInStock < quantity) {
      alert('Sorry. product is out of stock. 상품이 떨어졌습니다...')
      return
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })

    router.push('/cart')
  }

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Bolimlar: {product.category} </li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Batafsil: {product.description}</li>
          </ul>
        </div>

        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Narx</div>
              <div>${product.price}</div>
            </div>

            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Savatga olish
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
