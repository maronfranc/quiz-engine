interface Props {
  title: string;
  paragraph: string;
  backgroundImage: string;
}

function Parallax({ title, paragraph, backgroundImage }: Props) {
  return (
    <div
      className="parallax-section "
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="background-tube-tv-effect"> </div>

      <div className="content">
        <h1 className="readable-text">{title}</h1>
        <p className="readable-text">{paragraph}</p>
      </div>
    </div>
  );
}

export default Parallax;
