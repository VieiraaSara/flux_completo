"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3485],{3485:(y,u,i)=>{i.r(u),i.d(u,{LoginPageModule:()=>x});var f=i(177),r=i(4341),p=i(9465),d=i(897),m=i(467),n=i(3953),h=i(4796),P=i(3067),C=i(2872);const v=()=>["/cadastro-usuario"],M=[{path:"",component:(()=>{var o;class s{constructor(e,t,a,c){this.authService=e,this.loginService=t,this.navCtrl=a,this.toastController=c,this.visible=!0,this.changetype=!0,this.credentials={email:"",senha:""}}presentToast(e){var t=this;return(0,m.A)(function*(){(yield t.toastController.create({message:e,duration:5e3,position:"top",cssClass:"toast-container"})).present()})()}login(){var e=this;return(0,m.A)(function*(){try{const t=yield e.authService.login(e.credentials).toPromise(),a=null==t?void 0:t.token;a?(localStorage.setItem("token",a),e.presentToast("Login correto.Bem-vindo!"),e.navCtrl.navigateRoot("tabs/home")):alert("Token n\xe3o recebido")}catch{alert("Erro ao fazer login:")}})()}viewpass(){this.visible=!this.visible,this.changetype=!this.changetype}}return(o=s).\u0275fac=function(e){return new(e||o)(n.rXU(h.u),n.rXU(P.H),n.rXU(C.q9),n.rXU(p.K_))},o.\u0275cmp=n.VBU({type:o,selectors:[["app-login"]],decls:24,vars:6,consts:[["loginForm","ngForm"],[1,"login-container"],[1,"login-container",3,"ngSubmit"],["src","assets/image/Emblema pelos seus 10 designs criados no Canva.png","alt","Logo",1,"logo"],[1,"input-container"],["type","text","id","email","name","email","placeholder","Email","required","",3,"ngModelChange","ngModel"],[1,"input-circle"],[1,"fa-solid","fa-envelope"],["id","senha","name","senha","placeholder","Senha","required","",3,"ngModelChange","type","ngModel"],[1,"fa-solid","fa-lock"],[1,"eyeicon",3,"click"],[2,"color","#000A7E",3,"ngClass"],["type","submit"],[1,"forgot-password"],[3,"routerLink"]],template:function(e,t){if(1&e){const a=n.RV6();n.j41(0,"body")(1,"div",1)(2,"form",2,0),n.bIt("ngSubmit",function(){return n.eBV(a),n.Njj(t.login())}),n.nrm(4,"img",3),n.j41(5,"h1"),n.EFF(6,"Fa\xe7a seu login!"),n.k0s(),n.j41(7,"div",4)(8,"input",5),n.mxI("ngModelChange",function(l){return n.eBV(a),n.DH7(t.credentials.email,l)||(t.credentials.email=l),n.Njj(l)}),n.k0s(),n.j41(9,"div",6),n.nrm(10,"i",7),n.k0s()(),n.j41(11,"div",4)(12,"input",8),n.mxI("ngModelChange",function(l){return n.eBV(a),n.DH7(t.credentials.senha,l)||(t.credentials.senha=l),n.Njj(l)}),n.k0s(),n.j41(13,"div",6),n.nrm(14,"i",9),n.k0s(),n.j41(15,"span",10),n.bIt("click",function(){return n.eBV(a),n.Njj(t.viewpass())}),n.nrm(16,"i",11),n.k0s()(),n.j41(17,"button",12),n.EFF(18,"Entrar"),n.k0s()(),n.j41(19,"p",13),n.EFF(20,"N\xe3o tem uma conta? "),n.j41(21,"strong")(22,"a",14),n.EFF(23,"Clique aqui"),n.k0s()()()()()}2&e&&(n.R7$(8),n.R50("ngModel",t.credentials.email),n.R7$(4),n.Y8G("type",t.changetype?"password":"text"),n.R50("ngModel",t.credentials.senha),n.R7$(4),n.Y8G("ngClass",t.visible?"fa-solid fa-eye-slash":"fa-solid fa-eye"),n.R7$(6),n.Y8G("routerLink",n.lJ4(5,v)))},dependencies:[f.YU,r.qT,r.me,r.BC,r.cb,r.YS,r.vS,r.cV,p.oY,d.Wk],styles:["body[_ngcontent-%COMP%]{background-color:#000;display:flex;justify-content:center;align-items:center;height:200vh;margin:0}.login-container[_ngcontent-%COMP%]{background-color:#000;padding:20px;text-align:center;max-width:400px;width:100%}.logo[_ngcontent-%COMP%]{width:90px;height:70px;margin-bottom:10px}h1[_ngcontent-%COMP%]{font-family:Inter,sans-serif;margin-bottom:20px;padding:0;font-size:30px;color:#fff}.input-container[_ngcontent-%COMP%]{position:relative;margin-bottom:20px}.input-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-family:Poppins,sans-serif;display:block;text-align:left;margin-bottom:5px;font-weight:700;color:#fff}.input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-family:Poppins,sans-serif;width:100%;padding:20px 20px 20px 80px;border-radius:50px;background-color:#171c1c;border:none;color:#9395a4;font-size:18px;height:60px}.input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none;border:2px solid #000ceb}.input-circle[_ngcontent-%COMP%]{position:absolute;top:50%;left:15px;transform:translateY(-50%);background-color:#000e5a;border-radius:50%;width:40px;height:40px;display:flex;justify-content:center;align-items:center;color:#fff;font-size:18px}button[_ngcontent-%COMP%]{font-family:Poppins,sans-serif;font-weight:600;width:100%;padding:20px;font-size:18px;background-color:#92d1f9;color:#000;border:none;border-radius:50px;cursor:pointer}button[_ngcontent-%COMP%]:hover{background-color:#44b7ff}.forgot-password[_ngcontent-%COMP%]{font-family:Poppins,sans-serif;margin-top:10px;color:#007bff;cursor:pointer}.eyeicon[_ngcontent-%COMP%]{position:absolute;top:50%;right:15px;transform:translateY(-50%);cursor:pointer;font-size:20px}.toast-container[_ngcontent-%COMP%]{background-color:#000a7e;color:#fff;font-family:Poppins,sans-serif;padding:12px 16px;border-radius:8px;box-shadow:0 2px 10px #00000080;position:fixed;left:50%;transform:translate(-50%);bottom:20px;width:90%;max-width:400px;text-align:center;z-index:1000}@keyframes _ngcontent-%COMP%_slideIn{0%{transform:translateY(100%)}to{transform:translateY(0)}}.toast-container.show[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slideIn .5s ease-out}"]}),s})()}];let b=(()=>{var o;class s{}return(o=s).\u0275fac=function(e){return new(e||o)},o.\u0275mod=n.$C({type:o}),o.\u0275inj=n.G2t({imports:[d.iI.forChild(M),d.iI]}),s})(),x=(()=>{var o;class s{}return(o=s).\u0275fac=function(e){return new(e||o)},o.\u0275mod=n.$C({type:o}),o.\u0275inj=n.G2t({imports:[f.MD,r.YN,p.bv,b]}),s})()}}]);