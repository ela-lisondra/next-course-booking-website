import Banner from '../components/Banner'
import Highlights from '../components/Highlights'


export default function Home() {

  const data = {
    title: "Zuitt Next Booking",
    content: "Opportunities for everyone, everywhere",
    destination: "/",
    label: "Enroll Now!"
  }
  return (
          <>
            <Banner dataProp={data} />
            <Highlights />
          </>
  )
}
