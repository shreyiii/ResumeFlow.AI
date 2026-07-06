import react from 'react';
const Footer = () => {
  return (
    <>
<footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 text-gray-300 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 mt-40 border-t border-slate-700 shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12">
                        
                        <div className="lg:col-span-3 space-y-6">
                            <a href="#" className="block">
                                <img src="/logo.svg" alt="logo" className="w-28 h-auto" />
                            </a>
                            <p className="text-sm/6 text-green-300 max-w-96">Build ATS-friendly resumes with AI-powered optimization, background removal, and professional templates in minutes.</p>
                            <div className="flex gap-5 md:gap-6 order-1 md:order-2">
                                {/* X (Twitter) */}
                                <a href="https://x.com/_shreyiii" target="_blank"
    rel="noopener noreferrer"className="text-white hover:text-green-800">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                    </svg>
                                </a>
                                {/* Github */}
                                <a href="https://github.com/shreyiii"target="_blank"
    rel="noopener noreferrer" className="text-white hover:text-green-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
                                    </svg>
                                </a>
                                {/* Linkedin */}
                                <a href="https://www.linkedin.com/in/shrey-srivastava27/" target="_blank"
    rel="noopener noreferrer" className="text-white hover:text-green-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                                    </svg>
                                </a>
                                {/* Youtube */}
                                <a href="https://www.youtube.com/@ShreySrivastava-r2y" target="_blank"
    rel="noopener noreferrer" className="text-white hover:text-green-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>
                                    </svg>
                                </a>
                                {/* Instagram */}
                                <a href="https://www.instagram.com/_shrey.iii?igsh=dmlvcXFjN243OGlv" target="_blank"
    rel="noopener noreferrer"className="text-white hover:text-green-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-28 items-start">
                            {/* Products */}
                            <div>
                                <h3 className="font-medium text-sm mb-4 hover:text-orange-800">Products</h3>
                                <ul className="space-y-3 text-sm text-neutral-300">
    <li><a href="/app" className="hover:text-green-400 transition">Resume Builder</a></li>
    <li><a href="#templates" className="hover:text-green-400 transition">Resume Templates</a></li>
    <li><a href="#" className="hover:text-green-400 transition">Cover Letter Builder</a></li>
    <li><a href="#" className="hover:text-green-400 transition">AI Resume Optimizer</a></li>
</ul>
                            </div>

                            {/* Resources */}
                            <div>
                                <h3 className="font-medium text-sm mb-4 hover:text-orange-800">Resources</h3>
                                <ul className="space-y-3 text-sm text-neutral-300">
    <li><a href="#" className="hover:text-green-400 transition">Resume Writing Guide</a></li>
    <li>
        <a href="#testimonial" className="hover:text-green-400 transition">
            Career Tips
        </a>
    </li>
    <li><a href="#" className="hover:text-green-400 transition">AI Background Remover</a></li>
    <li><a href="#" className="hover:text-green-400 transition">PDF Export</a></li>
</ul>
                            </div>

                            {/* Company */}
                            <div className="col-span-2 md:col-span-1">
                                <h3 className="font-medium text-sm mb-4 hover:text-orange-800">Company</h3>
                                <ul className="space-y-3 text-sm text-neutral-300">
    <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
    <li><a href="#cta" className="hover:text-green-400 transition">Contact Us</a></li>
    <li><a href="#" className="hover:text-green-400 transition">Privacy Policy</a></li>
    <li><a href="#" className="hover:text-green-400 transition">Terms & Conditions</a></li>
    <li><a href="#" className="hover:text-green-400 transition">Support</a></li>
</ul>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto mt-12 pt-4 border-t border-neutral-700 flex justify-between items-center">
                        <p className="text-neutral-400 text-sm">© 2026 Resume Builder</p>
                        <p className='text-sm text-neutral-400'>All right reserved.</p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 bg-green-500 rounded-full blur-[170px] pointer-events-none"/>
                        <h3 className="text-center font-extrabold leading-[0.7] text-transparent text-[clamp(3rem,15vw,15rem)] [-webkit-text-stroke:1px_#0D542B] mt-6" >
                            Resume Builder
                        </h3>
                    </div>
                </footer>
        <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }
                `}
            </style>
        
    </>
  );
}

export default Footer