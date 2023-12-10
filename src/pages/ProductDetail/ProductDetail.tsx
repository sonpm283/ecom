import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'

export default function ProductDetail() {
  const [activeImage, setActiveImage] = useState<string>('')
  const [currentIndexImages, setCurrentIndexImages] = useState<number[]>([0, 5])
  const { nameId } = useParams()

  const { data: productDetailData } = useQuery({
    queryKey: ['product', nameId],
    queryFn: () => {
      return productApi.getProductDetail(nameId as string)
    }
  })

  const product = productDetailData?.data.data

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  const handleActiveImage = (image: string) => {
    setActiveImage(image)
  }

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  return (
    <div className='container'>
      <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-4'>
          <div className='flex flex-col'>
            <div className='relative pt-[100%] rounded-md overflow-hidden border border-x-gray-200'>
              <img
                src={activeImage}
                alt={product?.name}
                className='absolute top-0 left-0 right-0 bottom-0 object-cover w-full h-full'
              />
            </div>
            <div className='flex gap-2 mt-2'>
              {currentImages.map((img) => {
                const isActive = img === activeImage
                return (
                  <div key={img} className='relative flex-1' onMouseEnter={() => handleActiveImage(img)}>
                    <img src={img} alt='' />
                    {isActive && <div className='absolute inset-0 border-2 border-primary rounded-sm'></div>}
                    {!isActive && <div className='absolute inset-0 border border-gray-200 rounded-sm'></div>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='col-span-5'>Content</div>
        <div className='col-span-3'>Order</div>
      </div>
    </div>
  )
}
