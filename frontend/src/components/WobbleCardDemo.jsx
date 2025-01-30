import { WobbleCard } from "./ui/WobbleCard";



export function WobbleCardDemo() {
    return (
        (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 max-w-5xl mx-auto w-full p-4">
                <WobbleCard
                    containerClassName="col-span-1 lg:col-span-2 bg-pink-800 min-h-[200px]"
                    className=""
                >
                    <div className="max-w-md">
                        <h2 className="text-left text-balance text-lg md:text-xl font-semibold text-white">
                            Campus Resource Exchange Hub
                        </h2>
                        <p className="mt-2 text-left text-sm text-neutral-200">
                            Join thousands of students sharing resources and building community
                            through our collaborative platform.
                        </p>
                    </div>
                </WobbleCard>

                <WobbleCard containerClassName="col-span-1 min-h-[150px] ">
                    <h2 className="text-left text-balance text-lg md:text-xl font-semibold text-white">
                        Simple Rules, Big Impact
                    </h2>
                    <p className="mt-2 text-left text-sm text-neutral-200">
                        Share responsibly, respect others' materials, and maintain academic integrity
                        in all exchanges.
                    </p>
                </WobbleCard>

                <WobbleCard
                    containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[100px] "
                >
                    <div className="max-w-full">
                        <h2 className="text-left text-balance text-lg md:text-xl font-semibold text-white">
                            Join Our Academic Community Today!
                        </h2>
                        <p className="mt-2 text-left text-sm text-neutral-200">
                            Connect with peers, access shared resources, and enhance your academic
                            journey through collaborative learning.
                        </p>
                    </div>
                </WobbleCard>
            </div>
        )
    );
}
