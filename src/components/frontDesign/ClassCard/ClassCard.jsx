import Image from "next/image";

const ClassCard = ({singleClass, classNo}) => {
    return (
        <div className='flex flex-col  gap-3 justify-center items-center pt-5'>
            <div className="card sm:card-side  w-72 sm:w-[90vw] bg-base-100 shadow-xl">
                <figure className='sm:w-[20vw] '>
                    <Image
                        className='rounded'
                        src={singleClass.thumbnail}
                        alt={singleClass.title}
                        width={500}
                        height={500}
                        />
                </figure>
                <div className="card-body ">
                    <div className='flex justify-between'>
                        <p>class - {classNo}</p>
                        <p className='text-end'>{singleClass.uploadDate}</p>
                    </div>
                    <h2 className="card-title">
                        {singleClass.title}
                    </h2>
                    <div className="flex gap-1 ">
                        <div className="badge badge-outline text-xs">weapon-series</div>
                        <div className="badge badge-outline text-xs">পরিমাণগত রসায়ন</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ClassCard;