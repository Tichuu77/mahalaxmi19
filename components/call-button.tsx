"use client"

export default function CallButton() {
    const url = "tel:+919970501128"

    return (
        <div className="fixed bottom-8 left-8 z-40">
            <a href={url} className="relative group" aria-label="Call">
                <div className="absolute inset-0 w-16 h-16 rounded-full animate-ping opacity-75"
                    style={{ background: '#30534A' }} />
                <div className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
                    style={{ background: '#30534A' }}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                </div>
            </a>
        </div>
    )
}