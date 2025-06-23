export default function Footer() {
  return (
    <footer className="grid grid-cols-5 p-4 bg-white text-black min-h-[180px] mt-25 shadow-2xl">
      <div className="col-span-2 flex justify-center items-center text-xl font-medium">
      </div>
      <div className="col-span-1 flex flex-col justify-center items-center">
        <p>&copy; {new Date().getFullYear()} WBS Coding School</p>
      </div>
      <div className="col-span-2 flex flex-col justify-center items-start ml-10 font-medium space-x-2 text-left">
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
        </a>.
        Code on{' '}
        <a
          href="https://github.com/Vaeshkar/project07_10hours"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#6153CC] underline underline-[#6153CC] hover:no-underline transition-all duration-400 ease-out"
        >
          GitHub
        </a>.
        </p>
      </div>
    </footer>
  );
}