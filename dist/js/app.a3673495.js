(function(){"use strict";var A={4899:function(A,e,n){n(7658);var t=n(9197),o=n(8473),i=n(4887);function r(A,e,n,t,r,a){const s=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",{class:(0,i.C_)([r.showConnLost?"":"hide","alert lost"])},(0,i.zw)(r.alertMessage),3),(0,o._)("div",{class:(0,i.C_)([r.showConnBack?"":"hide","alert back"])},(0,i.zw)(r.alertMessage),3),(0,o.Wm)(s)],64)}var a={name:"App",data(){return{showConnLost:!1,showConnBack:!1,alertMessage:"",onLine:navigator.onLine,showBackOnline:!1}},methods:{updateOnlineStatus(){this.onLine=navigator.onLine,this.onLine||this.showTemporaryAlert("Connexion Internet perdue !","lost")},showTemporaryAlert(A,e){this.alertMessage=A,"lost"==e&&(this.showConnLost=!0),"back"==e&&(this.showConnBack=!0,this.showConnLost=!1,setTimeout((()=>{this.showConnBack=!1}),3e3))}},watch:{onLine(A){A&&(this.showBackOnline=!0,setTimeout((()=>{this.showBackOnline=!1,this.showTemporaryAlert("Connexion Internet rétablie !","back")}),1e3))}},async mounted(){window.addEventListener("online",this.updateOnlineStatus),window.addEventListener("offline",this.updateOnlineStatus)},beforeUnmount(){window.removeEventListener("online",this.updateOnlineStatus),window.removeEventListener("offline",this.updateOnlineStatus)}},s=n(5312);const c=(0,s.Z)(a,[["render",r]]);var l=c,u=n(9427);(0,u.z)("/service-worker.js",{ready(){function A(){Notification.requestPermission().then((A=>{console.log(A)}))}console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB"),setInterval(A,4e3)},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(A){console.error("Error during service worker registration:",A)}});var d=n(4731);const g={class:"home"};function f(A,e,n,t,i,r){const a=(0,o.up)("HelloWorld");return(0,o.wg)(),(0,o.iD)("div",g,[(0,o.Wm)(a,{msg:"Welcome to Your Vue.js App"})])}var w=n(8259),v="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABSCAYAAAD+SzLAAAAACXBIWXMAAAsSAAALEgHS3X78AAAFDUlEQVR4nO2d7XHbMAyGSV//1xtUnSDaoO4G2aDuBPUG9QjpBsoGHsGZoMoEtTewJ0CPCRjTMEiREiVRFt87Xe6sL+oRAH4JjAQAkXWRlPJJCFEKIQ5CiA0AnMz9nzKri6SUGyHEL/zhG0LbmscsRixfilqSMq1oGTOwQGVggUoihkkpS3SHknELrb36CwD7wQtoaHBgUsoCY8MKAT14nvobz1d/jkKIGrcdANS9FtqUalb0vQkhFKQnrHWgh01V/ZUQ4rHLs2CNaJZvf3NMn7CEEGt0pT4g2TbdFCgmAwxBtbWmA0LWW90BXhUCzgdY1BgmpVyh6/nEpVcDyMEnmGPlUGDsW2Hj0qUfapNS/lEwaKu9lSJZ1BJBNb3xPVpfsLs47quut/O496kpxg3ikvimXe53QphRIDXA23qEAgV3OQow1TltALW1Fa5neE0xVJVtNSgwDKjBb3FgcFuEYyvnundgaPq2pgL75kaGVjQ0bSoHsLoTMIRlq+aTsCpH2V3ho4JLPL7a1xWYDdY2VVCk/KXDRauowBwxax3rgQaC5vKSm99bAWN8e5KwPKF1A6Yae/cEizxbY4M3CBi+Cc7nJw/L19LoOc5ZIynlnumvPQPAunOfrKNwwsI22MjpgBvVEuPzZ+4kAJD0Bxv9NRcUE7EMn35rlI3emx3Tl1LqzrSpM0JMQeVYZbBNgmwYE1VtreGGgt3qPkzjp1d61E0MwzH3f+S4VwAY7a1SGR5QBJzWNHZGdcTK7WqcjgNW4cCbqe9jz9akoitg+OYOxB1fAOBmBniuojFszcWuuUMyRS1MWdcXY3+2LqIPC8MJhi9kP21azF6mS9I21hkAdnMHRGUCeyT7qvGKla7egGHbi7pjti5G2sJoYD/ndhcvG7BUukDJSQOjXYxsXRZpYLSflYFZtMDuENVQowGT04IbW0poGCc55Y+CA8UBOyZd4pHFAeMmCrJQ2SUDxQELHcqdlbKFBWrBxSxL22z2UloAABfkk5khSk3aJen8WwZmkQZGrSwDs0gDo53tPPGB8xxSyp2aHMLU5vdZI5wA+UuO/2qJb7MR8/XSzzcLw872mYCgY/xzg7Vk2qSF2Q6jY/ipfKkzlrjn37mAPaCrzlUU2FF54gcwnIOkbrmZIyzMyqMZeW/TjrRrROciH2fa6ufc8Z0N+RSymGrSQsTPQTkGH+k1VxaGzYhnQnYzMyvjvie5eF4o4Tu3rpvUGZrRZjuRS5NJKkutJ2BcjuXVc9tOLJiEBnWxZLPVIsDi0oNuPCv0Ak93CotzxRNnIE0X4tJK7iJtxnhGW3rQhj2+4WKlhXx5R8A4o9hZj/e4IJfJehfQLJUb64rewBwXrqdcCTgSZp2G4HtxW5pcPUVL65JdHHITG7TJuKeR6sfB8uoCtrkhV6OcUq89sW1pSyb17sm0fUvWG6cY13D02LqaQNC1WhbABe3QdeGziKCWDXndbFsrOjBojgeAM1G9LlDUUDbXMjKtQ0iMwrlWHNFuOkjH3QNU55o9VkFLj3UgahzJjB7jsC9YNYACHOvqdP/YBd94FFrD27a1PKzx1p6Q9P2iWHn0xbtxdHZrrOnso6OxTIJt8ljPxod8v3bE9lW8vKnY7mFYgU886Wur+2oX9gaMwPNdp7DLptdy7bXXMeh6+uiuK2xIhqwSbNOLXr50qGSy0f8BAU6aqiCu8524L4eU9ehkC72M6fDJF0KI/2d2sluL0beNAAAADmVYSWZNTQAqAAAACAAAAAAAAADSU5MAAAAASUVORK5CYII=",p="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA8KAAAPCgFMBeqcAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAtNQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOdhNgAAAPB0Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERkdISktMTU5PUFFSU1RWV1hZWltcXV5fYGFiY2RlZmdoaWpsbW5vcHFyc3V2d3h5ent8fX5/gIGCg4SFhoqLjI2Oj5CRkpOUlZaYmZqbnJ2en6ChoqOlpqeoqaqrrK2ur7CxsrO1tre4uru8vb6/wMHCw8TFxsfIycrLzM3Oz9HS09TV1tfZ29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+05A07wAADURJREFUeNrt3f1/1WUdx/Hdghs3G8iNoDJZ3qCYAgKKw3ClFJVCqBVIGskUREvCOxjMeRtRLLktU0NAWE6EMAMJSNkQUGxMzIGAyJRtjrnt+hP6rR4+1Ov7/Z7t+u46n8/r9Rfw+LyfnO2cnbOlpMTROd+5q3TxH9dt2rHv0MnPjR+1HKlaP71vCjkte8SPi5+vrDe+1rL+EkZy1RmFJds/N77XsqwbU3V8GWMe3PKZSY72nMdeHfxf/6byUyaJOn4hm3VgY5fWmSTrQC6zdVD5xdUmCStnuQ75wj9lm0nSvs167a7LHQdN0vYv9mvvE/57PjDJ3EgmbE89HzhmkruFjJh4WcV1JtmrZMaE+36NSf5OsWOC5W0wIuIF4YTKnNsgY38zmDETqPBtI6UzWTP6U78VYuY3zansGbWh++Xsb2rYM2q3NQja3yxn0Gh1e8aI6odMGqlL35G1/0dZbBql2xtl7W/uZdMoLRQ2v3mvK6OGL+0P0vZvGsOq4eu6Vtr+Zhqrhq/nq9LmPz2dVcPXr1La/ocLWDV8g98VNv+p+d1ZNXwDa0St37SxqA+jRij3rXZc++MdL6xYVDKnaMotfjT5mnye/EXrjK2JTf/Jy49PH8vncJO+9PWJfI3dOGdUOrcT0dLI6x/77dUZ3E1KJVG/w1r7g0yuJqc7o81/4M5e3ExSVzZHmX/vLWmcTFS9orwA8MaNvMFOWhGeALw7gXOJa3bo+T+bx6sr8hp1Ouz+FflcS165YT/4/+FEjiWxdSH3f/UsbiWxn4Sbv3U+T/1ElnMk1P5HCjmVzBaH2n9nfy4lsxEtYfZ/OZtLySxtV5j9n+GHflKbEWb/x3npV2p9Pw6x/xzuJLaVIfYv5Uxiu6iVT9arblXw/uW8409uecF/8ON1PlgvuLLA/Q/yxi/BDWgK/Fwlv2NZck8EPgDM4kiCOzPwr72t5UiSC/wgQHUORxJcl4+C3gAwmiNJ7sagB4AybiS6FwP2P8ozQNH1Dnon8K3cSHRBnwXcyolkt8O+f8tQTiS6CwIeAP7MiWQX8NtgWy/mRLIL+DDQGi4ku6EBXwGGcSLZzbTv/xIXEl7Aq0D8dlXhpdnfDHyACwlvhP0B4EEuJLxfWfdvy+NCwquwAvg7BxJexqdWALdxIeGNsf8K0B5cSHizrABe40DSW2IFMI8DSW+LFcBYDiS9Wtv+9fwOcOn1sD4AvMKBpDeKXwehu6lWANdzIOmVWgEM4kDSs/5q2AZ+IZT4qmwAqriP+KptAP7CfcR3zAZgAfcRX6MNwDTuI71065OASRxIejm8DKC7s60AruZA0htiBXAZB5LeSCsA/iyY+AqtAPpxIOmNtwLI5UDS+y4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwIAAQAAgABAACAAGAAEAAIAAQAAgABAACAAGAAEAAIAAQAAgABAACAAGAAEAAIAAQAAgABAACAAGAAEAAIAAQAAgABAACAAGAAEAAIAAQAESVed0T63cd2LZ6/hWpANDXgCWf/O+qtb/OAoCy//2lX/wj7bVTAKCpfv/40mV/lwEANZ136CtOu6U7AJTUbc9X3nZbdwDoaPXXHNcPAQBw3df/dWYvBADAcamVxmsBAHDcBNt9PRAAAMctNX4LAIDjrwCHjd8CAOC2gcb4LQAAbhtuPBcAgM68rwcCAOC2a43nAgDgtouN5wIA4LbcNs8FAMBxu43fAgDguGLjtwAAuP4moNVvAQBw3Z+M1wIA4Lq8Jq8FAMB5Pzc+CwCA+xb5LAAA7ktf47EAAMRQhscCAKBcAACUCwCAcgEAUC4AAMoFAEC5AAAoFwAA5QIAoFwAAJQLAIByAQBQLgAAygUAQLkAACgXAADlAgCgXAAAlAsAgHIBAFAuAADKBQBAuQAAKBcAAOUCAKBcAACUCwCAcgEAUC4AAMoFAEC5AAAoFwAA5QIAoFwAAJQLAIByAQBQLgAAygUAQLkAACgXAADlAgCgXAAAlAsAgHIBAFAuAADKBQBAuQAAKBcAAOUCAKBcAACUCwCAcgEAUC4AAMoFAEC5AAAoFwAA5QIAoFwAAJQLAIByAQBQLgAAygUAQLkAACgXAADlAgCgXAAAlAvoTADDbrr3sUUUqt83ORLQaQCGl31gyEXRBHQSgPzn2ljKCwGdA2ByPTN5IqBTABTz39+xgGyvAcxiIdet9hnAdS0M5LyH/QXQpYZ53Nc61FsAs1knjjb4CiDjKOPE0nBPAVzLNPH0iKcAnmKaeNrjKYCdTBNTPfwEcIhlYuoCPwE0sUxMFXgJIJVXgXQDSDnMMjGV7yeASpaJqSw/AaximXiq9PRp4ESmiaeFngLo1sg2sTTC1x8GPck2cVTh7U8Dz6xjHfe1Xe7vG0LuYh73PeHzW8KWsY/rNqb7DCCzgoXc9laO3+8KTnucjZzu39f7D4bccICZvNi/0z4aljGD14QdtTfK/p354dBzi55avXUnhavJzf58PDxJmutofwAo3x8AyvcHgPL9AaB8fwAo3x8AyvcHgO/d73Z/ACjfHwDK9weA8v0BoHx/ACjfHwDK9weA8v0BoHx/AHjaAzHtDwDl+wMgufff1979AaB8fwAo3x8Aybx/vxQAsD8A2B8A7A8AGT0Y9/4AUL4/AJTvDwDl+wNA+f4AUL4/AJTvDwDl+wNA+f4A8KKHOm1/ACjfHwDK9weA8v0BkDz773exPwCU7w8A5fsDQPn+AOjUHu70/QGgfH8AKN8fAMr3B4Dy/QGgfH8AeL9//xQAsD8A2B8Acprnz/4AUL4/AJTvDwDl+wNA+f4AUL4/AJTvDwA/9387rv0BEGfz/dsfAMr3B4Dy/QGgfH8AKN8fAMr3B4Dy/QGgfH8AKN8fADE0w+P9AeC+a5o93h8Azuv5oc/7A8B5JV7vDwDX9a/3en8AuG623/sDwHV/83t/ADguu9nv/QHguPND7X9WCgCEVuD5/gBw3PeC93+nM/cHgONGe74/AByX5/n+AHBc5qd+7w8A163xe38AuO5Wv/cHgOuyPvB6fwA47xde7w8A56Xv9nl/AMTwTPCYx/sDIIbGNfn2+i8A4u3K2i9ddrMvpwVAHA3Y/MW7tvwmIwUAqhpf9f+rtq0Z4s8/DABxNbJkd50xrUdemZnn0z8LAHGWfVa6b/8kACgPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAozsYDQHeFVgD9OJD0RloB5HMg6Q2xAriMA0nvbCuAqzmQ9HKsAK7nQNJLtwKYxIHE12gD8DPuI75jNgALuY/4qm0AVnMf8VXZAOzhPuJbZwPQmMqBpFdqfRqQx4GkN9UKYDwHkt4oK4C5HEh6Pa0ANnEg8dXaADR04UDSe9X6EPAtDiS9MiuAYg4kvbutALZyIOkVWAGc7smFhJdZbxUwnQtJbyNfA3R3nxVA22AuJDz7G4PNPC4kvLSTVgD/5kLS22B/CBjHhVS/EmA2ciHhfdMOwFzBiWSXesgOYD0nEp79XUGm7VJOJLuLAr4GPMeJhLfLDqD1ck4ku5kBDwHbeXew7Po0Bwi4nRvJrjwAwPHe3Eh0PwoAYJ7mRqLr+nEAgNYxHEl0jwY9BNTwG8NE17chSMA6jiS6J4MAmFkcSXIDmoIAnOaHQqJbEvgQUN2LKwluUHOggG1ZnElwKwIBmPJ0ziS381uCBSznTIJbFgzAPMKZ5NbnRAgBc7iT3O4IAcA8xo+GxZa6K4yAVRlcSmpXtIYR8BLPBsW2JAwA83pfLiW03KOhBNTym2OkNi0UANPyUBq3ktlfwwkwm/iDUjLrfSikgMM3cCyRXdUcUoCp4I+KieyXYQGYz4rP4FwC2xBagKnm64DAetWEF2CqJvN8QFyjmyMIMG9P4V0C0ioykaq+uw83k1VJNAGmuXwSv1dcVMtN1E6UXYsBOaWXm+g1bpo7mu8HhJT1ukmouorHbi/gWwIJTwb3m8Q78c8XVixaeF/RT2/xoYlXncsDU/TOed/Iqe75m3nVMmoX1hhJvX8bDwMRG7BHlADz5rlsGq2c12QJODqWTaPVda0sAQ3D2TRaaWWyBLzfn00j9rAsARtYNGpTG0QJ4A3NkbtknyQA2xk0ctkrJQkYxKAJfBmolwNgJnMm0JC9YgDw9y8SKmupFACVjJlY4/bLAHCUKRMsc46I7wSaWDLhBr0oAMB77NiOJhzkhQDl3wzOr0tyACsZsX3lPHA8qQFMYsJ2vzJ4T20Sfw/YnQHbX9cZSfu9wDLW65Aypm5Pyv0bz2a7juobxdXJB2ABu3VkBU+fTK79X+bD7B393cDk9Z8kz/57c1is40u/8v7Njcnx/5/9nT0QjFuwrdn37/8W8Pjv9kXCYTfPe/bNU74+/1/G9//xNLCwqHTxqnWbduw7dPJzL7Zv/s8bz97cg2VS/guFBce4ubthagAAAABJRU5ErkJggg==",m=n.p+"img/fleche_blanc.f0ce88a1.svg";const h=(0,o._)("img",{src:v,class:"reload-button"},null,-1),b=[h],C=(0,o._)("img",{src:p,class:"logout-button"},null,-1),k=[C],D=(0,o._)("div",{style:{float:"right",color:"black",position:"relative","margin-right":"7px",top:"23px",border:"1px solid black",padding:"4px","font-size":"13px"}},[(0,o._)("a",{href:"/#/new_dp",style:{color:"black"}},"+ un dépannage")],-1),B={class:"hello"},y=(0,o._)("div",{class:"color-legend"},[(0,o._)("div",{style:{background:"#82C0CC"}},"Visite Générale"),(0,o._)("div",{style:{background:"#f69159"}},"Dépannage"),(0,o._)("div",{style:{background:"#c2bdb9"}},"Visite Hebdo")],-1),I={key:0,class:"planning_elem dp_elem"},L={id:"planning_date"},_={id:"planning_type"},P={id:"planning_ref"},N=(0,o._)("br",null,null,-1),U={id:"planning_adress"},x=(0,o._)("br",null,null,-1),E={id:"planning_object"},S=(0,o._)("div",{class:"buttonLink"},[(0,o.Uk)("Effectuer l'intervention "),(0,o._)("img",{src:m})],-1),O={key:1,class:"planning_elem vg_elem"},Q={id:"planning_date"},H={id:"planning_type"},M={id:"planning_ref"},J=(0,o._)("br",null,null,-1),z={id:"planning_adress"},G=(0,o._)("br",null,null,-1),W=(0,o._)("div",{class:"buttonLink"},[(0,o.Uk)("Effectuer l'intervention "),(0,o._)("img",{src:m})],-1),T={key:2,class:"planning_elem vh_elem"},j={id:"planning_date"},V={id:"planning_type"},X={id:"planning_ref"},q=(0,o._)("br",null,null,-1),K={id:"planning_adress"},F=(0,o._)("br",null,null,-1),Y=(0,o._)("div",{class:"buttonLink"},[(0,o.Uk)("Effectuer l'intervention "),(0,o._)("img",{src:m})],-1),Z=(0,o._)("div",{class:"version"},"v W1.2.14",-1);function R(A,e,n,t,r,a){const s=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("img",{src:w,style:{width:"60px",float:"left",margin:"10px"},onClick:e[0]||(e[0]=(...A)=>a.reloadPage&&a.reloadPage(...A))}),(0,o._)("div",{style:{display:"contents"},onClick:e[1]||(e[1]=(...A)=>a.reloadPage&&a.reloadPage(...A))},b),(0,o._)("div",{style:{display:"contents"},onClick:e[2]||(e[2]=A=>a.logout())},k),D,(0,o._)("div",B,[y,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.data_tasks,((A,e)=>((0,o.wg)(),(0,o.iD)("li",{key:e},["DP"===A.Item_type?((0,o.wg)(),(0,o.iD)("div",I,[(0,o._)("div",null,[(0,o._)("div",L,(0,i.zw)(A.Evt_dtDebut),1),(0,o._)("div",_,(0,i.zw)(A.Item_type),1)]),(0,o._)("div",null,[(0,o._)("div",P,[(0,o.Uk)("Référence :"),N,(0,o.Uk)(" "+(0,i.zw)(A.Evt_reference),1)]),(0,o._)("div",U,[(0,o.Uk)((0,i.zw)(A.Imm_1_adr),1),x,(0,o.Uk)((0,i.zw)(A.Imm_CP)+" - "+(0,i.zw)(A.Imm_ville),1)])]),(0,o._)("div",E,"Objet : "+(0,i.zw)(A.DP_objetIntervention),1),(0,o.Wm)(s,{to:{name:"DPForm",query:{item_id:A.Item_id}}},{default:(0,o.w5)((()=>[S])),_:2},1032,["to"])])):(0,o.kq)("",!0),"VG"===A.Item_type?((0,o.wg)(),(0,o.iD)("div",O,[(0,o._)("div",null,[(0,o._)("div",Q,(0,i.zw)(A.Evt_dtDebut),1),(0,o._)("div",H,(0,i.zw)(A.Item_type),1)]),(0,o._)("div",null,[(0,o._)("div",M,[(0,o.Uk)("Référence :"),J,(0,o.Uk)(" "+(0,i.zw)(A.Evt_reference),1)]),(0,o._)("div",z,[(0,o.Uk)((0,i.zw)(A.Imm_1_adr),1),G,(0,o.Uk)((0,i.zw)(A.Imm_CP)+" - "+(0,i.zw)(A.Imm_ville),1)])]),(0,o.Wm)(s,{to:{name:"IDBTest",query:{item_id:A.Item_id}}},{default:(0,o.w5)((()=>[W])),_:2},1032,["to"])])):(0,o.kq)("",!0),"VH"===A.Item_type?((0,o.wg)(),(0,o.iD)("div",T,[(0,o._)("div",null,[(0,o._)("div",j,(0,i.zw)(A.Evt_dtDebut),1),(0,o._)("div",V,(0,i.zw)(A.Item_type),1)]),(0,o._)("div",null,[(0,o._)("div",X,[(0,o.Uk)("Référence :"),q,(0,o.Uk)(" "+(0,i.zw)(A.Evt_reference),1)]),(0,o._)("div",K,[(0,o.Uk)((0,i.zw)(A.Imm_1_adr),1),F,(0,o.Uk)((0,i.zw)(A.Imm_CP)+" - "+(0,i.zw)(A.Imm_ville),1)])]),(0,o.Wm)(s,{to:{name:"vh",query:{item_id:A.Item_id}}},{default:(0,o.w5)((()=>[Y])),_:2},1032,["to"])])):(0,o.kq)("",!0)])))),128))]),Z],64)}var $=n(5633),AA=n(8736),eA={name:"HelloWorld",data(){return{resp:"",data_tasks:"",currIp:this.currIp}},methods:{logout(){confirm("Êtes-vous sûr de vouloir vous déconnecter ? Vous perdrez votre avancement sur les tâches en cours.")&&((0,AA.ZH)(),this.$router.push("/login/"))},reloadPage(){window.location.reload()},notifyMe(){navigator.serviceWorker.register("service-worker.js"),"Notification"in window?"granted"===Notification.permission?navigator.serviceWorker.ready.then((function(A){A.showNotification("Notification with ServiceWorker")})):Notification.requestPermission().then((A=>{console.log(A),"granted"===A&&navigator.serviceWorker.ready.then((function(A){A.showNotification("Notification with ServiceWorker")}))})):alert("This browser does not support desktop notification"),console.log(Notification.permission)}},async mounted(){let A=await(0,AA.U2)("current_tech");if("undefined"==typeof A)this.$router.push("/login/");else{const r=async()=>{try{const e=await $.Z.get(this.currIp+"/my_missions?tech_id="+A);this.resp=e.data;const n=await(0,AA.XP)();for(const A of n)A.toString().includes("-task")&&(0,AA.IV)(A);console.log(this.resp),this.resp.forEach((async function(A){var e=A.Item_id,n=A.Item_type;A=JSON.stringify(A);var t=JSON.parse(A);await(0,AA.t8)(n+"-"+e+"-task",t)}))}catch(e){console.error(e)}};await r();for(var e=[],n=await(0,AA.qh)(),t=0;t<=n.length-1;t++)if(n[t][0].toString().includes("-task")){var o=n[t][1]["Evt_dtDebut"].split(" ");o=o[1].split("/");var i=new Date(+o[2],o[1]-1,+o[0]);n[t][1]["unix_date"]=Date.parse(i),e.push(n[t][1])}console.log(e),e.sort((function(A,e){return A["unix_date"]-e["unix_date"]})),this.data_tasks=e}}};const nA=(0,s.Z)(eA,[["render",R]]);var tA=nA,oA={name:"HomeView",components:{HelloWorld:tA}};const iA=(0,s.Z)(oA,[["render",f],["__scopeId","data-v-7b9b8b70"]]);var rA=iA;const aA=[{path:"/",name:"home",component:rA},{path:"/dpform/",name:"DPForm",component:()=>n.e(929).then(n.bind(n,6929))},{path:"/idbtest/",name:"IDBTest",component:()=>n.e(484).then(n.bind(n,3484))},{path:"/vg-inter/:id",name:"VGInter",component:()=>n.e(478).then(n.bind(n,6478)),props:{default:!0}},{path:"/vh/",name:"vh",component:()=>n.e(761).then(n.bind(n,1761))},{path:"/vh-inter/:id",name:"VHInter",component:()=>n.e(870).then(n.bind(n,4870)),props:{default:!0}},{path:"/login/",name:"Login",component:()=>n.e(612).then(n.bind(n,5612))},{path:"/new_dp/",name:"NewDP",component:()=>n.e(805).then(n.bind(n,6805))}],sA=(0,d.p7)({history:(0,d.r5)(),routes:aA});var cA=sA,lA=n(3555);let uA=(0,t.ri)(l);async function dA(){let A=await(0,AA.U2)("current_tech");if("undefined"==typeof A)console.log("No tech ID. Please Log in.");else{const r=async()=>{try{const n=await $.Z.get("https://ns3203483.ip-37-187-96.eu/my_missions?tech_id="+A);this.resp=n.data;const t=await(0,AA.XP)();var e=[];for(const A of t)A.includes("-task")&&(e.push(A),(0,AA.IV)(A));this.resp.forEach((async function(A){var n=A.Item_id,t=A.Item_type;A=JSON.stringify(A);var o=JSON.parse(A),i=t+"-"+n+"-task";e.includes(i)||"DP"!=t||(navigator.serviceWorker.register("service-worker.js"),"granted"===Notification.permission&&navigator.serviceWorker.ready.then((function(A){A.showNotification("Vous avez une nouvelle DP")}))),await(0,AA.t8)(i,o)}))}catch(n){console.error(n)}};await r();for(var e=[],n=await(0,AA.qh)(),t=0;t<=n.length-1;t++)if(n[t][0].toString().includes("-task")){var o=n[t][1]["Evt_dtDebut"].split(" ");o=o[1].split("/");var i=new Date(+o[2],o[1]-1,+o[0]);n[t][1]["unix_date"]=Date.parse(i),e.push(n[t][1])}e.sort((function(A,e){return A["unix_date"]-e["unix_date"]})),this.data_tasks=e}}uA.config.globalProperties.currIp="https://ns3203483.ip-37-187-96.eu",uA.component("VueSignaturePad",lA.W),uA.use(cA).mount("#app"),setInterval(dA,2e3)},8259:function(A,e,n){A.exports=n.p+"img/logo-gereco.e6dd7bdb.svg"}},e={};function n(t){var o=e[t];if(void 0!==o)return o.exports;var i=e[t]={exports:{}};return A[t].call(i.exports,i,i.exports,n),i.exports}n.m=A,function(){var A=[];n.O=function(e,t,o,i){if(!t){var r=1/0;for(l=0;l<A.length;l++){t=A[l][0],o=A[l][1],i=A[l][2];for(var a=!0,s=0;s<t.length;s++)(!1&i||r>=i)&&Object.keys(n.O).every((function(A){return n.O[A](t[s])}))?t.splice(s--,1):(a=!1,i<r&&(r=i));if(a){A.splice(l--,1);var c=o();void 0!==c&&(e=c)}}return e}i=i||0;for(var l=A.length;l>0&&A[l-1][2]>i;l--)A[l]=A[l-1];A[l]=[t,o,i]}}(),function(){n.n=function(A){var e=A&&A.__esModule?function(){return A["default"]}:function(){return A};return n.d(e,{a:e}),e}}(),function(){n.d=function(A,e){for(var t in e)n.o(e,t)&&!n.o(A,t)&&Object.defineProperty(A,t,{enumerable:!0,get:e[t]})}}(),function(){n.f={},n.e=function(A){return Promise.all(Object.keys(n.f).reduce((function(e,t){return n.f[t](A,e),e}),[]))}}(),function(){n.u=function(A){return"js/"+A+"."+{478:"481b0dd9",484:"c3272d5f",612:"d7cf250e",761:"11e85c7b",805:"ee90f3ef",870:"5fe535b4",929:"f80c7c0d"}[A]+".js"}}(),function(){n.miniCssF=function(A){return"css/"+A+"."+{478:"08207e9e",484:"43e55dd1",612:"9aecfc7b",761:"76fa0611",805:"0bb5da22",870:"d970f5df",929:"f2e293ce"}[A]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(A){if("object"===typeof window)return window}}()}(),function(){n.o=function(A,e){return Object.prototype.hasOwnProperty.call(A,e)}}(),function(){var A={},e="wpa-gereco:";n.l=function(t,o,i,r){if(A[t])A[t].push(o);else{var a,s;if(void 0!==i)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var u=c[l];if(u.getAttribute("src")==t||u.getAttribute("data-webpack")==e+i){a=u;break}}a||(s=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",e+i),a.src=t),A[t]=[o];var d=function(e,n){a.onerror=a.onload=null,clearTimeout(g);var o=A[t];if(delete A[t],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((function(A){return A(n)})),e)return e(n)},g=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),s&&document.head.appendChild(a)}}}(),function(){n.r=function(A){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(A,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(A,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var A=function(A,e,n,t){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var i=function(i){if(o.onerror=o.onload=null,"load"===i.type)n();else{var r=i&&("load"===i.type?"missing":i.type),a=i&&i.target&&i.target.href||e,s=new Error("Loading CSS chunk "+A+" failed.\n("+a+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=r,s.request=a,o.parentNode.removeChild(o),t(s)}};return o.onerror=o.onload=i,o.href=e,document.head.appendChild(o),o},e=function(A,e){for(var n=document.getElementsByTagName("link"),t=0;t<n.length;t++){var o=n[t],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===A||i===e))return o}var r=document.getElementsByTagName("style");for(t=0;t<r.length;t++){o=r[t],i=o.getAttribute("data-href");if(i===A||i===e)return o}},t=function(t){return new Promise((function(o,i){var r=n.miniCssF(t),a=n.p+r;if(e(r,a))return o();A(t,a,o,i)}))},o={143:0};n.f.miniCss=function(A,e){var n={478:1,484:1,612:1,761:1,805:1,870:1,929:1};o[A]?e.push(o[A]):0!==o[A]&&n[A]&&e.push(o[A]=t(A).then((function(){o[A]=0}),(function(e){throw delete o[A],e})))}}(),function(){var A={143:0};n.f.j=function(e,t){var o=n.o(A,e)?A[e]:void 0;if(0!==o)if(o)t.push(o[2]);else{var i=new Promise((function(n,t){o=A[e]=[n,t]}));t.push(o[2]=i);var r=n.p+n.u(e),a=new Error,s=function(t){if(n.o(A,e)&&(o=A[e],0!==o&&(A[e]=void 0),o)){var i=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;a.message="Loading chunk "+e+" failed.\n("+i+": "+r+")",a.name="ChunkLoadError",a.type=i,a.request=r,o[1](a)}};n.l(r,s,"chunk-"+e,e)}},n.O.j=function(e){return 0===A[e]};var e=function(e,t){var o,i,r=t[0],a=t[1],s=t[2],c=0;if(r.some((function(e){return 0!==A[e]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(s)var l=s(n)}for(e&&e(t);c<r.length;c++)i=r[c],n.o(A,i)&&A[i]&&A[i][0](),A[i]=0;return n.O(l)},t=self["webpackChunkwpa_gereco"]=self["webpackChunkwpa_gereco"]||[];t.forEach(e.bind(null,0)),t.push=e.bind(null,t.push.bind(t))}();var t=n.O(void 0,[998],(function(){return n(4899)}));t=n.O(t)})();
//# sourceMappingURL=app.a3673495.js.map