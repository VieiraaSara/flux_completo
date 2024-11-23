"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6164],{6164:(O,d,i)=>{i.r(d),i.d(d,{ImpressaoExtratoPageModule:()=>M});var g=i(177),f=i(4341),m=i(9465),p=i(897),x=i(467),h=i(8866),t=i(3953),v=i(5651),u=i(9437),E=i(5312),P=i(1626);let b=(()=>{var a;class s{constructor(r){this.http=r,this.apiUrl=E.c.baseApiUrl}getExtratoGeral(r){return this.http.get(`${this.apiUrl}impressao-geral?token=${r}`).pipe((0,u.W)(this.handleError))}getExtratoBancario(r,o){return this.http.get(`${this.apiUrl}imprimir-extrato-bancario/${o}?token=${r}`).pipe((0,u.W)(this.handleError))}handleError(r){console.error("Erro ocorreu:",r);let o="Algo deu errado, tente novamente mais tarde.";if(r.error instanceof ErrorEvent)o=`Erro: ${r.error.message}`;else switch(r.status){case 400:o="Solicita\xe7\xe3o inv\xe1lida. Verifique os dados enviados.";break;case 404:o="Recurso n\xe3o encontrado.";break;case 500:o="Erro interno do servidor. Tente novamente mais tarde.";break;default:o=`Erro: ${r.message}`}return Promise.reject(new Error(o))}}return(a=s).\u0275fac=function(r){return new(r||a)(t.KVO(P.Qq))},a.\u0275prov=t.jDH({token:a,factory:a.\u0275fac,providedIn:"root"}),s})();var y=i(2872);function I(a,s){if(1&a){const c=t.RV6();t.j41(0,"div",6)(1,"div",7),t.nrm(2,"img",8),t.j41(3,"h5"),t.EFF(4),t.k0s(),t.j41(5,"p",9),t.bIt("click",function(){const o=t.eBV(c).$implicit,e=t.XpG();return t.Njj(e.imprimirExtratoContaBancaria(o.id_conta))}),t.EFF(6," Imprimir"),t.k0s()()()}if(2&a){const c=s.$implicit;t.R7$(2),t.FS9("src",c.image,t.B4B),t.R7$(2),t.JRh(c.nome_instituicao)}}const C=[{path:"",component:(()=>{var a;class s{constructor(r,o,e){this.contaBancariaService=r,this.extratoService=o,this.navCtrl=e,this.listContas=[]}ngOnInit(){var r=this;this.decodeToken();const o=localStorage.getItem("token");o?this.contaBancariaService.getContasBancariasList(o).subscribe(function(){var e=(0,x.A)(function*(n){n&&Array.isArray(n)?r.listContas=n.map(l=>({id_conta:l.id_conta,banco_id:l.banco_id,saldo:l.saldo,tipo_conta:l.tipo_conta,nome_instituicao:l.Banco.name,image:l.Banco.image,detailsVisible:!1})):console.error("Dados inv\xe1lidos retornados da API:",n)});return function(n){return e.apply(this,arguments)}}(),e=>{console.error("Erro ao buscar dados da API",e)}):console.error("Token n\xe3o encontrado."),console.log(this.listContas)}decodeToken(){const r=localStorage.getItem("token");if(r)try{const o=(0,h.s)(r);o&&o.id&&(this.id=o.id)}catch(o){console.error("Erro ao decodificar o token:",o)}}imprimirExtratoGeral(r){var o=this;return(0,x.A)(function*(){console.log("Imprimindo extrato");const e=localStorage.getItem("token");if(e&&o.id)try{o.extratoService.getExtratoGeral(e).subscribe(n=>{console.log("Dados recebidos do servi\xe7o:",n),o.navCtrl.navigateForward("/impressao-geral",{queryParams:{data:JSON.stringify(Array.isArray(n)?n:[n])}})},n=>{console.error("Erro ao obter extrato:",n)})}catch(n){console.error("Erro ao gerar impress\xe3o de extrato",n)}})()}imprimirExtratoContaBancaria(r){const o=localStorage.getItem("token");if(o&&this.id)try{console.log("Imprimindo extrato da conta bancaria: ",r),this.extratoService.getExtratoBancario(o,r).subscribe(e=>{console.log("Dados recebidos do servi\xe7o:",e),this.navCtrl.navigateForward("/impressao-banco",{queryParams:{data:JSON.stringify(Array.isArray(e)?e:[e])}})},e=>{console.error("Erro ao obter extrato:",e)})}catch(e){console.error("Erro ao gerar impress\xe3o de extrato",e)}}}return(a=s).\u0275fac=function(r){return new(r||a)(t.rXU(v.W),t.rXU(b),t.rXU(y.q9))},a.\u0275cmp=t.VBU({type:a,selectors:[["app-impressao-extrato"]],decls:13,vars:1,consts:[[1,"titulo"],[1,"container-global"],[1,"card-extrtotal",3,"click"],[1,"circle-card"],["src","../../assets/image/Star 1star.png","alt",""],["class","bancos",4,"ngFor","ngForOf"],[1,"bancos"],[1,"card-extrabanco"],["alt","",3,"src"],[3,"click"]],template:function(r,o){1&r&&(t.j41(0,"ion-content")(1,"div",0)(2,"h1"),t.EFF(3,"Impress\xe3o de "),t.nrm(4,"br"),t.EFF(5," Extrato"),t.k0s()(),t.j41(6,"div",1)(7,"div",2),t.bIt("click",function(n){return o.imprimirExtratoGeral(n)}),t.j41(8,"div",3),t.nrm(9,"img",4),t.k0s(),t.j41(10,"p"),t.EFF(11,"Imprimir o Extrato Total da Conta"),t.k0s()(),t.DNE(12,I,7,2,"div",5),t.k0s()()),2&r&&(t.R7$(12),t.Y8G("ngForOf",o.listContas))},dependencies:[g.Sq,m.W9],styles:["body[_ngcontent-%COMP%]{font-family:Poppins,sans-serif;background-color:#000;margin:0;height:100vh}.titulo[_ngcontent-%COMP%]{display:flex;justify-content:start;margin-top:30px;margin-left:20px}.container-global[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:0 10px}.container-global[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:80px;text-align:center}.card-extrtotal[_ngcontent-%COMP%]{display:flex;align-items:center;padding:10px;margin-top:30px;flex-direction:column;background-color:#1a1d1d;border-radius:20px;width:100%;max-width:300px}.circle-card[_ngcontent-%COMP%]{width:40px;height:40px;display:flex;justify-content:center;align-items:center;background-color:#121616;border-radius:50%}.card-extrtotal[_ngcontent-%COMP%]:active{background-color:#0e0f0f;transition:.1s ease-in}.bancos[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-top:20px;width:100%;max-width:480px}.card-extrabanco[_ngcontent-%COMP%]{background-color:#1a1d1d;border-radius:20px;margin:5px;padding:10px;width:100%;max-width:480px;display:flex;flex-direction:row;align-items:center;justify-content:space-between}.card-extrabanco[_ngcontent-%COMP%]:active{background-color:#0e0f0f;transition:.1s ease-out}.card-extrabanco[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50px;height:50px;border-radius:50%;margin-right:10px}.card-extrabanco[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{margin:0;flex:1}.card-extrabanco[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#66b6ff;font-weight:400;white-space:nowrap}"]}),s})()}];let k=(()=>{var a;class s{}return(a=s).\u0275fac=function(r){return new(r||a)},a.\u0275mod=t.$C({type:a}),a.\u0275inj=t.G2t({imports:[p.iI.forChild(C),p.iI]}),s})(),M=(()=>{var a;class s{}return(a=s).\u0275fac=function(r){return new(r||a)},a.\u0275mod=t.$C({type:a}),a.\u0275inj=t.G2t({imports:[g.MD,f.YN,m.bv,k]}),s})()}}]);