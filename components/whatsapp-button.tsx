"use client"

export default function WhatsappButton() {
  return (
    <div className="fixed bottom-8 right-8 z-40">
      <a
        href="https://wa.me/+919970501128?text=Enquiry for more details"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
        aria-label="Chat on WhatsApp"
      >
        <div className="absolute inset-0 w-16 h-16 rounded-full animate-ping opacity-75"
            style={{ background: '#30534A' }} />
        <div className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
            style={{ background: '#30534A' }}>
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.52 3.48A11.873 11.873 0 0012 .5C6.201.5 1.5 5.2 1.5 11c0 1.937.513 3.813 1.489 5.474L.5 23.5l6.17-1.62A11.471 11.471 0 0012 22.5c5.799 0 10.5-4.7 10.5-10.5 0-2.82-1.1-5.476-3.98-7.52zM12 20.5c-1.37 0-2.71-.36-3.9-.99l-.28-.15-3.68.97.99-3.57-.18-.29A8.709 8.709 0 013.5 11c0-4.7 3.8-8.5 8.5-8.5 4.7 0 8.5 3.8 8.5 8.5 0 4.7-3.8 8.5-8.5 8.5zM17.03 14.47c-.26-.13-1.54-.76-1.78-.85-.24-.09-.42-.13-.6.13-.18.26-.7.85-.86 1.03-.16.18-.32.2-.59.07-.26-.13-1.1-.41-2.1-1.29-.78-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.07-.13-.6-1.43-.82-1.97-.22-.52-.44-.45-.6-.46l-.51-.01c-.17 0-.45.06-.69.32-.24.26-.92.9-.92 2.2 0 1.3.94 2.55 1.07 2.73.13.18 1.85 2.95 4.48 4.03 3.13 1.29 3.13.86 3.69.8.56-.06 1.78-.72 2.03-1.41.25-.69.25-1.28.18-1.41-.07-.13-.26-.21-.53-.34z" />
          </svg>
        </div>
      </a>
    </div>
  )
}