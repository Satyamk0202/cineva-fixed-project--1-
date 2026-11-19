import { useMemo, useState } from 'react'

const IMG = 'https://image.tmdb.org/t/p/'
const movies = [
  {id:1,title:'Stranger Things',year:2025,rating:'TV-MA',duration:'4 Seasons',genre:'Sci-Fi',match:'98%',type:'Series',poster:'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',backdrop:'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',description:'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',tag:'#1 in TV Shows'},
  {id:2,title:'The Queen’s Gambit',year:2020,rating:'TV-MA',duration:'1 Season',genre:'Drama',match:'96%',type:'Series',poster:'https://image.tmdb.org/t/p/w500/zU0htwkhCqb0bZJtX1tw4g2Zp7g.jpg',description:'Orphaned at a young age, a chess prodigy struggles with addiction in a quest to become the greatest player in the world.'},
  {id:3,title:'Wednesday',year:2022,rating:'TV-14',duration:'2 Seasons',genre:'Fantasy',match:'99%',type:'Series',poster:'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',description:'Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends and foes at Nevermore Academy.'},
  {id:4,title:'Extraction 2',year:2023,rating:'R',duration:'2h 2m',genre:'Action',match:'94%',type:'Movie',poster:'https://image.tmdb.org/t/p/w500/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg',description:'Back from the brink of death, commando Tyler Rake embarks on a dangerous mission to save a ruthless gangster’s imprisoned family.'},
  {id:5,title:'One Piece',year:2023,rating:'TV-14',duration:'2 Seasons',genre:'Adventure',match:'97%',type:'Series',poster:'https://image.tmdb.org/t/p/w500/cMD9Y gz11zjJzAovURpO75Qg7rT.jpg'.replaceAll(' ',''),description:'With his straw hat and ragtag crew, young pirate Monkey D. Luffy goes on an epic voyage for treasure.'},
  {id:6,title:'The Witcher',year:2019,rating:'TV-MA',duration:'3 Seasons',genre:'Fantasy',match:'95%',type:'Series',poster:'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',description:'Geralt of Rivia, a mutated monster-hunter, struggles to find his place in a world where people often prove more wicked than beasts.'},
  {id:7,title:'Money Heist',year:2017,rating:'TV-MA',duration:'5 Parts',genre:'Thriller',match:'98%',type:'Series',poster:'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',description:'An enigmatic professor recruits eight criminals to carry out an ambitious plan: infiltrate the Royal Mint of Spain.'},
  {id:8,title:'Dark',year:2017,rating:'TV-MA',duration:'3 Seasons',genre:'Mystery',match:'96%',type:'Series',poster:'https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',description:'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.'},
  {id:9,title:'The Adam Project',year:2022,rating:'PG-13',duration:'1h 46m',genre:'Sci-Fi',match:'91%',type:'Movie',poster:'https://image.tmdb.org/t/p/w500/wFjboE0aFZNb sort0jY7dKpB7Y4h.jpg'.replace(' sort',''),description:'A time-traveling pilot teams up with his younger self and his late father to come to terms with his past while saving the future.'},
  {id:10,title:'Lupin',year:2021,rating:'TV-MA',duration:'3 Parts',genre:'Crime',match:'95%',type:'Series',poster:'https://image.tmdb.org/t/p/w500/sgxawbFB5Vi5OkPWQLNfl3dvkNJ.jpg',description:'Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father.'},
  {id:11,title:'All of Us Are Dead',year:2022,rating:'TV-MA',duration:'1 Season',genre:'Horror',match:'93%',type:'Series',poster:'https://image.tmdb.org/t/p/w500/pTEFqAjLd5YTsMD6NSUxV6Dq7A6.jpg',description:'A high school becomes ground zero for a zombie virus outbreak. Trapped students fight to survive — or turn into one of the infected.'},
  {id:12,title:'Glass Onion',year:2022,rating:'PG-13',duration:'2h 20m',genre:'Mystery',match:'92%',type:'Movie',poster:'https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9vxEA0iD8Z2qk7n.jpg',description:'World-famous detective Benoit Blanc heads to Greece to peel back the layers of a mystery surrounding a tech billionaire and his eclectic crew.'},
  {id:13,title:'Bridgerton',year:2020,rating:'TV-MA',duration:'3 Seasons',genre:'Romance',match:'97%',type:'Series',poster:'https://image.tmdb.org/t/p/w500/luoKpgVwi1E5nQsi7W0UuKHu2Rq.jpg',description:'The eight close-knit siblings of the Bridgerton family look for love and happiness in London high society.'},
  {id:14,title:'The Gray Man',year:2022,rating:'PG-13',duration:'2h 9m',genre:'Action',match:'89%',type:'Movie',poster:'https://image.tmdb.org/t/p/w500/8cXbitsS6dWQ5gfMTZdorpAAzEH.jpg',description:'When a shadowy CIA agent uncovers damning agency secrets, he is hunted across the globe by a sociopathic former colleague.'},
  {id:15,title:'Our Planet',year:2019,rating:'TV-G',duration:'2 Seasons',genre:'Documentary',match:'99%',type:'Series',poster:'https://image.tmdb.org/t/p/w500/2d0f9b6e4b5b9e5b.jpg',description:'Experience the beauty of our planet and examine how climate change impacts all living creatures in this ambitious documentary series.'},
]
const rows = [
  {title:'Trending Now',ids:[1,3,4,5,6,7,8,11,12,14]},
  {title:'Top 10 in India Today',ids:[7,1,3,11,5,2,4,8,10,13],rank:true},
  {title:'Continue Watching',ids:[2,6,8,10,13,15]},
  {title:'Only on Netflix',ids:[1,3,5,7,10,11,13,14]},
  {title:'Binge-worthy TV Dramas',ids:[2,6,7,8,10,13]},
  {title:'Action & Adventure',ids:[4,5,6,14,1,7]},
]
function Icon({name,size=20}) {
 const paths={
  search:<><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  bell:<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
  play:<path d="m8 5 12 7-12 7z" fill="currentColor" stroke="none"/>,
  info:<><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></>,
  plus:<path d="M12 5v14m-7-7h14"/>,
  check:<path d="m5 12 4 4L19 6"/>,
  down:<path d="m6 9 6 6 6-6"/>,
  close:<path d="m18 6-12 12M6 6l12 12"/>,
  volume:<><path d="m11 5-6 4H2v6h3l6 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7m3-10a9 9 0 0 1 0 13"/></>,
  menu:<><path d="M4 6h16M4 12h16M4 18h16"/></>,
 }
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
function PosterCard({movie,onOpen,rank}) {
 return <button className={`poster-card ${rank?'ranked':''}`} onClick={()=>onOpen(movie)} aria-label={`More info about ${movie.title}`}>
  {rank && <span className="rank-number">{rank}</span>}
  <img src={movie.poster} alt={movie.title} loading="lazy" onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src='https://placehold.co/400x600/202020/ffffff?text=CINEVA'}}/>
  <div className="poster-hover">
   <div className="poster-actions"><span className="round-play"><Icon name="play" size={16}/></span><span className="round-icon"><Icon name="plus" size={16}/></span><span className="round-icon"><Icon name="check" size={16}/></span><span className="round-icon push"><Icon name="down" size={15}/></span></div>
   <div className="poster-meta"><b>{movie.match} Match</b><span>{movie.rating}</span><span>{movie.duration}</span></div>
   <p>{movie.genre} · {movie.type}</p>
  </div>
 </button>
}
function Row({row,onOpen}) {
 const list=row.ids.map(id=>movies.find(m=>m.id===id)).filter(Boolean)
 return <section className="movie-row">
  <h2>{row.title}<span className="see-all">Explore all <b>›</b></span></h2>
  <div className="poster-track">{list.map((m,i)=><PosterCard key={m.id} movie={m} onOpen={onOpen} rank={row.rank?i+1:null}/>)}</div>
 </section>
}
export default function App(){
 const [active,setActive]=useState('Home')
 const [searchOpen,setSearchOpen]=useState(false)
 const [query,setQuery]=useState('')
 const [selected,setSelected]=useState(null)
 const [myList,setMyList]=useState([])
 const [listOnly,setListOnly]=useState(false)
 const [playing,setPlaying]=useState(false)
 const [scrolled,setScrolled]=useState(false)
 const [profile,setProfile]=useState(false)
 const hero=movies[0]
 const visibleRows=useMemo(()=>{
  let source=listOnly?rows.filter(r=>r.title==='Continue Watching'):rows
  if(query.trim()) {
   const q=query.toLowerCase()
   const found=movies.filter(m=>m.title.toLowerCase().includes(q)||m.genre.toLowerCase().includes(q))
   return [{title:`Search results for “${query}”`,ids:found.map(m=>m.id)}]
  }
  if(listOnly)return [{title:'My List',ids:myList}]
  if(active==='TV Shows')return [{title:'Popular TV Shows',ids:movies.filter(m=>m.type==='Series').map(m=>m.id)}]
  if(active==='Movies')return [{title:'Popular Movies',ids:movies.filter(m=>m.type==='Movie').map(m=>m.id)}]
  if(active==='My List')return [{title:'My List',ids:myList}]
  return source
 },[query,active,listOnly,myList])
 if(typeof window!=='undefined') window.onscroll=()=>setScrolled(window.scrollY>24)
 const toggleList=(id)=>setMyList(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id])
 return <div className="app-shell">
  <header className={`top-nav ${scrolled?'solid':''}`}>
   <div className="nav-left"><a className="brand" href="#" onClick={e=>{e.preventDefault();setActive('Home');setQuery('')}}>CINEVA</a>
    <nav className="desktop-nav">{['Home','TV Shows','Movies','My List'].map(item=><button key={item} className={active===item?'active':''} onClick={()=>{setActive(item);setQuery('')}}>{item}</button>)}</nav>
   </div>
   <div className="nav-right">
    {searchOpen&&<input autoFocus className="search-input" placeholder="Titles, people, genres" value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Escape'&&setSearchOpen(false)}/>}
    <button className="nav-icon" aria-label="Search" onClick={()=>{setSearchOpen(v=>!v);setQuery('')}}><Icon name="search"/></button>
    <button className="kids-link" onClick={()=>setActive('TV Shows')}>Kids</button>
    <button className="nav-icon notification" aria-label="Notifications"><Icon name="bell"/></button>
    <div className="profile-wrap"><button className="profile" onClick={()=>setProfile(v=>!v)}><span className="avatar">S</span><Icon name="down" size={13}/></button>{profile&&<div className="profile-menu"><b>Viewing as Satyam</b><button onClick={()=>{setProfile(false);setActive('My List')}}>My List</button><button onClick={()=>setProfile(false)}>Manage Profiles</button><button onClick={()=>setProfile(false)}>Account</button><button onClick={()=>setProfile(false)}>Help Center</button></div>}</div>
   </div>
  </header>
  <main>
   {!query&&!listOnly&&active==='Home'&&<section className="hero" style={{backgroundImage:`linear-gradient(90deg,#141414 0%,rgba(20,20,20,.78) 27%,rgba(20,20,20,.08) 68%),linear-gradient(0deg,#141414 0%,transparent 45%),url(${hero.backdrop})`}}>
    <div className="hero-content">
     <div className="hero-kicker"><span className="n-mark">N</span> SERIES</div>
     <h1>STRANGER<br/>THINGS</h1>
     <div className="top-ten"><span>TOP</span><b>10</b><span>#1 in TV Shows Today</span></div>
     <p className="hero-description">{hero.description}</p>
     <div className="hero-buttons">
      <button className="btn btn-light" onClick={()=>setPlaying(true)}><Icon name="play" size={23}/> Play</button>
      <button className="btn btn-muted" onClick={()=>setSelected(hero)}><Icon name="info" size={22}/> More Info</button>
     </div>
    </div>
    <div className="hero-age"><span>16+</span></div>
    <div className="hero-caption"><span className="caption-dot"></span> Sci-Fi · Mystery · Teen</div>
   </section>}
   <div className={`content-area ${query||active!=='Home'||listOnly?'content-offset':''}`}>
    {query&&<div className="search-heading">Explore results for <b>“{query}”</b></div>}
    {active==='My List'&&!myList.length&&!query?<div className="empty-state"><h2>Your list is empty</h2><p>Add shows and movies you want to watch later.</p></div>:visibleRows.map((row,i)=><Row key={row.title} row={row} onOpen={setSelected}/>)}
   </div>
  </main>
  <footer><div className="socials">f　◎　▶　♪</div><div className="footer-links"><span>Audio Description</span><span>Help Center</span><span>Gift Cards</span><span>Media Center</span><span>Investor Relations</span><span>Jobs</span><span>Terms of Use</span><span>Privacy</span><span>Legal Notices</span><span>Cookie Preferences</span><span>Corporate Information</span><span>Contact Us</span></div><button className="service-code">Service Code</button><small>© 2026 CINEVA. All rights reserved.</small></footer>
  {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="detail-modal" onClick={e=>e.stopPropagation()}>
   <button className="modal-close" onClick={()=>setSelected(null)}><Icon name="close"/></button>
   <div className="modal-hero" style={{backgroundImage:`linear-gradient(0deg,#181818 0%,transparent 65%),url(${selected.backdrop||selected.poster})`}}><div className="modal-title">{selected.title}</div><div className="hero-buttons"><button className="btn btn-light" onClick={()=>setPlaying(true)}><Icon name="play"/> Play</button><button className="round-icon large" onClick={()=>toggleList(selected.id)}><Icon name={myList.includes(selected.id)?'check':'plus'}/></button></div></div>
   <div className="modal-details"><div className="modal-copy"><div className="poster-meta"><b>{selected.match} Match</b><span>{selected.year}</span><span>{selected.rating}</span><span>{selected.duration}</span></div><p>{selected.description}</p></div><div className="modal-side"><p><span>Genres:</span> {selected.genre}, Drama, Suspense</p><p><span>Cast:</span> Millie Bobby Brown, David Harbour, Winona Ryder</p><p><span>This show is:</span> Suspenseful, Exciting, Atmospheric</p></div></div>
  </div></div>}
  {playing&&<div className="player-backdrop" onClick={()=>setPlaying(false)}><div className="player-box" onClick={e=>e.stopPropagation()}><button onClick={()=>setPlaying(false)}><Icon name="close"/></button><div className="player-message"><span className="brand">CINEVA</span><h2>Preview experience</h2><p>This is a frontend demo. Connect a licensed video source to enable playback.</p><button className="btn btn-light" onClick={()=>setPlaying(false)}>Back to browsing</button></div></div></div>}
 </div>
}
