"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1179],{1179:(F,p,r)=>{r.r(p),r.d(p,{CarteiraPageModule:()=>k});var d=r(177),f=r(4341),g=r(9465),m=r(897),v=r(467),h=r(8866),n=r(3953),u=r(1626),x=r(5312);let C=(()=>{var e;class a{constructor(t){this.http=t,this.apiUrl=x.c.baseApiUrl}getHome(t){return(new u.Lr).set("Authorization",`Bearer ${t}`),this.http.get(`${this.apiUrl}carteira?token=${t}`)}}return(e=a).\u0275fac=function(t){return new(t||e)(n.KVO(u.Qq))},e.\u0275prov=n.jDH({token:e,factory:e.\u0275fac,providedIn:"root"}),a})();var b=r(2872);function P(e,a){if(1&e&&(n.j41(0,"div"),n.nrm(1,"h2",20),n.k0s()),2&e){const o=n.XpG();n.R7$(),n.Y8G("innerHTML","R$ "+o.saldoTotalGeral,n.npT)}}function _(e,a){if(1&e&&(n.j41(0,"div",23)(1,"div",24),n.nrm(2,"img",25),n.j41(3,"div",26)(4,"div",27)(5,"h5",28),n.EFF(6),n.k0s(),n.j41(7,"h5",29),n.EFF(8),n.k0s()(),n.j41(9,"div",30)(10,"p",31),n.EFF(11),n.k0s(),n.nrm(12,"ion-icon",32),n.j41(13,"p",33),n.EFF(14),n.k0s()()()()()),2&e){const o=n.XpG().$implicit;n.R7$(2),n.Y8G("src",o.imagem_banco_origem,n.B4B),n.R7$(4),n.JRh(o.nome_banco_origem),n.R7$(2),n.SpI("R$ ",o.valor,""),n.R7$(3),n.JRh(o.descricao),n.R7$(),n.Y8G("ngClass",o.valor>0?"value-positive":"value-negative"),n.R7$(2),n.JRh(o.porcentagem)}}function M(e,a){if(1&e&&(n.j41(0,"div",23)(1,"div",24),n.nrm(2,"img",25),n.j41(3,"div",26)(4,"div",27)(5,"h5",28),n.EFF(6),n.k0s(),n.j41(7,"h5",29),n.EFF(8),n.k0s()(),n.j41(9,"div",30)(10,"p",31),n.EFF(11),n.k0s(),n.nrm(12,"ion-icon",32),n.j41(13,"p",33),n.EFF(14),n.k0s()()()()()),2&e){const o=n.XpG().$implicit;n.R7$(2),n.Y8G("src",o.imagem_banco_destino,n.B4B),n.R7$(4),n.JRh(o.nome_banco_destino),n.R7$(2),n.SpI("R$ ",o.valor,""),n.R7$(3),n.JRh(o.descricao),n.R7$(),n.Y8G("ngClass",o.valor>0?"value-positive":"value-negative"),n.R7$(2),n.JRh(o.porcentagem)}}function y(e,a){if(1&e&&(n.j41(0,"div",21),n.DNE(1,_,15,6,"div",22)(2,M,15,6,"div",22),n.k0s()),2&e){const o=a.$implicit;n.R7$(),n.Y8G("ngIf",o.valor<0),n.R7$(),n.Y8G("ngIf",o.valor>0)}}const O=[{path:"",component:(()=>{var e;class a{constructor(t,i,l){this.tran=t,this.formBuilder=i,this.navCtrl=l,this.carteira=[],this.saldoTotalGeral=[],this.nome_banco_origem="",this.nome_banco_destino="",this.imagem_banco_origem="",this.imagem_banco_destino="",this.condicao=!0}ngOnInit(){var t=this;this.decodeToken();const i=localStorage.getItem("token");i?this.tran.getHome(i).subscribe(function(){var l=(0,v.A)(function*(c){c&&c.totalGeral&&Array.isArray(c.resultPorcentAndQuery)?(t.saldoTotalGeral=c.totalGeral,t.carteira=c.resultPorcentAndQuery.map(s=>({saldoTotalGeral:s.saldoTotalGeral,porcentagem:s.porcentagem,descricao:s.descricao,nome_banco_origem:s.nome_banco_origem,nome_banco_destino:s.nome_banco_destino,imagem_banco_origem:s.imagem_banco_origem,imagem_banco_destino:s.imagem_banco_destino,valor:s.valor,imageBank:s.imagem_banco_origem,detailsVisible:!1}))):console.error("Dados inv\xe1lidos retornados da API:",c)});return function(c){return l.apply(this,arguments)}}(),l=>{console.error("Erro ao buscar dados da API",l)}):console.error("Token n\xe3o encontrado."),console.log(this.saldoTotalGeral)}onScroll(){document.querySelectorAll(".container-global").forEach(i=>{i.getBoundingClientRect().top<window.innerHeight-50&&i.classList.add("scroll-smooth")})}decodeToken(){const t=localStorage.getItem("token");if(t)try{const i=(0,h.s)(t);i&&i.id&&(this.id=i.id)}catch(i){console.error("Erro ao decodificar o token:",i)}}toggleDetails(t){t.detailsVisible=!t.detailsVisible}}return(e=a).\u0275fac=function(t){return new(t||e)(n.rXU(C),n.rXU(f.ok),n.rXU(b.q9))},e.\u0275cmp=n.VBU({type:e,selectors:[["app-carteira"]],hostBindings:function(t,i){1&t&&n.bIt("scroll",function(c){return i.onScroll(c)},!1,n.tSv)},decls:31,vars:2,consts:[[1,"container-global"],[1,"scrollable-content"],[1,"header-carteira"],[1,"title-point"],[1,"title-direita"],[1,"circle"],["src","../../assets/image/Dark.png","alt",""],[1,"title-junto"],[4,"ngIf"],[1,"footer"],[1,"coluna"],[1,"bancos"],["routerLink","/tabs/meus-bancos",2,"text-decoration","none","color","#ffffff"],[1,"circle-bancos"],["src","../../assets/image/banco.png","alt","Banco"],[1,"impressoes"],["routerLink","/tabs/impressao-extrato",2,"text-decoration","none","color","#ffffff"],["src","../../assets/image/impressao.png","alt","Impress\xe3o"],[1,"relatorio-total"],["class","banco-entrada",4,"ngFor","ngForOf"],[3,"innerHTML"],[1,"banco-entrada"],["class","descricao",4,"ngIf"],[1,"descricao"],[1,"grid"],[1,"img-bank",3,"src"],[1,"cada"],[1,"nome-desc"],[1,"nome-banco"],[1,"valor"],[1,"valor-aum"],[1,"p-desc"],["name","chevron-down-outline",3,"ngClass"],[1,"porcentagem"]],template:function(t,i){1&t&&(n.j41(0,"ion-content")(1,"div",0)(2,"div",1)(3,"div",2)(4,"div",3)(5,"h1"),n.EFF(6,"Saldo total"),n.k0s(),n.j41(7,"div",4)(8,"div",5),n.nrm(9,"img",6),n.k0s(),n.j41(10,"div",7)(11,"h2"),n.EFF(12,"Banco Flux"),n.k0s(),n.DNE(13,P,2,1,"div",8),n.k0s()()(),n.j41(14,"div",9)(15,"div",10)(16,"div",11)(17,"a",12)(18,"div",13),n.nrm(19,"img",14),n.j41(20,"p"),n.EFF(21,"Bancos"),n.k0s()()()(),n.j41(22,"div",15)(23,"a",16)(24,"div",13),n.nrm(25,"img",17),n.j41(26,"p"),n.EFF(27,"Impress\xf5es"),n.k0s()()()()(),n.j41(28,"h4",18),n.EFF(29,"Relat\xf3rio Total"),n.k0s(),n.DNE(30,y,3,2,"div",19),n.k0s()()()()()),2&t&&(n.R7$(13),n.Y8G("ngIf",i.saldoTotalGeral&&i.saldoTotalGeral.length>0),n.R7$(17),n.Y8G("ngForOf",i.carteira))},dependencies:[d.YU,d.Sq,d.bT,g.W9,g.iq,g.oY,m.Wk],styles:["*[_ngcontent-%COMP%]{font-family:Poppins,sans-serif}ion-content[_ngcontent-%COMP%]{--offset-bottom: 0 !important;--overflow: auto;background-color:#000;overflow-y:hidden}.container-global[_ngcontent-%COMP%]{display:flex;flex-direction:column;box-sizing:border-box;min-height:100vh;max-height:100vh}.scrollable-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex-grow:1;box-sizing:border-box}.header-carteira[_ngcontent-%COMP%]{background-color:#000e5a;border-bottom-left-radius:0;border-bottom-right-radius:0;width:100%;height:300px}.title-point[_ngcontent-%COMP%]{display:flex;flex-direction:column}.title-point[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:20px}.circle[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background-color:#fff;border-radius:50px;width:65px;height:65px;margin-top:5px;margin-bottom:5px;margin-left:35px}.circle[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:50%;width:100%;height:50px}.title-direita[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}.title-junto[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-left:20px}.title-junto[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{padding:0;margin:0}.footer[_ngcontent-%COMP%]{border-radius:40px 40px 0 0;width:100%;margin-top:70px;padding-top:20px;background-color:#000;text-align:center}.coluna[_ngcontent-%COMP%]{display:flex;justify-content:space-around;margin-bottom:20px}.coluna-aum[_ngcontent-%COMP%]{display:flex;flex-direction:column}.circle-bancos[_ngcontent-%COMP%]{width:150px;height:50px;border-radius:50px;overflow:hidden;display:flex;justify-content:center;align-items:center;background-color:#1a1d1d;margin:auto}.relatorio-total[_ngcontent-%COMP%]{margin-top:20px;display:flex;justify-content:start;text-indent:1em}.circle-bancos[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;max-height:100%;margin-right:10px}.impressoes[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.impressoes[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:10px;font-size:14px}.bancos[_ngcontent-%COMP%]{font-size:14px}.circle-bancos[_ngcontent-%COMP%]:active{background-color:#0e0f0f;transition:.1s ease-in}.banco-entrada[_ngcontent-%COMP%]{display:flex;align-items:flex-start;background-color:#000;border-radius:10px;box-shadow:0 2px 4px #0000001a;padding:10px;margin-bottom:10px}.banco-entrada[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:50%;width:50px;height:50px;margin-right:20px}.descricao[_ngcontent-%COMP%]{display:flex;flex-direction:column}.cada[_ngcontent-%COMP%]{transform:translateY(-15px)}.grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(1,60px 200px) 60px 200px;grid-template-rows:30px 40px}.nome-desc[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:40vh}h5.nome-banco[_ngcontent-%COMP%]{display:inline-flex;width:25vh;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.nome-desc[_ngcontent-%COMP%]{display:flex;font-size:20px;margin:0}h5.valor[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.valor-aum[_ngcontent-%COMP%]{width:40vh;display:grid;grid-template-columns:180px 40px 200px}.img-bank[_ngcontent-%COMP%]{object-fit:cover}.valor-aum[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:flex;align-items:flex-end;font-size:14px;color:#666;margin:0 5px}ion-icon.value-negative[_ngcontent-%COMP%]{position:relative;color:#ff6464;font-size:18px;justify-content:flex-end;align-content:end;margin:0 25px}ion-icon.value-positive[_ngcontent-%COMP%]{position:relative;color:#2bb068;font-size:18px;justify-content:flex-end;align-content:end;margin:0 25px;transform:rotate(180deg)}"]}),a})()}];let j=(()=>{var e;class a{}return(e=a).\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.$C({type:e}),e.\u0275inj=n.G2t({imports:[m.iI.forChild(O),m.iI]}),a})(),k=(()=>{var e;class a{}return(e=a).\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.$C({type:e}),e.\u0275inj=n.G2t({imports:[d.MD,f.YN,g.bv,j]}),a})()}}]);