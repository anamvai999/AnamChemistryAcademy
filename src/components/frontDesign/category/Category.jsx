import Image from "next/image";
import Link from "next/link";

const Category = ({ data }) => {
    console.log(data);


    return (
        <Link href={`/category/${data.slug}`}
            >
            <div className="card card-compact w-[80vw] md:w-60 bg-base-100 shadow-xl">
                <figure className="h-40">
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