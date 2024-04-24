import Image from "next/image"

const page = () => {
  return (
    <div>
      <div className="flex items-center justify-center flex-wrap gap-3 p-5">
        <div class="card card-compact w-72 bg-base-100 shadow-xl">
          <figure>
            <Image
              src="https://anamhasan.web.app/static/media/p1-c1.92f262763484cb0ffefa.png"
              alt="Title"
              width={500}
              height={500}
              class="transition-transform duration-300 transform hover:scale-105" />
          </figure>
          <div class="card-actions justify-around p-3">
            <h2 class="card-title">Chapter - 1</h2>
            <p>Paper - 1</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page