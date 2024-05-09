
import dynamic from 'next/dynamic'

const Video = dynamic(() => import('@/components/frontDesign/video/Video'), { ssr: false })
const page = () => {

    return (
        <div>
            <Video />
        </div>
    )
}

export default page