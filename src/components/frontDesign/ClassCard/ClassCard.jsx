import Image from "next/image";

const ClassCard = () => {
    return (
        <div className='flex flex-col  gap-3 justify-center items-center pt-5'>
            <div className="card sm:card-side  w-72 sm:w-[90vw] bg-base-100 shadow-xl">
                <figure className='sm:w-[20vw] '>
                    <Image
                        className='rounded'
                        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                        width={500}
                        height={500}
                        />
                </figure>
                <div className="card-body ">
                    <div className='flex justify-between'>
                        <p>class -1</p>
                        <p className='text-end'>10 Oct 2023</p>
                    </div>
                    <h2 className="card-title">
                        মোলের সূত্র সংক্রান্ত গাণিতিক সমস্যাবলী - 2
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