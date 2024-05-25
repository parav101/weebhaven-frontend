
import { useState,useEffect } from "react"

type ImageSliderProps={
    imageUrls:string[]
}

export function ImageSlider({imageUrls}:ImageSliderProps){
    const[imageIndex,setImageIndex] = useState(0);

    function showNextImage(){
        setImageIndex((currentIndex=>{
            if(currentIndex===imageUrls.length -1) return 0
            else return currentIndex +1
        })) 
    }
    function showPervImage(){
        setImageIndex((currentIndex=>{
            if(currentIndex===0) return imageUrls.length -1
            else return currentIndex -1
        }))
    }

    useEffect(() => {
        setInterval(() => {
            setImageIndex((currentIndex=>{
                if(currentIndex===imageUrls.length -1) return 0
                else return currentIndex +1
            })) 
       }, 5000);
       }, []);


    return (
        <div>
        <div
        className={`flex transition ease-in-out  duration-700`}
        style={{
          transform: `translateX(-${imageIndex * 100}%)`,
        }}
      >
        {imageUrls.map((url)=>{
            return <img src={url} className="md:w-screen  md:h-screen flex-shrink-0 flex-grow-0 block object-cover "/>
        })}
        </div>
        {/* <img src={imageUrls[imageIndex]}/> */}
        <button type="button" onClick={showPervImage} className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/60 group-focus:ring-4 group-focus:ring-white group-focus:outline-none transition-colors duration-500">
            <svg className="w-4 h-4 text-black rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" onClick={showNextImage} className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/60 group-focus:ring-4 group-focus:ring-white group-focus:outline-none transition-colors duration-500">
            <svg className="w-4 h-4 text-black rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
    </div>)
}