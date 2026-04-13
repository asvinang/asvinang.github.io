// ============================================================
// PIANO QUEST — Components
// Requires: config.js (globals), sprites.jsx (ENEMY_SPRITES)
// ============================================================
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ── Helpers ──
const fmt = (s) => { const m = Math.floor(s / 60); return `${m}:${(s % 60).toString().padStart(2, "0")}`; };

function buildQuestNodes(songs, theme) {
  const t = STORY_THEMES[theme];
  const nodes = [];
  let itemIdx = 0, locIdx = 0, enemyIdx = 0;
  songs.forEach((song, songIdx) => {
    for (let r = 0; r < song.reps; r++) {
      const item = t.items[itemIdx] || { up: `item_${itemIdx}`, n: "Mystery Relic", i: "✨", d: "A rare artifact." };
      nodes.push({ id: nodes.length, songName: song.name, songIdx, repNum: r + 1, totalReps: song.reps, isLastRepOfSong: r === song.reps - 1, item, enemy: t.enemies[enemyIdx % t.enemies.length], location: t.locations[locIdx % t.locations.length] });
      itemIdx++; enemyIdx++;
    }
    locIdx++;
  });
  return nodes;
}

function buildZones(songs) {
  const zones = []; let nodeIdx = 0;
  songs.forEach((song, i) => { zones.push({ songName: song.name, start: nodeIdx, end: nodeIdx + song.reps - 1, reps: song.reps, colorIdx: i }); nodeIdx += song.reps; });
  return zones;
}

// ── Data-driven SVG renderer for avatar parts ──
function renderSvgParts(parts, gc, hasUpgrade) {
  if (!parts) return null;
  return parts.map((p, i) => {
    if (p.t === "up_path" || p.t === "up_rect" || p.t === "up_circle") {
      if (!hasUpgrade) return null;
    }
    const fill = p.fill === "HAT" ? gc.hat : p.fill === "WAND_GEM" ? gc.wand_gem : p.fill;
    if (p.t === "rect" || p.t === "up_rect") return <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} fill={fill} rx={p.rx} opacity={p.op} style={p.anim ? { animation: p.anim } : undefined} />;
    if (p.t === "circle" || p.t === "up_circle") return <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={fill} opacity={p.op} />;
    if (p.t === "path" || p.t === "up_path") return p.stroke
      ? <path key={i} d={p.d} stroke={p.stroke} strokeWidth={p.sw} fill="none" />
      : <path key={i} d={p.d} fill={fill} />;
    return null;
  });
}

// ============================================================
// HERO AVATAR (memoised, data-driven)
// ============================================================
const HeroAvatar = React.memo(({ gear, small = false, theme = "space" }) => {
  const sc = small ? 0.6 : 1;
  const w = Math.round(60 * sc), h = Math.round(60 * sc);
  const gc = STORY_THEMES[theme]?.gearColors || STORY_THEMES.space.gearColors;

  const renderVehicle = () => {
    if (!gear.skate) return null;
    const up = gear.skate_up;
    const flamTrail = up ? <div style={{ position:"absolute", left:-38, top:-1, width:36, height:5, background:"linear-gradient(to right,#f97316,#fbbf24,transparent)", borderRadius:4, animation:"pulse 0.8s infinite" }}/> : null;
    if (theme === "space") return (
      <div style={{ position:"absolute", bottom:6*sc, left:36*sc, width:52*sc, height:7*sc, background:"#1d4ed8", borderRadius:4, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 4px", boxShadow:"0 2px 8px #60a5fa66" }}>
        {up && <div style={{ position:"absolute", left:-38, top:-1, width:36, height:5, background:"linear-gradient(to right,#3b82f6,#a5f3fc,transparent)", borderRadius:4, animation:"pulse 0.8s infinite" }}/>}
        <div style={{ width:8*sc, height:8*sc, background:"#93c5fd", borderRadius:"50%", opacity:0.9 }}/><div style={{ width:8*sc, height:8*sc, background:"#93c5fd", borderRadius:"50%", opacity:0.9 }}/>
      </div>
    );
    if (theme === "pirate") return (
      <div style={{ position:"absolute", bottom:2*sc, left:26*sc, width:62*sc, height:13*sc, background:"#78350f", borderRadius:"2px 2px 8px 8px", borderBottom:"3px solid #451a03", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {up && <div style={{ position:"absolute", right:-10, top:0, width:10, height:22, background:"#92400e", borderRadius:2, transform:"rotate(-20deg)", transformOrigin:"bottom" }}/>}
        <div style={{ width:"70%", height:2, background:"#92400e", borderRadius:1 }}/>
      </div>
    );
    if (theme === "forest") return (
      <div style={{ position:"absolute", bottom:3*sc, left:30*sc, width:58*sc, height:10*sc, background:"#78350f", borderRadius:3, borderTop:"3px solid #4d7c0f", display:"flex", gap:5, alignItems:"flex-end", padding:"0 5px", paddingBottom:2 }}>
        {up && <div style={{ position:"absolute", left:-8, top:-8, fontSize:11 }}>🌿</div>}
        <div style={{ width:7, height:6, background:"#4d7c0f", borderRadius:1 }}/><div style={{ width:7, height:6, background:"#4d7c0f", borderRadius:1 }}/><div style={{ width:7, height:6, background:"#4d7c0f", borderRadius:1 }}/>
      </div>
    );
    if (theme === "dragon") return (
      <div style={{ position:"absolute", bottom:6*sc, left:34*sc, width:54*sc, height:7*sc, background:"#1c1917", borderRadius:3, boxShadow:"0 3px 12px #f97316cc", borderBottom:"2px solid #f97316", overflow:"hidden" }}>
        {flamTrail}<div style={{ width:"100%", height:"100%", background:"linear-gradient(to right,transparent,#f9731633,transparent)", borderRadius:3 }}/>
      </div>
    );
    if (theme === "underwater") return (
      <div style={{ position:"absolute", bottom:3*sc, left:22*sc, width:68*sc, height:16*sc, background:"#0e7490", borderRadius:10, border:"2px solid #06b6d4", display:"flex", alignItems:"center", padding:"0 7px", gap:5 }}>
        {up && <div style={{ position:"absolute", right:-8, top:"50%", marginTop:-4, width:8, height:8, background:"#fbbf24", borderRadius:"50%", animation:"pulse 0.4s infinite" }}/>}
        <div style={{ width:10, height:10, borderRadius:"50%", border:"2px solid #7dd3fc", background:"#164e63", flexShrink:0 }}/><div style={{ flex:1, height:2, background:"#0891b2", borderRadius:1 }}/>
      </div>
    );
    return (
      <div style={{ position:"absolute", bottom:6*sc, left:36*sc, width:52*sc, height:7*sc, background:"#334155", borderRadius:4, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 4px" }}>
        {flamTrail}<div style={{ width:9*sc, height:9*sc, background:"#000", borderRadius:"50%" }}/><div style={{ width:9*sc, height:9*sc, background:"#000", borderRadius:"50%" }}/>
      </div>
    );
  };

  const renderHatBack = () => {
    if (!gear.hat || theme !== "underwater") return null;
    return <g><rect x="3.2" y="-0.5" width="5.6" height="5.8" fill={gc.hat} rx="1.2"/></g>;
  };

  const renderHat = () => {
    if (!gear.hat) return null;
    const parts = AVATAR_HATS[theme];
    if (parts) return <g>{renderSvgParts(parts, gc, gear.hat_up)}</g>;
    return <g><rect x="3" y="1" width="6" height="1.5" fill={gc.hat}/><rect x="4" y="0" width="4" height="1" fill={gc.hat}/>{gear.hat_up && <path d="M7 0 L9 -3" stroke="#fbbf24" strokeWidth="0.7"/>}</g>;
  };

  const renderWeapon = () => {
    if (!gear.wand) return null;
    const up = gear.wand_up;
    const cfg = AVATAR_WEAPONS[theme];
    if (!cfg) return (
      <g style={{ animation:"bounce 2s infinite" }}>
        <rect x="8.5" y="3.5" width="0.8" height="6" fill="#78350f"/>
        {up && <circle cx="8.9" cy="3" r="1.2" fill={gc.wand_gem} style={{ animation:"pulse 1s infinite" }}/>}
      </g>
    );
    return (
      <g style={{ animation:"bounce 2s infinite" }}>
        {cfg.rects.map((r, i) => <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} rx={r.rx} opacity={r.op} />)}
        {up && cfg.gem && <circle cx={cfg.gem.cx} cy={cfg.gem.cy} r={cfg.gem.r} fill={gc.wand_gem} style={{ animation:"pulse 1s infinite" }}/>}
        {!up && cfg.noGem && <rect x={cfg.noGem.x} y={cfg.noGem.y} width={cfg.noGem.w} height={cfg.noGem.h} fill={cfg.noGem.fill} opacity={cfg.noGem.op}/>}
        {!up && cfg.noGemPath && <path d={cfg.noGemPath} stroke={cfg.noGemStroke} strokeWidth="0.5"/>}
        {up && cfg.upGlow && <rect x={cfg.upGlow.x} y={cfg.upGlow.y} width={cfg.upGlow.w} height={cfg.upGlow.h} fill={cfg.upGlow.fill} opacity={cfg.upGlow.op} style={{ animation:cfg.upGlow.anim }}/>}
      </g>
    );
  };

  const renderShirtUpgrade = () => {
    if (!gear.shirt_up) return null;
    const cfg = AVATAR_SHIRT_UPGRADES[theme] || AVATAR_SHIRT_UPGRADES.space;
    if (cfg.t === "compound") return <>{cfg.parts.map((p, i) => p.t === "rect" ? <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} fill={p.fill} opacity={p.op} rx={p.rx}/> : <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.fill}/>)}</>;
    if (cfg.t === "rect") return <rect x={cfg.x} y={cfg.y} width={cfg.w} height={cfg.h} fill={cfg.fill} opacity={cfg.op} rx={cfg.rx} style={cfg.anim ? { animation:cfg.anim } : undefined}/>;
    return null;
  };

  const bookEmoji = BOOK_EMOJIS[theme] || "📖";
  const bookUpEmoji = BOOK_UP_EMOJIS[theme] || "✨";

  return (
    <div className="relative flex items-center justify-center" style={{ width:w+48, height:h+32 }}>
      {gear.leo && <div className="absolute left-0 bottom-4 flex flex-col items-center" style={{ animation:"bounce 1s infinite" }}><span style={{ fontSize:small?16:22, transform:"scaleX(-1)", display:"block" }}>{gc.leoEmoji || "🐆"}</span></div>}
      {gear.gir && <div className="absolute" style={{ left:-32*sc, bottom:20*sc, fontSize:small?20:28, animation:"bounce 1s 0.4s infinite" }}><span style={{ transform:"scaleX(-1)", display:"block" }}>{gc.girEmoji || "🦒"}</span>{gear.gir_up && <span style={{ position:"absolute", top:2, left:6, fontSize:9, color:"#fbbf24" }}>⭐</span>}</div>}
      {renderVehicle()}
      <div style={{ position:"relative", zIndex:30, transform:`translateX(${14*sc}px)` }}>
        {gear.book && <div style={{ position:"absolute", top:-40*sc, right:0, fontSize:small?14:20, animation:"bounce 0.8s infinite" }}>{bookEmoji}{gear.book_up && <span style={{ position:"absolute", top:-6, right:-6, fontSize:10, color:"#fbbf24" }}>{bookUpEmoji}</span>}</div>}
        <svg width={w} height={h} viewBox="0 0 12 12" style={{ overflow:"visible", filter:"drop-shadow(0 4px 8px rgba(0,0,0,0.8))" }}>
          {gear.cape && <rect x="0.5" y="4" width="3" height="6" fill={gc.cape} rx="0.5" style={{ animation:"pulse 1.5s infinite" }}/>}
          {renderHatBack()}
          <rect x="4" y="4" width="4" height="5" fill={gear.shirt ? gc.shirt : "#475569"} rx="0.5"/>
          {renderShirtUpgrade()}
          <rect x="4" y="1" width="4" height="4" fill="#ffdbac" rx="0.5"/>
          <rect x="4" y="1" width="4" height="1" fill="#451a03"/>
          <rect x="7.5" y="2.5" width="1" height="1" fill="#000"/>
          {renderHat()}
          {renderWeapon()}
          {gear.shield && <rect x="9.5" y="5" width="2" height="4" fill={gc.shield} rx="1" opacity="0.9"/>}
          <rect x="4" y="9" width="1.5" height="2" fill={gc.legs} style={{ animation:"legL 0.4s infinite alternate" }}/>
          <rect x="6.5" y="9" width="1.5" height="2" fill={gc.legs} style={{ animation:"legR 0.4s infinite alternate" }}/>
        </svg>
      </div>
    </div>
  );
});

// ============================================================
// PARALLAX BACKGROUND (memoised)
// ============================================================
const ParallaxBg = React.memo(({ theme, isMoving, songIdx }) => {
  const t = STORY_THEMES[theme];
  const skyColor = t.skyColors[songIdx % t.skyColors.length];
  const groundColor = t.groundColors[songIdx % t.groundColors.length];
  const hillColor = t.hillColors[songIdx % t.hillColors.length];
  const deco = t.bgObjects[songIdx % t.bgObjects.length];
  const stars = useMemo(() => t.bgStars ? [...Array(20)].map((_, i) => ({ left: `${(i * 17 + 3) % 100}%`, top: `${(i * 13 + 7) % 60}%`, size: i % 3 === 0 ? 2 : 1, opacity: 0.6 + (i % 4) * 0.1, dur: `${1.5 + (i % 3) * 0.5}s` })) : [], [t.bgStars]);
  const decos = useMemo(() => [...Array(16)].map((_, i) => i), []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: skyColor }} />
      {stars.length > 0 && <div style={{ position: "absolute", inset: 0 }}>{stars.map((s, i) => <div key={i} style={{ position: "absolute", width: s.size, height: s.size, background: "#fff", borderRadius: "50%", left: s.left, top: s.top, opacity: s.opacity, animation: `twinkle ${s.dur} infinite alternate` }} />)}</div>}
      <div style={{ position: "absolute", bottom: "30%", left: 0, width: "200%", animation: isMoving ? "scrollSlow 30s linear infinite" : "none" }}>
        <svg width="100%" height="50" viewBox="0 0 1200 50" preserveAspectRatio="none"><path d="M0 50 Q100 10 200 40 Q300 5 400 35 Q500 8 600 40 Q700 12 800 38 Q900 6 1000 42 Q1100 10 1200 50 Z" fill={hillColor} opacity="0.6" /></svg>
      </div>
      <div style={{ position: "absolute", bottom: "15%", left: 0, width: "200%", animation: isMoving ? "scrollFast 15s linear infinite" : "none" }}>
        <svg width="100%" height="40" viewBox="0 0 1200 40" preserveAspectRatio="none"><path d="M0 40 Q150 5 300 30 Q450 2 600 35 Q750 8 900 28 Q1050 4 1200 40 Z" fill={hillColor} /></svg>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "15%", background: groundColor }} />
      <div style={{ position: "absolute", top: "10%", left: 0, width: "200%", display: "flex", gap: 80, animation: isMoving ? "scrollMed 20s linear infinite" : "none" }}>
        {decos.map(i => <span key={i} style={{ fontSize: 18, opacity: 0.25, flexShrink: 0 }}>{deco}</span>)}
      </div>
    </div>
  );
});

// ============================================================
// ADVENTURE MAP (memoised)
// ============================================================
const AdventureMap = React.memo(({ zones, currentNode, theme }) => {
  const ZONE_COLORS = ["#7c3aed","#1d4ed8","#059669","#d97706","#dc2626","#0891b2","#7c3aed","#be185d","#0f766e","#92400e"];
  const nodesBeforeCache = useMemo(() => {
    const arr = [0];
    for (let i = 0; i < zones.length; i++) arr.push(arr[i] + zones[i].reps);
    return arr;
  }, [zones]);

  return (
    <div style={{ width: "100%", height: "100%", overflowX: "auto", overflowY: "hidden", display: "flex", alignItems: "center", padding: "4px 8px", gap: 4 }}>
      {zones.map((zone, zi) => {
        const zColor = ZONE_COLORS[zi % ZONE_COLORS.length];
        const nodesBefore = nodesBeforeCache[zi];
        return (
          <div key={zi} style={{ display: "flex", flexDirection: "column", flexShrink: 0, gap: 2 }}>
            <div style={{ fontSize: 7, fontWeight: 900, textTransform: "uppercase", color: zColor, letterSpacing: 1, textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: zone.reps * 28 }}>{zone.songName}</div>
            <div style={{ display: "flex", gap: 3, position: "relative" }}>
              {zone.reps > 1 && <div style={{ position: "absolute", top: "50%", left: 12, right: 12, height: 2, background: zColor, opacity: 0.3, transform: "translateY(-50%)" }} />}
              {[...Array(zone.reps)].map((_, ri) => {
                const nodeIdx = nodesBefore + ri;
                const done = nodeIdx < currentNode, active = nodeIdx === currentNode;
                return (
                  <div key={ri} style={{ width: 22, height: 22, borderRadius: 4, border: `2px solid ${zColor}`, background: done ? zColor : active ? "#fff" : "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative", zIndex: 1, transform: active ? "scale(1.2)" : "scale(1)", transition: "all 0.3s", boxShadow: active ? `0 0 8px ${zColor}` : done ? `0 0 4px ${zColor}66` : "none", opacity: nodeIdx > currentNode ? 0.4 : 1 }}>
                    {done ? <span style={{ fontSize: 10 }}>⭐</span> : active ? <span style={{ fontSize: 9, fontWeight: 900, color: zColor }}>▶</span> : <span style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>{ri + 1}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
});

// ============================================================
// EDIT SONG LIST MODAL
// ============================================================
const EditSongModal = ({ songs, onSave, onClose }) => {
  const [list, setList] = useState(songs.map(s => ({ ...s })));
  const nextId = useRef(Math.max(...songs.map(s => s.id)) + 1);
  const update = (idx, field, val) => setList(prev => prev.map((s, i) => i === idx ? { ...s, [field]: val } : s));
  const remove = (idx) => setList(prev => prev.filter((_, i) => i !== idx));
  const add = () => setList(prev => [...prev, { id: nextId.current++, name: "New Song", reps: 1 }]);
  const moveUp = (idx) => { if (idx === 0) return; setList(prev => { const n = [...prev]; [n[idx-1], n[idx]] = [n[idx], n[idx-1]]; return n; }); };
  const moveDown = (idx) => { if (idx === list.length - 1) return; setList(prev => { const n = [...prev]; [n[idx], n[idx+1]] = [n[idx+1], n[idx]]; return n; }); };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }} onClick={onClose}>
      <div style={{ background: "#0f172a", border: "2px solid #334155", borderRadius: 24, padding: 20, width: "90%", maxWidth: 380, maxHeight: "85vh", display: "flex", flexDirection: "column", gap: 12 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 900, fontSize: 14, textTransform: "uppercase", letterSpacing: 2, color: "#f8fafc" }}>🎹 Song List</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 18 }}>✕</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "24px 1fr 52px 48px", gap: 6, fontSize: 8, fontWeight: 900, textTransform: "uppercase", color: "#475569", letterSpacing: 1, padding: "0 2px" }}>
          <span></span><span>Song</span><span style={{ textAlign: "center" }}>Reps</span><span></span>
        </div>
        <div style={{ overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
          {list.map((song, idx) => (
            <div key={song.id} style={{ display: "grid", gridTemplateColumns: "24px 1fr 52px 48px", gap: 6, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <button onClick={() => moveUp(idx)} style={{ background: "none", border: "none", color: idx === 0 ? "#1e293b" : "#64748b", cursor: idx === 0 ? "default" : "pointer", fontSize: 10, lineHeight: 1, padding: 0 }}>▲</button>
                <button onClick={() => moveDown(idx)} style={{ background: "none", border: "none", color: idx === list.length - 1 ? "#1e293b" : "#64748b", cursor: idx === list.length - 1 ? "default" : "pointer", fontSize: 10, lineHeight: 1, padding: 0 }}>▼</button>
              </div>
              <input value={song.name} onChange={e => update(idx, "name", e.target.value)} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "6px 8px", color: "#f8fafc", fontSize: 11, fontWeight: 600, width: "100%", outline: "none" }} />
              <input type="number" min="1" max="10" value={song.reps} onChange={e => update(idx, "reps", Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "6px 4px", color: "#f8fafc", fontSize: 11, fontWeight: 700, textAlign: "center", width: "100%", outline: "none" }} />
              <button onClick={() => remove(idx)} style={{ background: "#7f1d1d", border: "none", borderRadius: 8, color: "#fca5a5", fontSize: 14, padding: "6px 8px", cursor: "pointer", fontWeight: 900 }}>🗑</button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <span style={{ fontSize: 9, color: "#475569" }}>{list.reduce((s, x) => s + x.reps, 0)} total reps · max 20</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={add} style={{ background: "#1d4ed8", border: "none", borderRadius: 12, color: "#fff", fontWeight: 900, fontSize: 13, padding: "8px 16px", cursor: "pointer" }}>+ Add</button>
            <button onClick={() => { onSave(list); onClose(); }} style={{ background: "#059669", border: "none", borderRadius: 12, color: "#fff", fontWeight: 900, fontSize: 12, padding: "8px 16px", cursor: "pointer", textTransform: "uppercase" }}>Save ✓</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// STORY SELECT MODAL
// ============================================================
const StoryModal = ({ current, onSelect, onClose }) => {
  const themes = [
    { id: "space", label: "Space Adventure", emoji: "🚀" },
    { id: "pirate", label: "Pirate Adventure", emoji: "🏴‍☠️" },
    { id: "underwater", label: "Underwater Adventure", emoji: "🤿" },
    { id: "forest", label: "Forest Adventure", emoji: "🌲" },
    { id: "dragon", label: "Dragon Realm", emoji: "🐉" },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }} onClick={onClose}>
      <div style={{ background: "#0f172a", border: "2px solid #334155", borderRadius: 24, padding: 24, width: "85%", maxWidth: 340 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontWeight: 900, fontSize: 14, textTransform: "uppercase", letterSpacing: 2, color: "#f8fafc" }}>Choose Story</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 18 }}>✕</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {themes.map(t => (
            <button key={t.id} onClick={() => { onSelect(t.id); onClose(); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: current === t.id ? "#1d4ed8" : "#1e293b", border: `2px solid ${current === t.id ? "#3b82f6" : "#334155"}`, borderRadius: 16, cursor: "pointer", color: "#f8fafc", transition: "all 0.2s" }}>
              <span style={{ fontSize: 24 }}>{t.emoji}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 900, fontSize: 12 }}>{t.label}</div>
                {current === t.id && <div style={{ fontSize: 9, color: "#93c5fd", fontWeight: 600 }}>ACTIVE</div>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SETTINGS MODAL
// ============================================================
const SettingsModal = ({ heroName, onSave, onClose }) => {
  const [name, setName] = useState(heroName);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }} onClick={onClose}>
      <div style={{ background: "#0f172a", border: "2px solid #334155", borderRadius: 24, padding: 24, width: "80%", maxWidth: 300 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontWeight: 900, fontSize: 14, textTransform: "uppercase", letterSpacing: 2, color: "#f8fafc" }}>⚙️ Settings</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 18 }}>✕</button>
        </div>
        <label style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", color: "#64748b", letterSpacing: 1 }}>Hero Name</label>
        <input value={name} onChange={e => setName(e.target.value)} maxLength={12} style={{ display: "block", width: "100%", marginTop: 6, background: "#1e293b", border: "1px solid #334155", borderRadius: 10, padding: "10px 12px", color: "#f8fafc", fontSize: 14, fontWeight: 700, outline: "none", boxSizing: "border-box" }} />
        <button onClick={() => { onSave(name.trim() || "Caslu"); onClose(); }} style={{ marginTop: 16, width: "100%", background: "#059669", border: "none", borderRadius: 12, color: "#fff", fontWeight: 900, fontSize: 13, padding: "10px", cursor: "pointer", textTransform: "uppercase" }}>Save ✓</button>
      </div>
    </div>
  );
};

// ============================================================
// HOME SCREEN
// ============================================================
const HomeScreen = ({ theme, songs, heroName, onStart, onEditSongs, onChooseStory, onSettings }) => {
  const t = STORY_THEMES[theme];
  return (
    <div style={{ width: "100vw", height: "100vh", background: t.bgColor, color: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", fontFamily: "'Courier New', monospace" }}>
      <style>{`
        @keyframes twinkle { from { opacity: 0.3; } to { opacity: 1; } }
        @keyframes floatUp { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes glow { 0%,100% { text-shadow: 0 0 8px ${t.accentColor}; } 50% { text-shadow: 0 0 24px ${t.accentColor}, 0 0 48px ${t.accentColor}; } }
        @keyframes pixelPulse { 0%,100% { box-shadow: 0 0 0 2px ${t.accentColor}44; } 50% { box-shadow: 0 0 0 6px ${t.accentColor}88, 0 0 20px ${t.accentColor}44; } }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes legL { from { transform: translateY(0); } to { transform: translateY(-2px); } }
        @keyframes legR { from { transform: translateY(-2px); } to { transform: translateY(0); } }
        @keyframes scrollSlow { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scrollFast { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scrollMed  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)", pointerEvents: "none", zIndex: 10 }} />
      {[...Array(t.bgStars ? 40 : 12)].map((_, i) => (
        <div key={i} style={{ position: "absolute", left: `${(i * 17 + 5) % 100}%`, top: `${(i * 13 + 3) % 100}%`, fontSize: t.bgStars ? (i % 5 === 0 ? 14 : 8) : 16, opacity: 0.15 + (i % 5) * 0.08, animation: `twinkle ${1 + (i % 4) * 0.5}s infinite alternate`, pointerEvents: "none" }}>
          {t.bgStars ? "★" : t.bgObjects[i % t.bgObjects.length]}
        </div>
      ))}
      <button onClick={onSettings} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.05)", border: `1px solid ${t.accentColor}44`, borderRadius: 10, padding: "6px 10px", color: "#94a3b8", cursor: "pointer", fontSize: 16, zIndex: 20 }}>⚙️</button>
      <div style={{ textAlign: "center", marginBottom: 24, zIndex: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 6, textTransform: "uppercase", color: t.accentColor, marginBottom: 4, animation: "pulse 2s infinite" }}>♩ ♪ ♫ ♬</div>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: "#f8fafc", animation: "glow 2s infinite", lineHeight: 1 }}>PIANO</div>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: t.accentColor, animation: "glow 2s 0.5s infinite", lineHeight: 1 }}>QUEST</div>
        <div style={{ fontSize: 10, color: "#475569", marginTop: 8, letterSpacing: 4 }}>{t.name.toUpperCase()}</div>
      </div>
      <div style={{ animation: "floatUp 3s infinite", zIndex: 20, marginBottom: 16 }}><HeroAvatar gear={{}} theme={theme} /></div>
      <div style={{ fontSize: 10, color: t.accentColor, fontWeight: 900, letterSpacing: 3, marginBottom: 24, zIndex: 20 }}>{heroName.toUpperCase()}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "70%", maxWidth: 240, zIndex: 20 }}>
        <button onClick={onStart} style={{ background: t.accentColor, border: "none", borderRadius: 12, padding: "14px", color: "#000", fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: 2, cursor: "pointer", animation: "pixelPulse 2s infinite", fontFamily: "'Courier New', monospace" }}>▶ Start Quest</button>
        <button onClick={onEditSongs} style={{ background: "transparent", border: `2px solid ${t.accentColor}66`, borderRadius: 12, padding: "12px", color: "#f8fafc", fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, cursor: "pointer", fontFamily: "'Courier New', monospace" }}>🎵 Edit Song List</button>
        <button onClick={onChooseStory} style={{ background: "transparent", border: `2px solid ${t.accentColor}66`, borderRadius: 12, padding: "12px", color: "#f8fafc", fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, cursor: "pointer", fontFamily: "'Courier New', monospace" }}>📖 Choose Story</button>
      </div>
      <div style={{ marginTop: 20, fontSize: 9, color: "#334155", letterSpacing: 2, zIndex: 20 }}>{songs.length} SONGS · {songs.reduce((s,x) => s+x.reps,0)} REPS</div>
    </div>
  );
};

// ============================================================
// BATTLE MODAL — auto-battle with full animations
// ============================================================
const BattleModal = ({ node, theme, heroName, gear, onEndBattle }) => {
  const t = STORY_THEMES[theme];
  const gc = t.gearColors;
  const DMG_MIN = 3, DMG_RANGE = 5;
  const AVG_DMG = DMG_MIN + DMG_RANGE / 2;
  const MONSTER_HP = Math.round((REP_LIMIT / 2) * AVG_DMG);

  const roster = useMemo(() => {
    const r = [];
    const hf = BATTLE_FLAVOURS.hero[theme] || BATTLE_FLAVOURS.hero.space;
    r.push({ name: heroName, emoji: null, proj: hf.proj, color: hf.color, moves: hf.moves, isHero: true });
    if (gear.leo) {
      const ld = BATTLE_FLAVOURS.leo[theme] || { proj:"🐾", color:"#a3e635", moves:["attacks!"] };
      r.push({ name: gc.leoEmoji + " " + (t.items?.find(i=>i.up==="leo")?.n || "Companion"), emoji: gc.leoEmoji, proj: ld.proj, color: ld.color, moves: ld.moves, isHero: false });
    }
    if (gear.gir) {
      const gd = BATTLE_FLAVOURS.gir[theme] || { proj:"✨", color:"#fde68a", moves:["attacks!"] };
      r.push({ name: gc.girEmoji + " " + (t.items?.find(i=>i.up==="gir")?.n || "Companion"), emoji: gc.girEmoji, proj: gd.proj, color: gd.color, moves: gd.moves, isHero: false });
    }
    return r;
  }, [theme, heroName, gear.leo, gear.gir]);

  const monsterType = useMemo(() => {
    const n = node.enemy.toLowerCase();
    if (/fire|flame|ember|inferno|lava|magma|scorch|pyroclast|brimstone|cinder|ashen|ash/.test(n)) return "fire";
    if (/void|shadow|dark|phantom|wraith|specter|ghost|black hole|abyss|soot|bone|dead/.test(n)) return "dark";
    if (/ice|frost|cryo|frozen/.test(n)) return "ice";
    if (/coral|reef|tide|wave|water|aqua|moray|jellyfish|anglerfish|kraken|shark|whale|eel|octopus|siren|trench/.test(n)) return "water";
    if (/thorn|root|mud|fungus|bog|bark|briar|creep|pollen|forest|swamp|rot|poison|vine/.test(n)) return "nature";
    return "physical";
  }, [node.enemy]);

  const getAttackPool = (attacker) => {
    if (attacker.isHero) return HERO_ATTACK_POOL[theme] || ["slash","blast","zap"];
    if (attacker.emoji === gc.leoEmoji) return ["slash","claw","bite"];
    if (attacker.emoji === gc.girEmoji) return ["beam","sonic","vine"];
    return ["slash","zap","blast"];
  };

  const eFlavour = BATTLE_FLAVOURS.enemy[theme] || BATTLE_FLAVOURS.enemy.space;

  // ── State ──
  const [heroAttack, setHeroAttack] = useState(false);
  const [enemyHit, setEnemyHit] = useState(false);
  const [heroHit, setHeroHit] = useState(false);
  const [enemyHp, setEnemyHp] = useState(MONSTER_HP);
  const [repTime, setRepTime] = useState(REP_LIMIT);
  const [micStatus, setMicStatus] = useState("requesting");
  const [beatCount, setBeatCount] = useState(0);
  const [battleLog, setBattleLog] = useState("Battle begins!");
  const [proj, setProj] = useState(null);
  const [eProj, setEProj] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [enemyDefeated, setEnemyDefeated] = useState(false);
  const [attacker, setAttacker] = useState(roster[0]);

  // ── Refs for animation damage numbers (avoid state re-renders) ──
  const dmgNumsRef = useRef([]);
  const [dmgTick, setDmgTick] = useState(0);
  const timersRef = useRef([]);
  const audioCtxRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastBeatRef = useRef(0);
  const repTimeRef = useRef(REP_LIMIT);
  const enemyHpRef = useRef(MONSTER_HP);
  const phaseRef = useRef("idle");
  const rosterIdxRef = useRef(0);

  const addTimer = (fn, delay) => { const id = setTimeout(fn, delay); timersRef.current.push({ id, type: "timeout" }); return id; };
  const addInterval = (fn, delay) => { const id = setInterval(fn, delay); timersRef.current.push({ id, type: "interval" }); return id; };
  const clearAllTimers = () => { timersRef.current.forEach(t => t.type === "interval" ? clearInterval(t.id) : clearTimeout(t.id)); timersRef.current = []; };

  const spawnDmg = (x, y, val, color) => {
    const id = Date.now() + Math.random();
    dmgNumsRef.current = [...dmgNumsRef.current, { id, x, y, val, color }];
    setDmgTick(t => t + 1);
    addTimer(() => { dmgNumsRef.current = dmgNumsRef.current.filter(d => d.id !== id); setDmgTick(t => t + 1); }, 950);
  };

  const runHeroAttack = useCallback(() => {
    if (phaseRef.current !== "idle") return;
    phaseRef.current = "busy";
    const idx = rosterIdxRef.current % roster.length;
    rosterIdxRef.current = idx + 1;
    const cur = roster[idx];
    setAttacker(cur);
    const pool = getAttackPool(cur);
    const atkKey = pool[Math.floor(Math.random() * pool.length)];
    const atk = ATTACK_TYPES[atkKey];
    const mult = getEffectiveness(atk.type, monsterType);
    const rawDmg = DMG_MIN + Math.random() * DMG_RANGE;
    const dmg = Math.round(rawDmg * mult);
    const projData = { emoji: atk.emoji, color: cur.color };

    setHeroAttack(true);
    addTimer(() => { setHeroAttack(false); setProj(projData); }, 200);
    addTimer(() => {
      setProj(null); setEnemyHit(true);
      const prev = enemyHpRef.current;
      const next = Math.max(1, prev - dmg);
      const actualDmg = prev - next;
      enemyHpRef.current = next;
      setEnemyHp(next);
      spawnDmg(68, 28, actualDmg, mult > 1.2 ? "#fbbf24" : "#e2e8f0");
      setBeatCount(c => c + 1);
      const move = cur.moves[Math.floor(Math.random() * cur.moves.length)];
      const effLabel = mult > 1.2 ? " ⚡ Super!" : mult < 0.7 ? " 💤 Weak" : "";
      setBattleLog(cur.name + " " + move + "! -" + actualDmg + effLabel);
    }, 420);
    addTimer(() => setEnemyHit(false), 640);
    addTimer(() => setEProj(true), 820);
    addTimer(() => {
      setEProj(false); setHeroHit(true);
      const ed = Math.round(2 + Math.random() * 3);
      spawnDmg(16, 58, ed, "#ef4444");
      const em = eFlavour.moves[Math.floor(Math.random() * eFlavour.moves.length)];
      setBattleLog(node.enemy + " " + em + "! -" + ed);
    }, 1060);
    addTimer(() => { setHeroHit(false); phaseRef.current = "idle"; }, 1380);
  }, [heroName, node.enemy, roster.length, monsterType]);

  // ── Unified timer setup ──
  useEffect(() => {
    addTimer(() => { if (phaseRef.current === "idle") runHeroAttack(); }, 600);
    addInterval(() => { if (phaseRef.current === "idle") runHeroAttack(); }, 2100);
    addInterval(() => { setRepTime(p => { const next = Math.max(0, p - 1); repTimeRef.current = next; return next; }); }, 1000);
    return clearAllTimers;
  }, [runHeroAttack]);

  // ── Microphone beat detection ──
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtxRef.current = ctx;
        const src = ctx.createMediaStreamSource(stream);
        const ana = ctx.createAnalyser(); ana.fftSize = 256; ana.smoothingTimeConstant = 0.3;
        src.connect(ana);
        setMicStatus("active");
        const data = new Uint8Array(ana.frequencyBinCount);
        const detect = () => {
          ana.getByteFrequencyData(data);
          const peak = data.slice(2, 20).reduce((a, b) => Math.max(a, b), 0);
          const now = Date.now();
          if (peak > 140 && now - lastBeatRef.current > 500) { lastBeatRef.current = now; if (phaseRef.current === "idle") runHeroAttack(); }
          animFrameRef.current = requestAnimationFrame(detect);
        };
        detect();
      } catch { if (!cancelled) setMicStatus("denied"); }
    })();
    return () => { cancelled = true; cancelAnimationFrame(animFrameRef.current); streamRef.current?.getTracks().forEach(t => t.stop()); audioCtxRef.current?.close(); };
  }, [runHeroAttack]);

  const stopEverything = () => { clearAllTimers(); cancelAnimationFrame(animFrameRef.current); streamRef.current?.getTracks().forEach(t => t.stop()); audioCtxRef.current?.close(); };

  const handleEndBattle = () => {
    if (finishing) return;
    stopEverything();
    setFinishing(true);
    phaseRef.current = "busy";
    setBattleLog(heroName + " charges the ultimate attack!");
    setHeroAttack(true);
    addTimer(() => { setHeroAttack(false); setProj(true); setBattleLog("ULTIMATE STRIKE! ✨🔥✨"); }, 400);
    addTimer(() => {
      setProj(false); setEnemyHit(true);
      const finalDmg = enemyHpRef.current ?? 1;
      spawnDmg(58, 20, finalDmg, "#fbbf24"); spawnDmg(72, 32, "★", "#fff");
      setEnemyHp(0); enemyHpRef.current = 0; setEnemyDefeated(true);
      setBattleLog(node.enemy + " has been defeated! ⭐");
    }, 750);
    addTimer(() => setEnemyHit(false), 1000);
    addTimer(() => onEndBattle(repTimeRef.current), 2000);
  };

  const enemyHpPct = (enemyHp / MONSTER_HP) * 100;
  const enemyHpColor = enemyHpPct > 50 ? "#22c55e" : enemyHpPct > 25 ? "#f59e0b" : "#ef4444";
  const timerColor = repTime < 60 ? "#ef4444" : repTime < 120 ? "#f59e0b" : "#22c55e";
  const battleBg = BATTLE_BGS[theme] || "linear-gradient(180deg,#0f172a,#1e293b)";

  const renderEnemySprite = ENEMY_SPRITES[node?.enemy];
  const renderEnemy = () => renderEnemySprite ? renderEnemySprite(enemyHit, heroAttack)
    : <svg width="80" height="80" viewBox="0 0 16 16" style={{ imageRendering:"pixelated", filter:enemyHit?"brightness(5) saturate(0)":"none" }}>
        <rect x="4" y="3" width="8" height="9" fill={t.accentColor}/><rect x="5" y="6" width="2" height="2" fill="#fff"/><rect x="9" y="6" width="2" height="2" fill="#fff"/><rect x="6" y="6" width="1" height="2" fill="#000"/><rect x="10" y="6" width="1" height="2" fill="#000"/><rect x="6" y="9" width="4" height="1" fill="#000"/>
      </svg>;

  const dmgNums = dmgNumsRef.current;

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", flexDirection:"column", fontFamily:"'Courier New',monospace" }}>
      <style>{`
        @keyframes projFly   { from{transform:translateX(0);opacity:1}   to{transform:translateX(190px);opacity:0} }
        @keyframes eProjFly  { from{transform:translateX(0);opacity:1}   to{transform:translateX(-190px);opacity:0} }
        @keyframes dmgFloat  { from{transform:translateY(0);opacity:1}   to{transform:translateY(-48px);opacity:0} }
        @keyframes defeated  { 0%{opacity:1;transform:scale(1)} 60%{opacity:0.2;transform:scale(0.7) rotate(15deg)} 100%{opacity:0;transform:scale(0.3) rotate(30deg)} }
        @keyframes heroKnock { 0%,100%{transform:translateX(0)} 35%{transform:translateX(-16px)} 70%{transform:translateX(-6px)} }
        @keyframes eShake    { 0%,100%{transform:translateX(0) rotate(0)} 25%{transform:translateX(12px) rotate(7deg)} 75%{transform:translateX(-8px) rotate(-5deg)} }
        @keyframes splat     { 0%{transform:scale(0.2);opacity:1} 100%{transform:scale(1.8);opacity:0} }
        @keyframes glow      { 0%,100%{opacity:0.07} 50%{opacity:0.2} }
      `}</style>
      <div style={{ flex:1, position:"relative", overflow:"hidden", background:battleBg }}>
        <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.018) 3px,rgba(255,255,255,0.018) 4px)", pointerEvents:"none", zIndex:1 }}/>
        <div style={{ position:"absolute", bottom:56, left:0, right:0, height:3, background:t.accentColor, opacity:0.15, animation:"glow 2s infinite", zIndex:2 }}/>
        <div style={{ position:"absolute", top:14, left:0, zIndex:10, background:"rgba(255,255,255,0.95)", borderRadius:"0 14px 14px 0", padding:"7px 14px 7px 10px", minWidth:158, boxShadow:"3px 3px 0 rgba(0,0,0,0.3)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
            <span style={{ fontSize:10, fontWeight:900, color:"#1a1a2e", textTransform:"uppercase" }}>{node.enemy}</span>
            <span style={{ fontSize:8, color:"#64748b" }}>Lv.{node.id+1}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:4 }}>
            <span style={{ fontSize:7, fontWeight:900, color:"#475569" }}>HP</span>
            <div style={{ flex:1, height:5, background:"#e2e8f0", borderRadius:3, overflow:"hidden" }}><div style={{ height:"100%", width:enemyHpPct+"%", background:enemyHpColor, borderRadius:3, transition:"width 0.3s ease,background 0.3s" }}/></div>
            <span style={{ fontSize:9, fontWeight:900, color:enemyHpColor, minWidth:24, textAlign:"right", transition:"color 0.5s" }}>{Math.round(enemyHpPct)}</span>
          </div>
        </div>
        <div style={{ position:"absolute", top:16, right:28, zIndex:8, animation: enemyDefeated ? "defeated 0.8s ease-in forwards" : enemyHit ? "eShake 0.35s ease" : "none", filter: enemyDefeated ? "grayscale(1) brightness(0.5)" : enemyHit ? "brightness(5) saturate(0) drop-shadow(0 0 12px #fff)" : "drop-shadow(0 6px 16px "+t.accentColor+"55)" }}>
          {renderEnemy()}
          {enemyHit && <div style={{ position:"absolute", top:"5%", left:"5%", width:"90%", height:"90%", borderRadius:"50%", background:"radial-gradient(circle,"+(proj?.color||eFlavour.color)+"cc,transparent 70%)", animation:"splat 0.4s ease-out forwards", pointerEvents:"none", zIndex:20 }}/>}
        </div>
        <div style={{ position:"absolute", bottom:62, left:16, zIndex:8, animation: heroHit ? "heroKnock 0.38s ease" : "none", transform: heroAttack ? "translateX(24px) scaleX(1.08)" : "translateX(0)", transition: heroAttack ? "none" : "transform 0.2s", filter: heroAttack ? "drop-shadow(0 0 16px "+t.accentColor+")" : heroHit ? "drop-shadow(0 0 12px #ef4444)" : "none" }}>
          <HeroAvatar gear={gear} theme={theme} />
          {heroHit && <div style={{ position:"absolute", top:"5%", left:"5%", width:"90%", height:"90%", borderRadius:"50%", background:"radial-gradient(circle,#ef444488,transparent 70%)", animation:"splat 0.4s ease-out forwards", pointerEvents:"none", zIndex:20 }}/>}
        </div>
        <div style={{ position:"absolute", bottom:95, right:0, zIndex:10, background:"rgba(255,255,255,0.95)", borderRadius:"14px 0 0 14px", padding:"7px 10px 7px 14px", minWidth:166, boxShadow:"-3px 3px 0 rgba(0,0,0,0.3)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
            <span style={{ fontSize:10, fontWeight:900, color:"#1a1a2e", textTransform:"uppercase" }}>{heroName}</span>
            <span style={{ fontSize:8, color:"#64748b" }}>Lv.{node.id+1}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:4 }}>
            <span style={{ fontSize:7, fontWeight:900, color:"#475569" }}>HP</span>
            <div style={{ flex:1, height:5, background:"#e2e8f0", borderRadius:3, overflow:"hidden" }}><div style={{ height:"100%", width:((repTime/REP_LIMIT)*100)+"%", background:timerColor, borderRadius:3, transition:"width 0.3s ease,background 0.3s" }}/></div>
            <span style={{ fontSize:8, fontWeight:700, color:timerColor, minWidth:26, textAlign:"right" }}>{fmt(repTime)}</span>
          </div>
        </div>
        {proj && <div style={{ position:"absolute", bottom: finishing ? 100 : 118, left: finishing ? 80 : 125, zIndex:15, fontSize: finishing ? 42 : 20, animation: finishing ? "projFly 0.35s linear forwards" : "projFly 0.24s linear forwards", filter:"drop-shadow(0 0 "+(finishing?"24px":"8px")+" "+(proj?.color||"#fff")+")", pointerEvents:"none" }}>{finishing ? "🔥" : (proj?.emoji || "⚡")}</div>}
        {eProj && <div style={{ position:"absolute", top:108, right:120, zIndex:15, fontSize:18, animation:"eProjFly 0.24s linear forwards", filter:"drop-shadow(0 0 8px "+eFlavour.color+")", pointerEvents:"none" }}>{eFlavour.proj}</div>}
        {dmgNums.map(d => <div key={d.id} style={{ position:"absolute", left:d.x+"%", top:d.y+"%", zIndex:20, fontSize:15, fontWeight:900, color:d.color, textShadow:"0 1px 4px rgba(0,0,0,0.9)", animation:"dmgFloat 0.9s ease-out forwards", pointerEvents:"none" }}>-{d.val}</div>)}
        <div style={{ position:"absolute", bottom:9, left:0, right:0, zIndex:12, display:"flex", justifyContent:"center" }}>
          <div style={{ background:"rgba(0,0,0,0.75)", borderRadius:20, padding:"4px 14px", fontSize:9, fontWeight:700, color:"#e2e8f0", maxWidth:"82%", textAlign:"center", border:"1px solid rgba(255,255,255,0.1)" }}>{battleLog}</div>
        </div>
        <div style={{ position:"absolute", top:14, right:12, zIndex:15, display:"flex", alignItems:"center", gap:4 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:micStatus==="active"?"#22c55e":micStatus==="denied"?"#ef4444":"#f59e0b", boxShadow:micStatus==="active"?"0 0 6px #22c55e":"none", animation:micStatus==="requesting"?"pulse 1s infinite":"none" }}/>
          {micStatus==="active" && <span style={{ fontSize:7, color:"#64748b" }}>🎤 {beatCount}</span>}
        </div>
      </div>
      <div style={{ background:"#f8fafc", borderTop:"4px solid #1a1a2e", padding:"10px 14px", display:"flex", flexDirection:"column", gap:7, flexShrink:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:11, fontWeight:900, color:"#1a1a2e", textTransform:"uppercase" }}>{node.songName}</div>
            <div style={{ fontSize:9, color:"#64748b" }}>Rep {node.repNum}/{node.totalReps} · {node.location}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:8, color:"#94a3b8", fontWeight:700 }}>TIME LEFT</div>
            <div style={{ fontSize:18, fontWeight:900, color:timerColor, animation:repTime<30?"pulse 0.5s infinite":"none" }}>{fmt(repTime)}</div>
          </div>
        </div>
        <button onClick={handleEndBattle} style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#dc2626,#991b1b)", border:"none", borderRadius:12, color:"#fff", fontWeight:900, fontSize:13, textTransform:"uppercase", letterSpacing:2, cursor:"pointer", fontFamily:"'Courier New',monospace", boxShadow:"0 4px 0 #7f1d1d", transition:"transform 0.1s,box-shadow 0.1s" }}>{finishing ? "⭐ Finishing..." : "⚔️ End Battle"}</button>
      </div>
    </div>
  );
};

// ============================================================
// MAIN GAME SCREEN
// ============================================================
const GameScreen = ({ theme, songs, heroName, onQuit }) => {
  const t = STORY_THEMES[theme];
  const questNodes = useMemo(() => buildQuestNodes(songs, theme), [songs, theme]);
  const zones = useMemo(() => buildZones(songs), [songs]);
  const totalNodes = questNodes.length;

  const [step, setStep] = useState(0);
  const [gear, setGear] = useState({});
  const [inventory, setInventory] = useState([]);
  const [downtimeSeconds, setDowntimeSeconds] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [score, setScore] = useState(0);
  const [modal, setModal] = useState(null);
  const [isDead, setIsDead] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [hoveredSlot, setHoveredSlot] = useState(null);
  const isBattle = modal?.type === "battle";
  const activeNode = questNodes[Math.min(step, totalNodes - 1)];

  // ── Unified timer: elapsed + downtime in one interval ──
  useEffect(() => {
    if (isDead || modal?.type === "win") return;
    const id = setInterval(() => {
      setElapsedSeconds(s => s + 1);
      if (!isBattle) {
        setDowntimeSeconds(prev => {
          if (prev >= MAX_GLOBAL_TIME) { setIsDead(true); return MAX_GLOBAL_TIME; }
          return prev + 1;
        });
      }
    }, 1000);
    return () => clearInterval(id);
  }, [isDead, modal?.type, isBattle]);

  useEffect(() => {
    setIsMoving(true);
    const tid = setTimeout(() => setIsMoving(false), 1500);
    return () => clearTimeout(tid);
  }, [step]);

  const startBattle = () => setModal({ type: "battle" });
  const endBattle = (repTimeRemaining) => {
    const pointsEarned = repTimeRemaining / 60;
    setScore(prev => prev + pointsEarned);
    setGear(prev => ({ ...prev, [activeNode.item.up]: true }));
    setInventory(prev => [...prev, { ...activeNode.item, nodeId: step }]);
    setModal({ type: "loot", data: activeNode, pts: pointsEarned });
  };
  const proceedFromLoot = () => {
    setModal(null);
    if (step >= totalNodes - 1) { setModal({ type: "win" }); }
    else { setStep(s => s + 1); setIsMoving(true); setTimeout(() => setIsMoving(false), 2000); }
  };

  const totalScore = score;
  const songIdx = activeNode?.songIdx || 0;
  const downtimeRemaining = MAX_GLOBAL_TIME - downtimeSeconds;
  const inventorySlots = useMemo(() => [...Array(20)].map((_, i) => i), []);

  if (isDead) {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "#1a0000", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Courier New', monospace" }}>
        <div style={{ background: "#000", border: "2px solid #ef4444", borderRadius: 32, padding: 40, textAlign: "center", maxWidth: 280 }}>
          <div style={{ fontSize: 48, marginBottom: 16, animation: "pulse 1s infinite" }}>⚠️</div>
          <div style={{ fontWeight: 900, fontSize: 20, color: "#ef4444", textTransform: "uppercase", marginBottom: 8 }}>Downtime Expired!</div>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>30 mins of idle time used up. Back to the keys!</div>
          <div style={{ fontSize: 14, color: "#fbbf24", fontWeight: 900, marginBottom: 4 }}>Score: {totalScore.toFixed(1)} pts</div>
          <div style={{ fontSize: 11, color: "#475569", marginBottom: 24 }}>Total time: {fmt(elapsedSeconds)}</div>
          <button onClick={onQuit} style={{ background: "#ef4444", border: "none", borderRadius: 12, padding: "12px 24px", color: "#fff", fontWeight: 900, fontSize: 12, textTransform: "uppercase", cursor: "pointer" }}>Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000", color: "#f8fafc", display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "'Courier New', monospace" }}>
      <style>{`
        @keyframes twinkle { from { opacity: 0.3; } to { opacity: 1; } }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes legL { from { transform: translateY(0); } to { transform: translateY(-2px); } }
        @keyframes legR { from { transform: translateY(-2px); } to { transform: translateY(0); } }
        @keyframes scrollSlow { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scrollFast { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scrollMed  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
        @keyframes monsterIn { from { transform: translateX(80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
      <header style={{ height: "10%", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", background: "#050505", zIndex: 50, flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 7, fontWeight: 900, textTransform: "uppercase", color: "#475569", letterSpacing: 1 }}>{t.timeLabel}</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: downtimeRemaining < 300 ? "#ef4444" : "#f59e0b" }}>{fmt(downtimeRemaining)}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 7, fontWeight: 900, textTransform: "uppercase", color: "#475569", letterSpacing: 1 }}>Score</span>
          <span style={{ fontSize: 16, fontWeight: 900, color: t.accentColor, letterSpacing: 1 }}>{totalScore.toFixed(1)}<span style={{ fontSize: 8, color: "#475569", marginLeft: 2 }}>pts</span></span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ fontSize: 7, fontWeight: 900, textTransform: "uppercase", color: "#475569", letterSpacing: 1 }}>Elapsed</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: "#f8fafc" }}>{fmt(elapsedSeconds)}</span>
        </div>
      </header>
      <section style={{ height: "18%", background: "#060606", borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0, display: "flex", flexDirection: "column", padding: "4px 0 2px" }}>
        <div style={{ fontSize: 7, fontWeight: 900, textTransform: "uppercase", color: "#334155", letterSpacing: 2, padding: "0 10px", marginBottom: 2 }}>{t.mapLabel} · Node {step + 1}/{totalNodes}</div>
        <div style={{ flex: 1, overflow: "hidden" }}><AdventureMap zones={zones} currentNode={step} theme={theme} /></div>
      </section>
      <main style={{ height: "27%", background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0, padding: "8px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
        <div style={{ paddingTop: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", color: "#f8fafc", letterSpacing: 1 }}>{activeNode?.location}</div>
              <div style={{ fontSize: 9, color: "#64748b", marginTop: 1 }}>{activeNode?.songName} · Rep {activeNode?.repNum}/{activeNode?.totalReps}</div>
            </div>
          </div>
          <div style={{ marginTop: 6, fontSize: 10, color: "#64748b", fontStyle: "italic", lineHeight: 1.4 }}>A {activeNode?.enemy} blocks your path at {activeNode?.location}. Play your rep to defeat it!</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={startBattle} style={{ flex: 1, padding: "10px", background: `linear-gradient(135deg, ${t.accentColor === "#60a5fa" ? "#1d4ed8" : t.accentColor}, ${t.accentColor}cc)`, border: "none", borderRadius: 12, color: "#fff", fontWeight: 900, fontSize: 11, textTransform: "uppercase", cursor: "pointer", letterSpacing: 1, fontFamily: "'Courier New', monospace", boxShadow: `0 4px 12px ${t.accentColor}44` }}>⚔️ {t.engageBtn}</button>
          <button onClick={() => setModal({ type: "menu" })} style={{ padding: "10px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#94a3b8", fontWeight: 900, fontSize: 14, cursor: "pointer", fontFamily: "'Courier New', monospace" }}>☰</button>
        </div>
      </main>
      <section style={{ height: "20%", background: "#060606", borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0, padding: "6px 10px", display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 7, fontWeight: 900, textTransform: "uppercase", color: "#334155", letterSpacing: 2, marginBottom: 4 }}>🎒 Equipment</div>
        <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 4, alignContent: "flex-start", overflowY: "auto" }}>
          {inventorySlots.map(i => {
            const item = inventory[i];
            return (
              <button key={i} onClick={() => item && setModal({ type: "inspect", item })} style={{ width: 32, height: 32, borderRadius: 6, flexShrink: 0, border: item ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.05)", background: item ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: item ? 16 : 10, cursor: item ? "pointer" : "default", color: "rgba(255,255,255,0.1)", transition: "all 0.2s" }}>
                {item ? item.i : "·"}
              </button>
            );
          })}
        </div>
      </section>
      <footer style={{ height: "25%", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <ParallaxBg theme={theme} isMoving={isMoving && !isBattle} songIdx={songIdx} />
        {isBattle && <div style={{ position: "absolute", right: "15%", bottom: "30%", zIndex: 30, animation: "monsterIn 0.5s ease-out", fontSize: 32 }}>👾</div>}
        <div onClick={() => setModal({ type: "character" })} style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", zIndex: 40, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
          <HeroAvatar gear={gear} small theme={theme} />
          <div style={{ marginTop: 2, padding: "2px 8px", background: "rgba(0,0,0,0.6)", borderRadius: 20, fontSize: 7, fontWeight: 900, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.7)", border: `1px solid ${t.accentColor}55`, whiteSpace: "nowrap" }}>{t.heroName} {heroName} <span style={{ opacity: 0.5 }}>·</span> <span style={{ color: t.accentColor }}>⚔</span></div>
        </div>
      </footer>
      {modal?.type === "battle" && <BattleModal node={activeNode} theme={theme} heroName={heroName} gear={gear} onEndBattle={endBattle} />}
      {modal?.type === "menu" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 150, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)" }}>
          <div style={{ background: "#0f172a", border: `2px solid ${t.accentColor}44`, borderRadius: 28, padding: 28, width: "80%", maxWidth: 280, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", color: t.accentColor, letterSpacing: 3, marginBottom: 4 }}>Paused</div>
            <div style={{ fontSize: 9, color: "#475569", marginBottom: 20 }}>{t.heroName} {heroName} · Score: {totalScore.toFixed(1)} pts · Node {step + 1}/{totalNodes}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button onClick={() => setModal(null)} style={{ background: t.accentColor === "#60a5fa" ? "#1d4ed8" : t.accentColor, border: "none", borderRadius: 12, padding: "12px", color: "#000", fontWeight: 900, fontSize: 12, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Courier New', monospace" }}>▶ Resume Quest</button>
              <button onClick={() => setModal({ type: "confirmQuit" })} style={{ background: "transparent", border: "1px solid #ef444444", borderRadius: 12, padding: "12px", color: "#f87171", fontWeight: 900, fontSize: 12, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Courier New', monospace" }}>✕ Quit to Home</button>
            </div>
          </div>
        </div>
      )}
      {modal?.type === "confirmQuit" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 160, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)" }}>
          <div style={{ background: "#1a0000", border: "2px solid #ef4444", borderRadius: 28, padding: 28, width: "80%", maxWidth: 280, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>⚠️</div>
            <div style={{ fontSize: 12, fontWeight: 900, color: "#f8fafc", textTransform: "uppercase", marginBottom: 8 }}>Abandon Quest?</div>
            <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 20, lineHeight: 1.5 }}>All progress will be lost. Your score of {totalScore.toFixed(1)} pts will not be saved.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setModal({ type: "menu" })} style={{ flex: 1, background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: "12px", color: "#f8fafc", fontWeight: 900, fontSize: 11, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Courier New', monospace" }}>Cancel</button>
              <button onClick={onQuit} style={{ flex: 1, background: "#ef4444", border: "none", borderRadius: 12, padding: "12px", color: "#fff", fontWeight: 900, fontSize: 11, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Courier New', monospace" }}>Quit</button>
            </div>
          </div>
        </div>
      )}
      {modal?.type === "loot" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(16px)" }}>
          <div style={{ background: "#111", border: "2px solid #f59e0b", borderRadius: 32, padding: 32, maxWidth: 280, width: "88%", textAlign: "center" }}>
            <span style={{ fontSize: 64, display: "block", marginBottom: 12, animation: "bounce 1s infinite" }}>{modal.data.item.i}</span>
            <div style={{ fontSize: 10, fontWeight: 900, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>{t.lootTitle}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#f8fafc", textTransform: "uppercase", marginBottom: 4 }}>{modal.data.item.n}</div>
            <div style={{ fontSize: 11, color: "#64748b", fontStyle: "italic", marginBottom: 8, lineHeight: 1.4 }}>"{modal.data.item.d}"</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: t.accentColor, marginBottom: 20 }}>+{modal.pts.toFixed(1)} pts earned ⭐</div>
            <button onClick={proceedFromLoot} style={{ width: "100%", background: "#f59e0b", border: "none", borderRadius: 12, padding: "12px", color: "#000", fontWeight: 900, fontSize: 12, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Courier New', monospace" }}>Continue →</button>
          </div>
        </div>
      )}
      {modal?.type === "inspect" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 130, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setModal(null)}>
          <div style={{ background: "#151515", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 32, padding: 32, maxWidth: 260, width: "85%", textAlign: "center" }} onClick={e => e.stopPropagation()}>
            <span style={{ fontSize: 72, display: "block", marginBottom: 12 }}>{modal.item.i}</span>
            <div style={{ fontSize: 18, fontWeight: 900, color: t.accentColor, textTransform: "uppercase", marginBottom: 6 }}>{modal.item.n}</div>
            <div style={{ fontSize: 11, color: "#94a3b8", fontStyle: "italic", lineHeight: 1.5 }}>"{modal.item.d}"</div>
          </div>
        </div>
      )}
      {modal?.type === "character" && (()=>{ const allSlots=t.items; const equippedCount=allSlots.filter(s=>gear[s.up]).length; return (
        <div style={{ position:"fixed", inset:0, zIndex:140, background:"rgba(0,0,0,0.92)", display:"flex", alignItems:"flex-end", justifyContent:"center", backdropFilter:"blur(10px)" }} onClick={() => { setModal(null); setHoveredSlot(null); }}>
          <div style={{ background:"#0a0a0f", border:`1.5px solid ${t.accentColor}55`, borderRadius:"28px 28px 0 0", width:"100%", maxWidth:480, maxHeight:"88vh", display:"flex", flexDirection:"column", overflow:"hidden" }} onClick={e => e.stopPropagation()}>
            <div style={{ padding:"16px 20px 10px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
              <div>
                <div style={{ fontSize:11, fontWeight:900, textTransform:"uppercase", letterSpacing:3, color:t.accentColor }}>Character</div>
                <div style={{ fontSize:18, fontWeight:900, color:"#f8fafc", marginTop:1 }}>{heroName}</div>
                <div style={{ fontSize:9, color:"#475569", marginTop:1 }}>{t.heroName} · {equippedCount}/{allSlots.length} items · {totalScore.toFixed(1)} pts</div>
              </div>
              <div style={{ flexShrink:0 }}><HeroAvatar gear={gear} theme={theme} /></div>
            </div>
            <div style={{ padding:"10px 16px", borderBottom:"1px solid rgba(255,255,255,0.06)", minHeight:62, flexShrink:0, display:"flex", alignItems:"center", gap:12 }}>
              {hoveredSlot ? (() => {
                const isEquipped = !!gear[hoveredSlot.up], isEarned = inventory.some(i => i.up === hoveredSlot.up);
                return (<>
                  <span style={{ fontSize:30, flexShrink:0 }}>{hoveredSlot.i}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:11, fontWeight:900, color: isEquipped ? t.accentColor : isEarned ? "#94a3b8" : "#475569", textTransform:"uppercase", letterSpacing:1 }}>
                      {hoveredSlot.n}<span style={{ marginLeft:6, fontSize:9, fontWeight:700, color: isEquipped ? "#22c55e" : isEarned ? "#64748b" : "#334155" }}>{isEquipped ? "✓ Equipped" : isEarned ? "○ Unequipped" : "· Not earned"}</span>
                    </div>
                    <div style={{ fontSize:9, color:"#64748b", fontStyle:"italic", lineHeight:1.4, marginTop:2 }}>{hoveredSlot.d}</div>
                  </div>
                  {isEquipped && <button onClick={() => { setGear(g => { const n={...g}; delete n[hoveredSlot.up]; return n; }); setHoveredSlot(null); }} style={{ flexShrink:0, padding:"6px 10px", background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.35)", borderRadius:8, color:"#f87171", fontSize:9, fontWeight:900, textTransform:"uppercase", letterSpacing:0.5, cursor:"pointer", fontFamily:"'Courier New',monospace", whiteSpace:"nowrap" }}>Unequip</button>}
                  {!isEquipped && isEarned && <button onClick={() => { setGear(g => ({ ...g, [hoveredSlot.up]: true })); setHoveredSlot(null); }} style={{ flexShrink:0, padding:"6px 10px", background:`${t.accentColor}22`, border:`1px solid ${t.accentColor}66`, borderRadius:8, color:t.accentColor, fontSize:9, fontWeight:900, textTransform:"uppercase", letterSpacing:0.5, cursor:"pointer", fontFamily:"'Courier New',monospace", whiteSpace:"nowrap" }}>Re-equip</button>}
                </>);
              })() : <div style={{ fontSize:9, color:"#334155", fontStyle:"italic" }}>Tap an item to inspect it</div>}
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"12px 14px 20px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                {allSlots.map((slot) => {
                  const equipped = !!gear[slot.up], earned = inventory.some(i => i.up === slot.up), isSelected = hoveredSlot?.up === slot.up, isUpgrade = slot.up.endsWith("_up");
                  const bg = equipped ? (isSelected ? `${t.accentColor}30` : `${t.accentColor}12`) : earned ? (isSelected ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.05)") : (isSelected ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.015)");
                  const bd = equipped ? `1.5px solid ${t.accentColor}${isSelected?"dd":"44"}` : earned ? `1.5px dashed rgba(255,255,255,${isSelected?"0.4":"0.2"})` : `1.5px solid rgba(255,255,255,${isSelected?"0.10":"0.04"})`;
                  return (
                    <button key={slot.up} onClick={() => setHoveredSlot(s => s?.up === slot.up ? null : slot)} style={{ background:bg, border:bd, borderRadius:12, padding:"10px 6px 8px", display:"flex", flexDirection:"column", alignItems:"center", gap:4, cursor: (equipped||earned) ? "pointer" : "default", transition:"all 0.12s", position:"relative", opacity: equipped ? 1 : earned ? 0.75 : 0.28, fontFamily:"'Courier New',monospace" }}>
                      {isUpgrade && <div style={{ position:"absolute", top:3, right:5, fontSize:7, color: equipped ? "#fbbf24" : earned ? "#94a3b8" : "#2d3748", fontWeight:900 }}>▲</div>}
                      {equipped && <div style={{ position:"absolute", top:5, left:5, width:6, height:6, borderRadius:"50%", background:t.accentColor, boxShadow:`0 0 4px ${t.accentColor}` }}/>}
                      {earned && !equipped && <div style={{ position:"absolute", top:5, left:5, width:6, height:6, borderRadius:"50%", border:"1.5px solid #64748b" }}/>}
                      <span style={{ fontSize:20, filter: equipped ? "none" : earned ? "saturate(0.4)" : "grayscale(1) brightness(0.35)" }}>{slot.i}</span>
                      <div style={{ fontSize:7, fontWeight:900, color: equipped ? "#e2e8f0" : earned ? "#64748b" : "#2d3748", textAlign:"center", lineHeight:1.25, textTransform:"uppercase", letterSpacing:0.4 }}>{slot.n}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={{ padding:"10px 16px 20px", borderTop:"1px solid rgba(255,255,255,0.07)", flexShrink:0 }}>
              <button onClick={() => { setModal(null); setHoveredSlot(null); }} style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"11px", color:"#64748b", fontWeight:900, fontSize:11, textTransform:"uppercase", letterSpacing:1, cursor:"pointer", fontFamily:"'Courier New',monospace" }}>Close</button>
            </div>
          </div>
        </div>
      ); })()}
      {modal?.type === "win" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#020617", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#fff", borderRadius: 48, padding: 40, maxWidth: 320, width: "100%", textAlign: "center", borderBottom: "16px solid #d97706" }}>
            <div style={{ fontSize: 64, animation: "bounce 1s infinite", marginBottom: 12 }}>{t.winItem}</div>
            <div style={{ fontSize: 14, fontWeight: 900, color: "#92400e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t.winTitle}</div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{t.winMsg}</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "#1d4ed8", marginBottom: 6 }}>Time: {fmt(elapsedSeconds)}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#f59e0b", marginBottom: 20 }}>🏆 {totalScore.toFixed(1)} pts = {Math.floor(totalScore)} mins screen time!</div>
            <button onClick={onQuit} style={{ width: "100%", background: "#0f172a", border: "none", borderRadius: 16, padding: "14px", color: "#fff", fontWeight: 900, fontSize: 12, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Courier New', monospace" }}>{t.restartBtn}</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// ROOT APP
// ============================================================
function App() {
  const [screen, setScreen] = useState("home");
  const [theme, setTheme] = useState("space");
  const [songs, setSongs] = useState(DEFAULT_SONGS);
  const [heroName, setHeroName] = useState("Caslu");
  const [modal, setModal] = useState(null);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {screen === "home" ? (
        <HomeScreen theme={theme} songs={songs} heroName={heroName} onStart={() => setScreen("game")} onEditSongs={() => setModal("editSongs")} onChooseStory={() => setModal("chooseStory")} onSettings={() => setModal("settings")} />
      ) : (
        <GameScreen key={`${theme}-${songs.map(s=>s.id+s.reps).join("-")}`} theme={theme} songs={songs} heroName={heroName} onQuit={() => setScreen("home")} />
      )}
      {modal === "editSongs" && <EditSongModal songs={songs} onSave={setSongs} onClose={() => setModal(null)} />}
      {modal === "chooseStory" && <StoryModal current={theme} onSelect={setTheme} onClose={() => setModal(null)} />}
      {modal === "settings" && <SettingsModal heroName={heroName} onSave={setHeroName} onClose={() => setModal(null)} />}
    </div>
  );
}

// ── Mount ──
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
