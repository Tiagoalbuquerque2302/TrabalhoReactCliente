/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import base64 from "base-64/base64.js";
import servicoLogin from "./login/ServicoLogin";

export default class ServicoRest {

    constructor(url) {
        this.url = url;
    }

    apagar(id, sucesso, erro) {
         fetch(`${this.url}/${id}`,{
             headers: new Headers({
                'Authorization': 'Basic ' + servicoLogin.getAuthorization()
            }),
            method:"DELETE"
        }
        ).then((resposta)=>{
           if(resposta.ok) {
               sucesso();
           } else {
               resposta.json().then(erro);              
           }
               
        } );
        
    }

    inserir(item, sucesso, erro) {
        console.log(item);
        fetch(this.url, {
            method: "POST",
            headers: new Headers({
                'Authorization': 'Basic ' + servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(item)
        }).then((resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                        (resultadoErro) => erro(resultadoErro)
                )
            }

        });
    }

    editar(id, item, sucesso, erro) {
        console.log(item);
        fetch(`${this.url}/${id}`, {
            method: "PUT",
            headers: new Headers({
                'Authorization': 'Basic ' + servicoLogin.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(item)
        }).then((resultado) => {
            if (resultado.ok) {
                sucesso();
            } else {
                resultado.json().then(
                        (resultadoErro) => erro(resultadoErro)
                )
            }

        });
    }


    listarPaginado(pagina, sucesso, erro) {
        /* 
         this.listarPaginado(2,
         (resultado)=>{
         console.log(resultado);
         }, (erro)=>{
         console.log("Deu M!");
         console.log(erro);
         
         }  
         
         );    
         ((teste)=>{console.log(teste)})(
         "carlos"); 
         
         log("carlos ");
         */

        let trataFetch = (resultado) => {
            this.url;
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                        (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(this.url + "?pagina=" + pagina, {
                        headers: new Headers({
                'Authorization': 'Basic ' + servicoLogin.getAuthorization()
              
            }),
            method: "GET"
        }).then(trataFetch);

    }

}
