const Hamburger = () => (
  <div>
    <svg className="hamburgerIcon" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" version="1.1" x="0px" y="0px">
      <title>Icon/Stroke/Hamburger</title>
      <desc>Created with Sketch.</desc>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24" />
        <path d="M4.5,17.5 L19.5,17.5" stroke="#000000" strokeLinecap="square" />
        <path d="M4.5,6.5 L19.5,6.5" stroke="#000000" strokeLinecap="square" />
        <path d="M4.5,12 L19.5,12" stroke="#000000" strokeLinecap="square" />
      </g>
    </svg>

    <style jsx>{`
      .hamburgerIcon {
        width: 26px;
        height: 26px;
      }
    `}</style>
  </div>
)

export default Hamburger