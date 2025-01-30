import { Loader } from 'lucide-react'


function GenralLoader() {
    return (
        <div className="w-screen h-screen flex items-center justify-center" aria-live="polite" aria-busy="true">
            <Loader className="animate-spin text-blue-600" size={64} />
            <span className="sr-only">Loading resources...</span>
        </div>
    )
}

export default GenralLoader
