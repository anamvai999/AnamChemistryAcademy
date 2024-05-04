import Image from "next/image";
import Link from "next/link";

const Category = ({data}) => {
    console.log(data);


    return (
        <Link href={`/category/${data.slug}`} className="flex items-center justify-center flex-wrap gap-3 p-5">
            <div class="card card-compact w-72 bg-base-100 shadow-xl">
                <figure>
                    <Image
                        src={`${data?.thumbnail}`}
                        alt={`${data.title} image`}
                        width={500}
                        height={500}
                        class="transition-transform duration-300 transform hover:scale-105" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{data?.title}</h2>
                </div>
            </div>
        </Link>
    )
}

export default Category;