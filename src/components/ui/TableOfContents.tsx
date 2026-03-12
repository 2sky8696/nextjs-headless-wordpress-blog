type Heading = {
  id:string;
  text:string;
  level:number;
}

export default function TableOfContents({headings}:{headings:Heading[]}){

  return(
    <nav className="toc">
      <p className="toc-title">目次</p>

      <ul>
        {headings.map((heading)=> (
          <li key={heading.id} className={`toc-h${heading.level}`}>
            <a href={`#${heading.id}`}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}