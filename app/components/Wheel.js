import React from 'react';

export default function Wheel({onWheelClick, ...otherProps}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 376.27 376.26" width="376.27" height="376.26" {...otherProps}>
      <defs>
        <radialGradient id="a" cx={245} cy="204.4" r="189.14" gradientUnits="userSpaceOnUse">
          <stop offset="0.46" stopColor="#d43b20" />
          <stop offset={1} stopColor="#ff5c40" />
        </radialGradient>
        <radialGradient id="b" cx={245} cy="204.4" r="189.14" gradientUnits="userSpaceOnUse">
          <stop offset={0} stopColor="#9e1145" />
          <stop offset={1} stopColor="#ff3b83" />
        </radialGradient>
        <radialGradient id="c" cx={245} cy="204.4" r="189.14" gradientUnits="userSpaceOnUse">
          <stop offset={0} stopColor="#890e96" />
          <stop offset={1} stopColor="#ea30ff" />
        </radialGradient>
        <radialGradient id="d" cx={245} cy="204.4" r="189.14" gradientUnits="userSpaceOnUse">
          <stop offset="0.47" stopColor="#ff8b2c" />
          <stop offset={1} stopColor="#ffd735" />
        </radialGradient>
        <radialGradient id="e" cx={245} cy="204.4" r="189.14" gradientUnits="userSpaceOnUse">
          <stop offset="0.43" stopColor="#009899" />
          <stop offset={1} stopColor="#00e3e3" />
        </radialGradient>
        <radialGradient id="f" cx="247.59" cy="212.82" r="192.13" gradientUnits="userSpaceOnUse">
          <stop offset="0.46" stopColor="#70a100" />
          <stop offset={1} stopColor="#b7ed2c" />
        </radialGradient>
        <radialGradient id="g" cx={245} cy="204.4" r="189.14" gradientUnits="userSpaceOnUse">
          <stop offset="0.42" stopColor="#125985" />
          <stop offset={1} stopColor="#0098f2" />
        </radialGradient>
      </defs>
      <title>PrISM_Infographic</title>
      <g>
        <path d="M154,92l19.19,49.91a96.37,96.37,0,0,1,69.31-31.8l27-46-26.61-45.3A187.21,187.21,0,0,0,102.13,84.59Z" transform="translate(-56.86 -18.87)" style={{fill: 'url(#d)'}} onClick={() => {onWheelClick(1)}} />
        <path d="M319.16,144.64l52.75-7.58,18.82-49A187.23,187.23,0,0,0,251.62,19l26.54,45.2-27.06,46.11A96.44,96.44,0,0,1,319.16,144.64Z" transform="translate(-56.86 -18.87)" style={{fill: 'url(#a)'}}  onClick={() => {onWheelClick(2)}} />
        <path d="M396.12,94.92l-18.78,48.94-52.93,7.6A97,97,0,0,1,340,226.11l38.8,36.5,50.12-15.88A189.35,189.35,0,0,0,433.14,207,186,186,0,0,0,396.12,94.92Z" transform="translate(-56.86 -18.87)" style={{fill: 'url(#b)'}} onClick={() => {onWheelClick(3)}} />
        <path d="M289.29,293.2l-4.35,53.09,43.67,29.29a189.91,189.91,0,0,0,98.27-120.33l-50,15.84-38.93-36.63A97.88,97.88,0,0,1,289.29,293.2Z" transform="translate(-56.86 -18.87)" style={{fill: 'url(#c)'}} onClick={() => {onWheelClick(4)}} />
        <path d="M281.47,296.8a97.17,97.17,0,0,1-76.26-1.43L161,325.06l4.33,52.41a188.66,188.66,0,0,0,155.36,1.82L277.1,350.06Z" transform="translate(-56.86 -18.87)" style={{fill: 'url(#g)'}} onClick={() => {onWheelClick(5)}} />
        <path d="M157.47,373.57l-4.31-52.28,44.38-29.81A97.84,97.84,0,0,1,151.1,231l-50.78-16.05L62,251C74.57,303.2,109.9,348.47,157.47,373.57Z" transform="translate(-56.86 -18.87)" style={{fill: 'url(#e)'}} onClick={() => {onWheelClick(6)}} />
        <path d="M96.59,91.38A186,186,0,0,0,56.86,207a189.5,189.5,0,0,0,3.33,35.41l38.18-36,51,16.11A97.8,97.8,0,0,1,148.1,207a95.84,95.84,0,0,1,19.61-58.44L148.59,98.82Z" transform="translate(-56.86 -18.87)" style={{fill: 'url(#f)'}} onClick={() => {onWheelClick(7)}} />
      </g>
      <g>
        <path d="M236.34,55.72c0,4.85-1.9,7.88-5.5,7.88s-5.33-3.15-5.35-7.74S227.49,48,231,48,236.34,51.27,236.34,55.72Zm-8,.14c0,3.66,1,5.56,2.57,5.56s2.55-2,2.55-5.66-.83-5.56-2.55-5.56C229.41,50.2,228.34,52.08,228.37,55.86Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
        <path d="M242.6,50.85h0l-2.76,1.39-.49-2.16L243,48.27h2.39V63.34H242.6Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
        <path d="M348.53,108.72c0,4.85-1.9,7.88-5.49,7.88s-5.33-3.15-5.36-7.74,2-7.84,5.52-7.84S348.53,104.27,348.53,108.72Zm-8,.14c0,3.66,1,5.56,2.57,5.56s2.55-2,2.55-5.66-.83-5.56-2.55-5.56C341.6,103.2,340.54,105.08,340.56,108.86Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
        <path d="M350.32,116.35v-1.74L352.1,113c3.55-3.29,5.22-5.1,5.24-7.09a2.37,2.37,0,0,0-2.69-2.53,5.49,5.49,0,0,0-3.22,1.25l-.83-2a7.47,7.47,0,0,1,4.64-1.55c3.34,0,5,2.11,5,4.57,0,2.64-1.9,4.78-4.52,7.21l-1.32,1.14v0h6.19v2.36Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
        <path d="M380.33,229.49c0,4.85-1.9,7.88-5.49,7.88s-5.33-3.15-5.36-7.74,2-7.84,5.52-7.84S380.33,225,380.33,229.49Zm-8,.14c0,3.66,1,5.56,2.57,5.56s2.55-2,2.55-5.66-.83-5.57-2.55-5.57C373.4,224,372.33,225.85,372.36,229.63Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
        <path d="M382.7,234.17a7.45,7.45,0,0,0,3.43.93c2.18,0,3.06-1.23,3-2.41,0-1.78-1.67-2.55-3.41-2.55h-1.32v-2.09h1.27c1.32,0,3-.6,3-2.11,0-1-.77-1.88-2.41-1.88a6,6,0,0,0-3.08,1l-.65-2.06a8.14,8.14,0,0,1,4.34-1.16c3.11,0,4.7,1.72,4.7,3.69a3.68,3.68,0,0,1-2.78,3.52v0a3.8,3.8,0,0,1,3.32,3.76c0,2.55-2.13,4.57-5.87,4.57a8.23,8.23,0,0,1-4.22-1Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
        <path d="M305.24,330c0,4.85-1.9,7.88-5.49,7.88s-5.33-3.15-5.35-7.74,2-7.84,5.52-7.84S305.24,325.57,305.24,330Zm-8,.14c0,3.66,1,5.56,2.57,5.56s2.55-2,2.55-5.66-.83-5.57-2.55-5.57C298.31,324.5,297.24,326.38,297.27,330.16Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
        <path d="M313.31,337.65v-3.82h-6.82V332l6.14-9.39H316v9.09h1.95v2.15H316v3.82Zm0-6v-4.1c0-.86,0-1.74.09-2.62h-.09c-.46,1-.86,1.72-1.32,2.55l-2.76,4.13,0,0Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
        <path d="M179.75,336.78c0,4.85-1.9,7.88-5.49,7.88s-5.33-3.15-5.36-7.74,2-7.84,5.52-7.84S179.75,332.33,179.75,336.78Zm-8,.14c0,3.66,1,5.56,2.57,5.56s2.55-2,2.55-5.66-.83-5.56-2.55-5.56C172.81,331.26,171.75,333.14,171.77,336.92Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
        <path d="M191.1,331.7h-5.79l-.44,3a7.86,7.86,0,0,1,1.09-.07,6.71,6.71,0,0,1,3.66,1,4.32,4.32,0,0,1,2,3.82c0,2.88-2.39,5.22-6.1,5.22a8.67,8.67,0,0,1-4-.88l.58-2.16a7.61,7.61,0,0,0,3.31.79c1.67,0,3.27-.95,3.27-2.76s-1.28-2.85-4.29-2.85a12.91,12.91,0,0,0-2.06.14l1-7.61h7.79Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
        <path d="M98.4,235.31c0,4.85-1.9,7.88-5.49,7.88s-5.33-3.15-5.36-7.74,2-7.84,5.52-7.84S98.4,230.86,98.4,235.31Zm-8,.14c0,3.66,1,5.56,2.57,5.56s2.55-2,2.55-5.66-.83-5.56-2.55-5.56C91.47,229.79,90.4,231.67,90.43,235.45Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
        <path d="M109.37,229.89a11.53,11.53,0,0,0-1.46.07,5.34,5.34,0,0,0-5.05,4.41h.07a4.34,4.34,0,0,1,3.39-1.46c2.6,0,4.61,1.86,4.61,4.92a5.23,5.23,0,0,1-5.31,5.38c-3.66,0-5.68-2.78-5.68-6.49a9.23,9.23,0,0,1,2.62-6.77,8.73,8.73,0,0,1,5.36-2.23,8,8,0,0,1,1.44,0ZM108,238c0-1.74-1-3-2.62-3a2.77,2.77,0,0,0-2.46,1.55,1.93,1.93,0,0,0-.19.9c0,2,1,3.62,2.83,3.62C107.07,241.06,108,239.79,108,238Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
        <path d="M119.31,115.09c0,4.85-1.9,7.88-5.5,7.88s-5.33-3.15-5.35-7.74,2-7.84,5.52-7.84S119.31,110.64,119.31,115.09Zm-8,.14c0,3.66,1,5.56,2.57,5.56s2.55-2,2.55-5.66-.83-5.56-2.55-5.56C112.37,109.58,111.31,111.45,111.33,115.23Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
        <path d="M131.45,107.65v1.83l-6.37,13.24h-3l6.35-12.66v0h-7.09v-2.37Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} />
      </g>
      <g style={{opacity: '0.2'}}>
        <path d="M371.21,137.16l.7-.1,18.82-49A187.23,187.23,0,0,0,251.62,19l26.54,45.2-1.73,3A143.49,143.49,0,0,1,371.21,137.16Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} onClick={() => {onWheelClick(2)}} />
        <path d="M378.49,262.32l.32.3,50.12-15.88A189.35,189.35,0,0,0,433.14,207a186,186,0,0,0-37-112.08l-18.78,48.94-2.42.35a143.59,143.59,0,0,1,3.58,118.11Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} onClick={() => {onWheelClick(3)}} />
        <path d="M285,345.16l-.09,1.13,43.67,29.29a189.91,189.91,0,0,0,98.27-120.33l-50,15.84-1.64-1.54A143.64,143.64,0,0,1,285,345.16Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} onClick={() => {onWheelClick(4)}} />
        <path d="M268.59,65.67l.88-1.5-26.61-45.3A187.21,187.21,0,0,0,102.13,84.59L154,92l1.6,4.17A142.68,142.68,0,0,1,246.2,63.92,144.32,144.32,0,0,1,268.59,65.67Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} onClick={() => {onWheelClick(1)}} />
        <path d="M103.18,215.83l-2.87-.91L62,251c12.53,52.22,47.86,97.5,95.43,122.59l-4.31-52.28,3.42-2.3A143,143,0,0,1,103.18,215.83Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} onClick={() => {onWheelClick(6)}} />
        <path d="M149.58,101.4l-1-2.58-52-7.44A186,186,0,0,0,56.86,207a189.5,189.5,0,0,0,3.33,35.41l38.18-36,4.55,1.44c0-.23,0-.45,0-.68A142.9,142.9,0,0,1,149.58,101.4Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} onClick={() => {onWheelClick(7)}} />
        <path d="M162.89,323.79l-1.9,1.28,4.33,52.41a188.66,188.66,0,0,0,155.36,1.82L277.1,350.06l.24-3a143.53,143.53,0,0,1-114.45-23.29Z" transform="translate(-56.86 -18.87)" style={{fill: '#fff'}} onClick={() => {onWheelClick(5)}} />
      </g>
      <text transform="translate(106.49 194.06)" style={{fontSize: 12, fill: '#fff', fontFamily: 'AvenirNext-Regular, Avenir Next'}}>*Suppo<tspan x="41.64" y={0} style={{letterSpacing: '-0.012044270833333334em'}}>r</tspan>
      <tspan x="45.82" y={0}>ts a Ci</tspan>
      <tspan x={79} y={0} style={{letterSpacing: '-0.01806640625em'}}>r</tspan>
      <tspan x="83.1" y={0}>cular Economy</tspan>
      <tspan x="-4.56" y="14.4">*C</tspan>
      <tspan x="9.41" y="14.4" style={{letterSpacing: '-0.017985026041666668em'}}>r</tspan>
      <tspan x="13.51" y="14.4" style={{letterSpacing: '-0.006022135416666667em'}}>e</tspan>
      <tspan x="20.3" y="14.4" style={{letterSpacing: '-0.010009765625em'}}>a</tspan>
      <tspan x="26.59" y="14.4">tes Life-friendly Chemistry</tspan>
      <tspan x="13.75" y="28.8">*</tspan>
      <tspan x="19.07" y="28.8" style={{letterSpacing: '-0.012044270833333334em'}}>R</tspan>
      <tspan x="26.12" y="28.8" style={{letterSpacing: '-0.00008138020833333333em'}}>esto</tspan>
      <tspan x="49.45" y="28.8" style={{letterSpacing: '-0.017985026041666668em'}}>r</tspan>
      <tspan x="53.55" y="28.8" style={{letterSpacing: '-0.00008138020833333333em'}}>es N</tspan>
      <tspan x="77.91" y="28.8" style={{letterSpacing: '-0.010009765625em'}}>a</tspan>
      <tspan x="84.2" y="28.8">tu</tspan>
      <tspan x="94.97" y="28.8" style={{letterSpacing: '-0.011962890625em'}}>r</tspan>
      <tspan x="99.15" y="28.8">al </tspan>
      <tspan x="111.58" y="28.8" style={{letterSpacing: '-0.017985026041666668em'}}>C</tspan>
      <tspan x={120} y="28.8" style={{letterSpacing: '-0.00008138020833333333em'}}>apital</tspan>
      <tspan x="23.89" y="43.2">*Suppo</tspan>
      <tspan x="65.53" y="43.2" style={{letterSpacing: '-0.011962890625em'}}>r</tspan>
      <tspan x="69.7" y="43.2">ts a</tspan>
      <tspan x="88.24" y="43.2" style={{letterSpacing: '-0.012044270833333334em'}}></tspan>
      <tspan x="91.1" y="43.2">Just and </tspan>
      <tspan x="58.44" y="57.6">Inclusive</tspan>
      <tspan x="62.2" y={72}>Society</tspan>
    </text>
    <text transform="translate(152.1 129.82)" style={{fontSize: 18, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>
      <tspan style={{letterSpacing: '-0.045952690972222224em'}}>P</tspan>
      <tspan x="10.15" y={0}>rISM™:</tspan>
      <tspan x="-42.47" y="21.6" style={{letterSpacing: '-0.045952690972222224em'}}>P</tspan>
      <tspan x="-32.32" y="21.6" style={{letterSpacing: '-0.018012152777777776em'}}>r</tspan>
      <tspan x="-26.09" y="21.6">oduct Innov</tspan>
      <tspan x="72.42" y="21.6" style={{letterSpacing: '-0.009928385416666666em'}}>a</tspan>
      <tspan x="82.14" y="21.6" style={{letterSpacing: '-0.00005425347222222222em'}}>tion</tspan>
      <tspan x="-37.92" y="43.2">&amp; Social Mapping</tspan>
    </text>
    <text onClick={() => {onWheelClick(1)}} transform="translate(111.61 33.94)" style={{fontSize: 12, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>DESIGN <tspan x={0} y="14.4">G</tspan>
    <tspan x="9.28" y="14.4" style={{letterSpacing: '-0.01806640625em'}}>O</tspan>
    <tspan x="19.25" y="14.4">ALS</tspan>
    </text>
    <text onClick={() => {onWheelClick(2)}} transform="translate(226.07 48.73)" style={{fontSize: 12, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>FEED<tspan x="30.68" y={0} style={{letterSpacing: '-0.015950520833333332em'}}>S</tspan>
    <tspan x="37.38" y={0} style={{letterSpacing: '-0.030029296875em'}}>T</tspan>
    <tspan x="43.83" y={0} style={{letterSpacing: '0.00008138020833333333em'}}>OC</tspan>
    <tspan x="62.38" y={0} style={{letterSpacing: '-0.011962890625em'}}>K</tspan>
    </text>
    <text onClick={() => {onWheelClick(3)}} transform="translate(285.82 149.27)" style={{fontSize: 12, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>PRODU<tspan x="42.79" y={0} style={{letterSpacing: '-0.006022135416666667em'}}>C</tspan>
    <tspan x="51.07" y={0}>TION</tspan>
    </text>
    <text onClick={() => {onWheelClick(4)}} transform="translate(274.87 263.91)" style={{fontSize: 12, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>USE</text>
    <text onClick={() => {onWheelClick(5)}} transform="translate(141.27 322.72)" style={{fontSize: 12, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>END OF LIFE</text>
    <text onClick={() => {onWheelClick(6)}} transform="translate(27.16 238.43)" style={{fontSize: 12, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>WHOLE <tspan x={0} y="14.4">PRODU</tspan>
    <tspan x="42.79" y="14.4" style={{letterSpacing: '-0.006022135416666667em'}}>C</tspan>
    <tspan x="51.07" y="14.4" style={{letterSpacing: '-0.024007161458333332em'}}>T</tspan>
    </text>
    <text  onClick={() => {onWheelClick(7)}} transform="translate(16 125.27)" style={{fontSize: 12, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>E<tspan x="7.32" y={0} style={{letterSpacing: '-0.029947916666666668em'}}>V</tspan>
    <tspan x="14.8" y={0}>A</tspan>
    <tspan x="23.27" y={0} style={{letterSpacing: '-0.024007161458333332em'}}>L</tspan>
    <tspan x="29.11" y={0}>UTION &amp;</tspan>
    <tspan x={0} y="14.4">O</tspan>
    <tspan x="10.19" y="14.4" style={{letterSpacing: '-0.006103515625em'}}>P</tspan>
    <tspan x="17.44" y="14.4">TIMIZ</tspan>
    <tspan x="49.39" y="14.4" style={{letterSpacing: '-0.059977213541666664em'}}>A</tspan>
    <tspan x="57.14" y="14.4">TION</tspan>
    </text>
    <text onClick={() => {onWheelClick(1)}} transform="translate(91.61 61.51)" style={{fontSize: 10, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>
    <tspan style={{letterSpacing: '-0.01201171875em'}}>C</tspan>
    <tspan x="6.84" y={0}>onsider your p</tspan>
    <tspan x="73.62" y={0} style={{letterSpacing: '-0.01796875em'}}>r</tspan>
    <tspan x="77.08" y={0}>oduct </tspan>
    <tspan x={0} y={12} xmlSpace="preserve">      f</tspan>
    <tspan x="18.24" y={12} style={{letterSpacing: '-0.01796875em'}}>r</tspan>
    <tspan x="21.7" y={12}>om a life cycle </tspan>
    <tspan x={0} y={24} xmlSpace="preserve">        perspective</tspan>
    </text>
    <text onClick={() => {onWheelClick(2)}} transform="translate(218 63.51)" style={{fontSize: 10, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>Decouple feedstock<tspan x={0} y={12}>f</tspan>
    <tspan x="3.24" y={12} style={{letterSpacing: '-0.01796875em'}}>r</tspan>
    <tspan x="6.7" y={12}>om multiple impacts</tspan>
    </text>
    <text onClick={() => {onWheelClick(3)}} transform="translate(288.26 168.9)" style={{fontSize: 10, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>Identify chemicals <tspan x={0} y={12} xmlSpace="preserve">  used/p</tspan>
    <tspan x="37.56" y={12} style={{letterSpacing: '-0.01796875em'}}>r</tspan>
    <tspan x="41.02" y={12}>oduced </tspan>
    <tspan x={0} y={24} xmlSpace="preserve">    in </tspan>
    <tspan x={21} y={24} style={{letterSpacing: '-0.0060546875em'}}>e</tspan>
    <tspan x="26.68" y={24}>ach p</tspan>
    <tspan x="51.73" y={24} style={{letterSpacing: '-0.01796875em'}}>r</tspan>
    <tspan x="55.19" y={24}>ocess</tspan>
    </text>
    <text onClick={() => {onWheelClick(4)}} transform="translate(256.54 279.15)" style={{fontSize: 10, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>
    <tspan style={{letterSpacing: '-0.00595703125em'}}>A</tspan>
    <tspan x={7} y={0}>void the use o</tspan>
    <tspan x="71.83" y={0} style={{letterSpacing: '0.02392578125em'}}>f</tspan>
    <tspan x="75.31" y={0}></tspan>
    <tspan x={0} y={12} xmlSpace="preserve"> t</tspan>
    <tspan x="5.9" y={12} style={{letterSpacing: '-0.01005859375em'}}>o</tspan>
    <tspan x="11.9" y={12}>xic chemicals </tspan>
    <tspan x={0} y={24} xmlSpace="preserve">   in p</tspan>
    <tspan x="24.83" y={24} style={{letterSpacing: '-0.01796875em'}}>r</tspan>
    <tspan x="28.29" y={24}>oducts</tspan>
    </text>
    <text onClick={() => {onWheelClick(5)}} transform="translate(142.73 341.59)" style={{fontSize: 10, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>Design for<tspan x={0} y={12}>ci</tspan>
    <tspan x="7.56" y={12} style={{letterSpacing: '-0.01796875em'}}>r</tspan>
    <tspan x="11.02" y={12}>cularity</tspan>
    </text>
    <text onClick={() => {onWheelClick(6)}} transform="translate(29.16 265.86)" style={{fontSize: 10, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>
    <tspan style={{letterSpacing: '-0.01201171875em'}}>C</tspan>
    <tspan x="6.84" y={0}>onsider safer </tspan>
    <tspan x={0} y={12} xmlSpace="preserve">  substitutes versus </tspan>
    <tspan x={0} y={24} xmlSpace="preserve">     disruptive </tspan>
    <tspan x={0} y={36} xmlSpace="preserve">      innov</tspan>
    <tspan x="40.55" y={36} style={{letterSpacing: '-0.01005859375em'}}>a</tspan>
    <tspan x="45.95" y={36}>tion</tspan>
    </text>
    <text onClick={() => {onWheelClick(7)}} transform="translate(15.68 154.82)" style={{fontSize: 10, fill: '#fff', fontFamily: 'AvenirNext-DemiBold, Avenir Next', fontWeight: 700}}>Design and <tspan x={0} y={12}>innov</tspan>
    <tspan x="25.55" y={12} style={{letterSpacing: '-0.01005859375em'}}>a</tspan>
    <tspan x="30.95" y={12}>tion </tspan>
    <tspan x={0} y={24}>a</tspan>
    <tspan x="5.5" y={24} style={{letterSpacing: '-0.01796875em'}}>r</tspan>
    <tspan x="8.96" y={24}>e ite</tspan>
    <tspan x="29.02" y={24} style={{letterSpacing: '-0.01298828125em'}}>r</tspan>
    <tspan x="32.53" y={24} style={{letterSpacing: '-0.0099609375em'}}>a</tspan>
    <tspan x="37.93" y={24}>tive</tspan>
    </text>
    </svg>
  );
}
