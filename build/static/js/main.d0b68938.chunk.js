(this["webpackJsonpdrum-machine"]=this["webpackJsonpdrum-machine"]||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(7),s=a.n(c),i=(a(13),a(1)),o=a(2),d=a(4),l=a(3),m=(a(6),function(e){Object(d.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleKeyDown=function(e){e.keyCode==n.props.letter.charCodeAt()&&n.handleClick()},n.handleClick=function(){n.audio.play(),n.audio.currentTime=0,n.props.handleDisplay(n.props.id)},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keycode",this.handleKeyDown)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"drum-pad",id:this.props.id,onClick:this.handleClick},r.a.createElement("h2",null," ",this.props.letter," "),r.a.createElement("audio",{id:this.props.letter,src:this.props.src,className:"clip",ref:function(t){return e.audio=t}}))}}]),a}(r.a.Component)),p=[{id:"Heater-1",letter:"Q",src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},{id:"Heater-2",letter:"W",src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},{id:"Heater-3",letter:"E",src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},{id:"Heater-4",letter:"A",src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},{id:"Clap",letter:"S",src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},{id:"Open-HH",letter:"D",src:"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"}],u=function(e){Object(d.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleDisplay=function(e){return n.setState({display:e})},n.state={display:"Click a button on a keyboard!"},n}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"drum-machine"},r.a.createElement("div",{id:"display"},this.state.display),r.a.createElement("div",{id:"drum-pads"},p.map((function(t){return r.a.createElement(m,{id:t.id,letter:t.letter,src:t.src,handleDisplay:e.handleDisplay})}))))}}]),a}(r.a.Component);s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(u,null)),document.getElementById("root"))},6:function(e,t,a){},8:function(e,t,a){e.exports=a(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.d0b68938.chunk.js.map