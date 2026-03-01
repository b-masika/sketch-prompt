const ImageCredit = ({ credit, url }) => (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a 
            href={url} 
            target="_blank" 
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()} 
            className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-[9px] text-white font-black tracking-widest uppercase border border-white/10 hover:bg-black/60 transition-colors whitespace-nowrap"
        >
            Ref: {credit} ↗
        </a>
    </div>
);

export default ImageCredit;