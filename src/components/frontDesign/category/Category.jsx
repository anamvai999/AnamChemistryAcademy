
import Image from "next/image";
import Link from "next/link";

import EditCategory from "../EditCategory/EditCategory";

const Category = ({ data, refetch }) => {
  console.log(data);

  return (
    <div className="card card-compact pb-4 w-[80vw] md:w-60 bg-base-100 shadow-xl">
      <Link href={`/category/${data.slug}`}>
        <figure className="h-40">
          <Image
            src={`${data?.thumbnail}`}
            alt={`${data.title} image`}
            width={500}
            height={500}
            class="transition-transform duration-300 transform hover:scale-105"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{data?.title}</h2>
        </div>
      </Link>
     <EditCategory refetch={refetch} data={data}/>
    </div>
  );
};

export default Category;
