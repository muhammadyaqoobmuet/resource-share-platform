
import { Link } from 'react-router-dom'
import {Button} from './ui/button'

function NavBar() {
  return (
    <div className='max-w-[1350px]  mx-auto    border-b py-2 '>
      <div className='flex  items-center'>
            <div className='left-logos flex w-full justify-between pl-4'>
                <div className='logo '>
            <Link to="/"><img className='w-[150px]' src='./public/images/Logo.png'/></Link>
                </div>
               
                <div className='right-side flex gap-4'>
            <Link to="login"> <Button className="px-6 text-black bg-transparent tracking-wide border hover:text-white border-black">Login</Button></Link>   
            <Link to="signup"><Button className="px-4">Sign Up</Button></Link>
                </div>
            </div>
      </div>
    </div>
  )
}

export default NavBar
