'use client'
import { OverlayProps } from '@/lib/definitions'

export default function Overlay({panelActive, onClick}: OverlayProps){
    const rightPanelActive = panelActive;
    return (
        <div
        className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-[100] transition-transform duration-500 ${
          rightPanelActive ? '-translate-x-full' : ''
        }`}
      >
        <div
          className={`bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] text-white absolute left-[-100%] w-[200%] h-full transition-transform duration-500 ${
            rightPanelActive ? 'translate-x-1/2' : 'translate-x-0'
          }`}
        >
          <div
            className={`absolute flex flex-col justify-center items-center text-center px-10 h-full w-1/2 transition-transform duration-500 ${
              rightPanelActive ? 'translate-x-0' : '-translate-x-[20%]'
            }`}
          >
            <h1 className="font-bold text-2xl">Bem Vindo!</h1>
            <p className="text-sm mt-4 mb-6">To keep connected with us please login with your personal info</p>
            <button
              onClick={() => onClick(false)}
              className="bg-transparent border border-white text-white font-bold text-xs py-3 px-12 rounded-full uppercase"
            >
              Sign In
            </button>
          </div>
          <div
            className={`absolute right-0 flex flex-col justify-center items-center text-center px-10 h-full w-1/2 transition-transform duration-500 ${
              panelActive ? 'translate-x-[20%]' : 'translate-x-0'
            }`}
          >
            <h1 className="font-bold text-2xl">Hello, Friend!</h1>
            <p className="text-sm mt-4 mb-6">Enter your personal details and start journey with us</p>
            <button
              onClick={() => onClick(true)}
              className="bg-transparent border border-white text-white font-bold text-xs py-3 px-12 rounded-full uppercase"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    )
}