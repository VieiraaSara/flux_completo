"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6524],{6524:(O,g,r)=>{r.r(g),r.d(g,{MeusBancosPageModule:()=>b});var c=r(177),u=r(4341),l=r(9465),d=r(897),f=r(8866),n=r(3953),m=r(8819),x=r(2872);const h=t=>({"background-color":t,"margin-top":"20px",display:"flex","align-items":"center","border-radius":"10px","box-shadow":"0 2px 4px rgba(0, 0, 0, 0.1)",padding:"10px","margin-bottom":"10px"});function P(t,a){if(1&t&&(n.j41(0,"p",28),n.EFF(1),n.k0s()),2&t){const o=n.XpG().$implicit;n.R7$(),n.SpI(" Saldo: R$",o.Contum.saldo," ")}}function M(t,a){if(1&t&&(n.j41(0,"div",19),n.nrm(1,"img",20),n.j41(2,"div",21)(3,"div",22)(4,"h5",23),n.EFF(5),n.k0s(),n.j41(6,"div",24)(7,"h5",23),n.EFF(8),n.k0s()()(),n.j41(9,"div",25)(10,"p",26),n.EFF(11),n.k0s(),n.DNE(12,P,2,1,"p",27),n.k0s()()()),2&t){const o=a.$implicit;n.Y8G("ngStyle",n.eq3(13,h,"VALIDANDO"===o.Pix.status?"#000000":"#1A1D1D")),n.R7$(),n.Y8G("src",o.Contum.Banco.image,n.B4B)("alt",o.Contum.Banco.name),n.R7$(3),n.xc7("color","VALIDANDO"===o.Pix.status?"#DD6A00":"green"),n.R7$(),n.SpI(" ",o.Pix.key," "),n.R7$(2),n.xc7("color","VALIDANDO"===o.Pix.status?"#DD6A00":"green"),n.R7$(),n.SpI(" ",o.Pix.status," "),n.R7$(2),n.xc7("color","VALIDANDO"===o.Pix.status?"#DD6A00":"green"),n.R7$(),n.SpI(" ","VALIDANDO"===o.Pix.status?"Aguarde at\xe9 que seu banco se conecte com o FLUX":o.Contum.Banco.name," "),n.R7$(),n.Y8G("ngIf","VALIDANDO"!==o.Pix.status)}}const v=[{path:"",component:(()=>{var t;class a{constructor(e,i){this.pixService=e,this.navCtrl=i,this.chavesPix=[],this.filteredChavesPix=[],this.token=""}ngOnInit(){this.decodeToken(),this.carregarChavesPix()}decodeToken(){const e=localStorage.getItem("token");if(e)try{const i=(0,f.s)(e);i&&i.id&&(this.token=e)}catch(i){console.error("Erro ao decodificar o token:",i)}}carregarChavesPix(){this.token&&this.pixService.getChavePix(this.token).subscribe(e=>{this.chavesPix=e,this.filteredChavesPix=e},e=>{console.error("Erro ao carregar chaves Pix:",e)})}filtrarChaves(e){const i=e.target.value.toLowerCase();this.filteredChavesPix=this.chavesPix.filter(s=>s.Pix.key.toLowerCase().includes(i)),this.filteredChavesPix.sort((s,p)=>0===s.Pix.key.toLowerCase().indexOf(i)?-1:1)}filtrarPorStatusPendente(){this.filteredChavesPix=this.chavesPix.filter(e=>"VALIDANDO"===e.Pix.status)}filtrarPorMaiorSaldo(){this.filteredChavesPix=[...this.chavesPix].filter(e=>"VALIDANDO"!==e.Pix.status).sort((e,i)=>i.Contum.saldo-e.Contum.saldo)}filtrarPorMenorSaldo(){this.filteredChavesPix=[...this.chavesPix].filter(e=>"VALIDANDO"!==e.Pix.status).sort((e,i)=>e.Contum.saldo-i.Contum.saldo)}}return(t=a).\u0275fac=function(e){return new(e||t)(n.rXU(m.x),n.rXU(x.q9))},t.\u0275cmp=n.VBU({type:t,selectors:[["app-meus-bancos"]],decls:32,vars:1,consts:[[1,"container-global"],[1,"header"],["routerLink","/cadastro-banco",2,"text-decoration","none"],[1,"circle"],[1,"input-container"],["placeholder","Pesquisar Chave Pix",1,"input-pesquisa",3,"input"],[1,"linha-filtros"],[1,"coluna-bancospend",3,"click"],[1,"circle-bancospend"],["src","../../assets/image/Vector.png","alt",""],[1,"coluna-maiorsal",3,"click"],[1,"circle-maiorsal"],["src","../../assets/image/esquerda.png","alt",""],[1,"coluna-menorsal",3,"click"],[1,"circle-menorsal"],["src","../../assets/image/Vector 39.png","alt",""],[1,"scrollable-content"],[1,"footer"],["class","banco-entrada",3,"ngStyle",4,"ngFor","ngForOf"],[1,"banco-entrada",3,"ngStyle"],[1,"banco",2,"width","50px","height","50px","margin-right","10px",3,"src","alt"],[1,"descricao",2,"display","flex","flex-direction","column","width","100%"],[1,"nome-desc",2,"display","flex","align-items","center","width","100%"],[2,"margin","0"],[2,"display","flex","align-items","center","margin-left","5px"],[1,"valor-aum",2,"display","flex","align-items","center","justify-content","flex-end","margin-top","5px"],[2,"margin","0","white-space","nowrap","font-size","10px"],["style","color: green; margin-left: 10px",4,"ngIf"],[2,"color","green","margin-left","10px"]],template:function(e,i){1&e&&(n.j41(0,"ion-content")(1,"div",0)(2,"div",1)(3,"h1"),n.EFF(4,"Minhas Chaves"),n.k0s(),n.j41(5,"a",2)(6,"div",3)(7,"p"),n.EFF(8,"+"),n.k0s()()()(),n.j41(9,"div",4)(10,"input",5),n.bIt("input",function(p){return i.filtrarChaves(p)}),n.k0s()(),n.j41(11,"div",6)(12,"div",7),n.bIt("click",function(){return i.filtrarPorStatusPendente()}),n.j41(13,"div",8),n.nrm(14,"img",9),n.k0s(),n.j41(15,"p"),n.EFF(16,"Bancos "),n.nrm(17,"br"),n.EFF(18," Pendentes"),n.k0s()(),n.j41(19,"div",10),n.bIt("click",function(){return i.filtrarPorMaiorSaldo()}),n.j41(20,"div",11),n.nrm(21,"img",12),n.k0s(),n.j41(22,"p"),n.EFF(23,"Maior Saldo"),n.k0s()(),n.j41(24,"div",13),n.bIt("click",function(){return i.filtrarPorMenorSaldo()}),n.j41(25,"div",14),n.nrm(26,"img",15),n.k0s(),n.j41(27,"p"),n.EFF(28,"Menor Saldo"),n.k0s()()(),n.j41(29,"div",16)(30,"div",17),n.DNE(31,M,13,15,"div",18),n.k0s()()()()),2&e&&(n.R7$(31),n.Y8G("ngForOf",i.filteredChavesPix))},dependencies:[c.Sq,c.bT,c.B3,l.W9,l.oY,d.Wk],styles:['@charset "UTF-8";*[_ngcontent-%COMP%]{font-family:poppins}body[_ngcontent-%COMP%]{background-color:#000;height:200vh;margin:0}.container-global[_ngcontent-%COMP%]{background-color:#000;padding:20px;text-align:center;max-width:400px;width:100%}.header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:10px 20px}.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:24px;color:#fff}.circle[_ngcontent-%COMP%]{width:40px;height:40px;background-color:#1a1d1d;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer}.circle[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#66b6ff}.input-container[_ngcontent-%COMP%]{position:relative;display:inline-block;width:100%}.input-pesquisa[_ngcontent-%COMP%]{width:99%;padding-left:45px;padding-right:45px;border-radius:50px;background-color:#171c1c;border:none;color:#9395a4;font-size:18px;height:40px;box-sizing:border-box}.input-container[_ngcontent-%COMP%]:before{content:url(pesquisa.14b2d05ed2b4c1f7.png);position:absolute;left:10px;top:50%;transform:translateY(-50%);pointer-events:none}.input-container[_ngcontent-%COMP%]:after{content:url(Search\\ icon.8ab3bcf47a1edbd1.png);position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}.input-pesquisa[_ngcontent-%COMP%]::placeholder{color:#9395a4;font-family:Poppins,sans-serif}.input-pesquisa[_ngcontent-%COMP%]:focus{outline:none;border:2px solid #66B6FF}.linha-filtros[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:center;height:100%;margin-top:20px}.coluna-bancospend[_ngcontent-%COMP%]:active, .coluna-maiorsal[_ngcontent-%COMP%]:active, .coluna-menorsal[_ngcontent-%COMP%]:active{background-color:#0e0f0f;transition:.1s ease-out}.coluna-bancospend[_ngcontent-%COMP%], .coluna-maiorsal[_ngcontent-%COMP%], .coluna-menorsal[_ngcontent-%COMP%]{border-radius:20px;background-color:#1a1d1d;width:100%;height:140px;margin:5px;font-size:15px;display:flex;justify-content:center;align-items:center;flex-direction:column}.circle-bancospend[_ngcontent-%COMP%], .circle-maiorsal[_ngcontent-%COMP%], .circle-menorsal[_ngcontent-%COMP%]{width:40px;height:40px;background-color:#121616;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer}.coluna-aum[_ngcontent-%COMP%]{display:flex;flex-direction:column}.circle-bancos[_ngcontent-%COMP%]{width:150px;height:50px;border-radius:50px;overflow:hidden;display:flex;justify-content:center;align-items:center;background-color:#1a1d1d;margin:auto}.circle-bancos[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;max-height:100%;margin-right:10px}.banco-entrada[_ngcontent-%COMP%]{display:flex;align-items:center;background-color:#000;border-radius:10px;padding:10px;margin-bottom:10px;box-shadow:0 2px 4px #0000001a;width:100%;flex-direction:row}.banco-entrada[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:40px;height:40px;margin-right:10px}.descricao[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%}.nome-desc[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;width:100%}.nome-desc[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{margin:0;font-size:16px;color:#fff}.valor-aum[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-top:5px}.valor-aum[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:14px;color:#fff;margin:0}@media screen and (max-width: 600px){.banco-entrada[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start}.banco-entrada[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-bottom:10px}.nome-desc[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start}.valor-aum[_ngcontent-%COMP%]{justify-content:flex-start;margin-top:10px}}']}),a})()}];let C=(()=>{var t;class a{}return(t=a).\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.$C({type:t}),t.\u0275inj=n.G2t({imports:[d.iI.forChild(v),d.iI]}),a})(),b=(()=>{var t;class a{}return(t=a).\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.$C({type:t}),t.\u0275inj=n.G2t({imports:[c.MD,u.YN,l.bv,C]}),a})()}}]);