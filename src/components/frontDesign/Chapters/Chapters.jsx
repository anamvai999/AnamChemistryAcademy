import Image from "next/image"

const Page = ({chapter}) => {
  return (
    <div>
      <div className="flex items-center justify-center flex-wrap gap-3 p-5">
        <div class="card card-compact w-72 bg-base-100 shadow-xl">
          <figure>
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
      </div>
    </div>
  )
}

export default Page