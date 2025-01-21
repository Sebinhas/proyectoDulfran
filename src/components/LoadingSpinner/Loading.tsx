import { PiSpinnerBold } from 'react-icons/pi'

const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-700 text-center">
          <PiSpinnerBold className="w-12 h-12 animate-spin spin-slow text-gray-700 mx-auto mb-4" />
          {/* <p className="text-xl font-light">Cargando...</p> */}
        </div>
      </div>
  )
}

export default Loading
