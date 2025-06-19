export default function Footer() {


  return (
    <footer className="p-4 bg-gray-800 text-white flex flex-col items-center space-y-4">

      <div className="text-sm text-white text-center">
        © 2025 WBS Coding School | Projects hosted on{' '}
        <a
          href="https://wbseventapi.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-yellow-300"
        >
          Netlify
        </a>{' '}
        and{' '}
        <a
          href="https://wbseventapi-be67e7cfc6b5.herokuapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-yellow-300"
        >
          Heroku
        </a>
        . Code on{' '}
        <a
          href="https://github.com/Vaeshkar/project07_10hours"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-yellow-300"
        >
          GitHub
        </a>.
      </div>
    </footer>
  );
}