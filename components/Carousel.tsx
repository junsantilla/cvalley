import Image from "next/image"
import templateData from "../data/templateData"

function Carousel() {
    return (
        <>
            <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
            <section className="w-full py-24 bg-slate-300">
                <div className="flex justify-center">
                    <div className="px-10 w-full max-w-screen-xl ">
                        <div className="flex flex-col header mb-8 text-center">
                            <h2 className="text-2xl md:text-4xl mb-3">
                                📝 Choose <span className="font-bold">Templates</span>
                            </h2>
                            <div className="max-w-sm md:max-w-full self-center">
                                <p className="font-semibold text-slate-700 text-lg">Discover our curated templates, and stay tuned as we regularly adding new designs.</p>
                            </div>
                        </div>

                        <div className="md:hidden max-w-sm">
                            <swiper-container slides-per-view="1" pagination="true">
                                {templateData.map((card, index) => (
                                    <swiper-slide key={index}>
                                        <div className="p-3 pb-12">
                                            <Image src={card.imageURL} alt={`Preview of ${card.title}`} width={500} height={500} />
                                        </div>
                                    </swiper-slide>
                                ))}
                            </swiper-container>
                        </div>
                        <div className="hidden md:block">
                            <swiper-container slides-per-view="3" pagination="true">
                                {templateData.map((card, index) => (
                                    <swiper-slide key={index}>
                                        <div className="p-3 pb-12">
                                            <Image src={card.imageURL} alt={`Preview of ${card.title}`} width={500} height={500} />
                                        </div>
                                    </swiper-slide>
                                ))}
                            </swiper-container>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Carousel
