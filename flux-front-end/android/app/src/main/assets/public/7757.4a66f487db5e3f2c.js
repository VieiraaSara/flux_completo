"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7757],{7757:(C,d,a)=>{a.r(d),a.d(d,{MaisBancosPageModule:()=>b});var p=a(177),l=a(4341),u=a(9465),g=a(897),n=a(3953),h=a(5651),f=a(4796),m=a(2872);function M(e,i){if(1&e){const o=n.RV6();n.j41(0,"div")(1,"div",9),n.nrm(2,"img",10),n.j41(3,"div",11)(4,"div",12),n.nrm(5,"h5",13),n.j41(6,"h5",14),n.bIt("click",function(){const c=n.eBV(o).$implicit,s=n.XpG();return n.Njj(s.selecionarEBanco(c.id_banco))}),n.EFF(7,"Selecionar"),n.k0s()()()()()}if(2&e){const o=i.$implicit;n.R7$(2),n.Y8G("src",o.image,n.B4B)("alt",o.name),n.R7$(3),n.Y8G("innerHTML",o.name,n.npT)}}const x=[{path:"",component:(()=>{var e;class i{constructor(t,c,s,r){this.contaBancariaService=t,this.authService=c,this.router=s,this.navCtrl=r,this.valor=0,this.tipoConta="",this.selectedInstitution=null,this.bancos=[],this.filteredBancos=[],this.token=null,this.searchQuery=""}ngOnInit(){this.token=this.authService.getToken(),this.token?this.listarInstituicoes():console.error("Token n\xe3o encontrado.")}selecionarEBanco(t){this.router.navigate(["/conta-bancaria",t])}listarInstituicoes(){this.token&&this.contaBancariaService.getInstituicoes(this.token).then(t=>{console.log("Resposta da API:",t),this.bancos=t||[],this.filteredBancos=this.bancos}).catch(t=>{console.error("Erro ao listar institui\xe7\xf5es:",t)})}voltar(t){this.navCtrl.navigateBack("/conta-bancaria/:id")}onSearchChange(){this.filteredBancos=this.bancos.filter(t=>t.name.toLowerCase().includes(this.searchQuery.toLowerCase()))}}return(e=i).\u0275fac=function(t){return new(t||e)(n.rXU(h.W),n.rXU(f.u),n.rXU(g.Ix),n.rXU(m.q9))},e.\u0275cmp=n.VBU({type:e,selectors:[["app-mais-bancos"]],decls:12,vars:2,consts:[[1,"global"],[1,"header"],[1,"back-button",2,"color","black",3,"click"],["src","../../assets/image/Vector 14seta.png","alt",""],[1,"input-container"],["placeholder","Pesquisar bancos",1,"input-pesquisa",3,"ngModelChange","ngModel"],[1,"scrollable-content"],[1,"footer"],[4,"ngFor","ngForOf"],[1,"banco-entrada"],[3,"src","alt"],[1,"descricao"],[1,"nome-desc"],[2,"margin-right","15px",3,"innerHTML"],[1,"azul",2,"margin-right","5px",3,"click"]],template:function(t,c){1&t&&(n.j41(0,"ion-content")(1,"div",0)(2,"header",1)(3,"button",2),n.bIt("click",function(r){return c.voltar(r)}),n.nrm(4,"img",3),n.k0s(),n.j41(5,"h1"),n.EFF(6,"Bancos Dispon\xedveis"),n.k0s()(),n.j41(7,"div",4)(8,"input",5),n.mxI("ngModelChange",function(r){return n.DH7(c.searchQuery,r)||(c.searchQuery=r),r}),n.bIt("ngModelChange",function(){return c.onSearchChange()}),n.k0s()(),n.j41(9,"div",6)(10,"div",7),n.DNE(11,M,8,3,"div",8),n.k0s()()()()),2&t&&(n.R7$(8),n.R50("ngModel",c.searchQuery),n.R7$(3),n.Y8G("ngForOf",c.filteredBancos))},dependencies:[p.Sq,l.me,l.BC,l.vS,u.W9],styles:["*[_ngcontent-%COMP%]{font-family:poppins}.container-global[_ngcontent-%COMP%]{background-color:#000;padding:20px;text-align:center;max-width:400px;width:100%}.header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:10px 20px}.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:24px;color:#fff}.circle[_ngcontent-%COMP%]{width:40px;height:40px;background-color:#1a1d1d;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer}.circle[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#66b6ff}.input-container[_ngcontent-%COMP%]{position:relative;display:inline-block;width:100%}.input-pesquisa[_ngcontent-%COMP%]{width:99%;padding-left:45px;padding-right:45px;border-radius:50px;background-color:#171c1c;border:none;color:#9395a4;font-size:18px;height:40px;box-sizing:border-box}.input-container[_ngcontent-%COMP%]:before{content:url(pesquisa.14b2d05ed2b4c1f7.png);position:absolute;left:10px;top:50%;transform:translateY(-50%);pointer-events:none}.input-container[_ngcontent-%COMP%]:after{content:url(Search\\ icon.8ab3bcf47a1edbd1.png);position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none}.input-pesquisa[_ngcontent-%COMP%]::placeholder{color:#9395a4;font-family:Poppins,sans-serif}.input-pesquisa[_ngcontent-%COMP%]:focus{outline:none;border:2px solid #66B6FF}.linha-filtros[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:center;height:100%;margin-top:20px}.coluna-bancospend[_ngcontent-%COMP%], .coluna-maiorsal[_ngcontent-%COMP%], .coluna-menorsal[_ngcontent-%COMP%]{border-radius:20px;background-color:#1a1d1d;width:100%;height:140px;margin:5px;font-size:15px;display:flex;justify-content:center;align-items:center;flex-direction:column}.circle-bancospend[_ngcontent-%COMP%], .circle-maiorsal[_ngcontent-%COMP%], .circle-menorsal[_ngcontent-%COMP%]{width:40px;height:40px;background-color:#121616;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer}.coluna-aum[_ngcontent-%COMP%]{display:flex;flex-direction:column}.circle-bancos[_ngcontent-%COMP%]{width:150px;height:50px;border-radius:50px;overflow:hidden;display:flex;justify-content:center;align-items:center;background-color:#1a1d1d;margin:auto}.circle-bancos[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;max-height:100%;margin-right:10px}.banco-entrada[_ngcontent-%COMP%]{margin-top:20px;display:flex;align-items:flex-start;background-color:#000;border-radius:10px;box-shadow:0 2px 4px #0000001a;padding:10px;margin-bottom:10px}.banco-entrada[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:50%;width:50px;height:50px;margin-right:20px}.descricao[_ngcontent-%COMP%]{display:flex;flex-direction:column}.nome-desc[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:100%}.nome-desc[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:18px;margin:0}.valor-aum[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:end;margin-top:5px}.valor-aum[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;color:#666;margin:0 5px}.azul[_ngcontent-%COMP%]{color:#66b6ff}"]}),i})()}];let P=(()=>{var e;class i{}return(e=i).\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.$C({type:e}),e.\u0275inj=n.G2t({imports:[g.iI.forChild(x),g.iI]}),i})(),b=(()=>{var e;class i{}return(e=i).\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.$C({type:e}),e.\u0275inj=n.G2t({imports:[p.MD,l.YN,u.bv,P]}),i})()}}]);