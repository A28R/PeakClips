
import { X } from "react-feather"

// eslint-disable-next-line react/prop-types
export default function Modal({ open, onClose, children }) {
  
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/80" : "invisible"}
        ${open ? "overflow-hidden" : "overflow-auto"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-gray-800 rounded-xl shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-300 bg-gray-900 hover:text-gray-100"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  )
}