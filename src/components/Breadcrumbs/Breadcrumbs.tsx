import { Fragment } from 'react'
import { Link } from 'react-router-dom'

interface BreadcrumbProps {
  links: { name: string, path: string }[],
  current: string
}

export default function Breadcrumbs({ links, current }: BreadcrumbProps) {
  return (
    <div className='flex items-center gap-2 text-sm h-[40px] text-[#808089]'>
      {links.map((link, index) => (
        <Fragment key={index}>
          <Link to={link.path}>{link.name}</Link>
          <span className='icon icon-next'>
            <svg width={6} height={11} viewBox='0 0 6 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fill='#808089'
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L6.35355 5.64645C6.54882 5.84171 6.54882 6.15829 6.35355 6.35355L1.35355 11.3536C1.15829 11.5488 0.841709 11.5488 0.646447 11.3536C0.451184 11.1583 0.451184 10.8417 0.646447 10.6464L5.29289 6L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z'
              />
            </svg>
          </span>
        </Fragment>
      ))}
      <span className='text-[#38383d]'>{current}</span>
    </div>
  )
}
