import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Page = ({ chapter }) => {

  const url = usePathname();
  console.log(url);

  return (
    <Link href={`${url}/${chapter.slug}`}>
      <p>hello</p>
      <div className="card card-compact w-[80vw] md:w-60 bg-base-100 shadow-xl">
        <figure className="h-40">
          <Image
            src={chapter.thumbnail}
            alt="Title"
            width={500}
            height={500}
            class="transition-transform duration-300 transform hover:scale-105" />
        </figure>
        <div class="card-actions justify-around p-3">
          <h2 class="card-title">{chapter.title}</h2>
          {/* <p>{chapter.paper}</p> */}
        </div>
      </div>

    </Link>
  )
}

export default Page