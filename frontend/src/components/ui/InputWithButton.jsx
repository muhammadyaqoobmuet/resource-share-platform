import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InputWithButton() {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input className='bg-[#262D3E]/10 outline-1' type="email" placeholder="Email" />
            <Button className="bg-black text-white rounded-none" type="submit">Subscribe</Button>
        </div>
    )
}
