import Image from "next/image";

const Category = () => {
    return (
        <div className="flex items-center justify-center flex-wrap gap-3 p-5">
            <div class="card card-compact w-72 bg-base-100 shadow-xl">
                <figure>
                    <Image
                        src="https://anamhasan.web.app/static/media/weapon-series.5c7cc145a72a6e171fda.png"
                        alt="Title"
                        width={500}
                        height={500}
                        class="transition-transform duration-300 transform hover:scale-105" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">Weapon Series (Only Engineering)</h2>
                </div>
            </div>
        </div>
    )
}

export default Category;