"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1835],{1835:(x,g,e)=>{e.r(g),e.d(g,{ConfirmacaoAutenticacaoPageModule:()=>P});var u=e(177),l=e(4341),r=e(9465),s=e(897),n=e(3953),m=e(2872),d=e(8819);function p(t,i){if(1&t){const c=n.RV6();n.j41(0,"div")(1,"div",1),n.nrm(2,"img",2),n.k0s(),n.j41(3,"div",3),n.nrm(4,"img",4),n.j41(5,"div",5)(6,"h1"),n.EFF(7,"Parab\xe9ns,"),n.k0s(),n.j41(8,"h2"),n.EFF(9,"Sua conta Flux foi verificada!"),n.k0s()(),n.j41(10,"button",6),n.bIt("click",function(){const a=n.eBV(c).$implicit,f=n.XpG();return n.Njj(f.confirmarCodigo(a))}),n.EFF(11,"Continuar "),n.j41(12,"span"),n.nrm(13,"ion-icon",7),n.k0s()()()()}}const C=[{path:"",component:(()=>{var t;class i{constructor(o,a,f){this.route=o,this.navCtrl=a,this.pixService=f,this.data={}}ngOnInit(){this.route.queryParams.subscribe(o=>{if(o&&o.data)try{const a=JSON.parse(o.data);this.data=Array.isArray(a)?a:[a],console.log("Dados verifica\xe7\xe3o:",this.data)}catch(a){console.error("Erro ao parsear os dados:",a)}})}confirmarCodigo(o){console.log(o),console.log(o.code),console.log(o.token),console.log(o.id),this.pixService.verifyCode(o.id,o.token,o.code).subscribe(a=>{this.navCtrl.navigateForward("/tabs/meus-bancos")},a=>{console.error("Erro ao vericicar codigo:",a)})}}return(t=i).\u0275fac=function(o){return new(o||t)(n.rXU(s.nX),n.rXU(m.q9),n.rXU(d.x))},t.\u0275cmp=n.VBU({type:t,selectors:[["app-confirmacao-autenticacao"]],decls:3,vars:1,consts:[[4,"ngFor","ngForOf"],[1,"exit"],["src","../../assets/image/X.png","alt",""],[1,"container-confirm"],["src","../../assets/image/confirm.png","alt",""],[1,"text"],["type","submit",1,"btn-confirmar",3,"click"],["name","arrow-forward"]],template:function(o,a){1&o&&(n.j41(0,"ion-content")(1,"body"),n.DNE(2,p,14,0,"div",0),n.k0s()()),2&o&&(n.R7$(2),n.Y8G("ngForOf",a.data))},dependencies:[u.Sq,r.W9,r.iq],styles:["*[_ngcontent-%COMP%]{font-family:poppins;font-weight:200}body[_ngcontent-%COMP%]{background-image:url(fundoconfirm.1cb89f183a1b3491.jpg);background-repeat:no-repeat;background-size:cover;background-position:center center}.exit[_ngcontent-%COMP%]{margin:0;display:flex;justify-content:start;padding:10px}.container-confirm[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column;margin-top:30%}.container-confirm[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;padding:0;font-size:24px}.container-confirm[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;padding-top:5px;font-size:18px}.text[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex-direction:column;margin-top:20px}.btn-confirmar[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;font-family:Poppins,sans-serif;margin-top:25vh;font-weight:600;width:40vh;padding:20px;font-size:18px;background-color:#92d1f9;color:#000;border:none;border-radius:50px;cursor:pointer}.btn-confirmar[_ngcontent-%COMP%]:active{background-color:#6ea2c2}span[_ngcontent-%COMP%]{margin-top:4px;margin-left:5px;font-size:18px}"]}),i})()}];let v=(()=>{var t;class i{}return(t=i).\u0275fac=function(o){return new(o||t)},t.\u0275mod=n.$C({type:t}),t.\u0275inj=n.G2t({imports:[s.iI.forChild(C),s.iI]}),i})(),P=(()=>{var t;class i{}return(t=i).\u0275fac=function(o){return new(o||t)},t.\u0275mod=n.$C({type:t}),t.\u0275inj=n.G2t({imports:[u.MD,l.YN,r.bv,v]}),i})()}}]);