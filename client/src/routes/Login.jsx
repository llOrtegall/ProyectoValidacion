import { useState } from 'react'
// import { CardRegisAndLogin } from '../Components/CardRegisAndLogin.jsx'
import { RegisterForm } from '../Components/RegisterForm.jsx'
import { LoginForm } from '../Components/LoginForm.jsx'
import './Login.css'

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true)

  function handleClik () {
    setIsLogin(true)
  }

  return (
    <section className='flex items-center justify-center w-full h-full gap-12 section_main'>
      {/* <CardRegisAndLogin handleChange={() => setIsLogin(!isLogin)} /> */}
      {isLogin ? (<LoginForm />) : (<RegisterForm fun={handleClik} />)}
    </section>
  )
}
