export default function Footer() {
  return (
    <footer className="grid grid-cols-5 p-4 bg-white text-black min-h-[180px] mt-25">
      <div className="col-span-3 flex justify-center items-center text-xl font-medium">
        {/* You can put content here if you want */}
      </div>
      <div className="col-span-2 flex flex-col justify-center items-start ml-10 text-xl font-medium space-x-2 text-left">
        <p>© 2025 WBS Coding School</p>
        <p>Projects hosted on{' '}<a
          href="https://wbseventapi.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#6153CC] underline underline-[#6153CC] hover:no-underline transition-all duration-400 ease-out"
        >
          Netlify
        </a>{' '}
        and{' '}
        <a
          href="https://wbseventapi-be67e7cfc6b5.herokuapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#6153CC] underline underline-[#6153CC] hover:no-underline transition-all duration-400 ease-out"
        >
          Heroku
        </a>
        .</p>
        <p>Code on{' '}
        <a
          href="https://github.com/Vaeshkar/project07_10hours"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#6153CC] underline underline-[#6153CC] hover:no-underline transition-all duration-400 ease-out"
        >
          GitHub
        </a>.</p>
      </div>
    </footer>
  );
}